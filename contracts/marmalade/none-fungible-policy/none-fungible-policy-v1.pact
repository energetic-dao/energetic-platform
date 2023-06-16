(namespace "n_fa5008565e171dca599c6accfd71d6006ddecce0")
(module non-fungible-policy-v1 GOVERNANCE

  @doc "Concrete policy for issuing an nft with a fixed supply of 1"

  (defcap GOVERNANCE ()
    (enforce-guard (keyset-ref-guard "marmalade.marmalade-admin")))

  (implements kip.token-policy-v2)
  (use kip.token-policy-v2 [token-info])

  (defschema mint-guard-schema
    mint-guard:guard
  )

  (defconst NFP_MINT_GUARD "nfp-mint-guard")

  (deftable mintguards:{mint-guard-schema})

  (defcap MINT (token-id:string)
    @managed
    (with-read mintguards token-id
      { "mint-guard":= mint-guard }
    (enforce-guard mint-guard)
    true
    )
  )

  (defun enforce-ledger:bool ()
     (enforce-guard (marmalade.ledger.ledger-guard))
  )

  (defun enforce-init:bool
    ( token:object{token-info}
    )
    (enforce-ledger)
    (let ( (mint-guard:guard (read-keyset NFP_MINT_GUARD)))

    (insert mintguards (at 'id token)
      { 'mint-guard: mint-guard })
    true)
  )

  (defun enforce-mint:bool
    ( token:object{token-info}
      account:string
      guard:guard
      amount:decimal
    )
    (enforce-ledger)
    (with-capability (MINT (at 'id token))
      (enforce (= amount 1.0) "Mint can only be 1")
      (enforce (= (at 'supply token) 0.0) "Only one mint allowed")
    )
  )

  (defun enforce-burn:bool
    ( token:object{token-info}
      account:string
      amount:decimal
    )
    (enforce-ledger)
    (enforce false "Burn prohibited")
  )

  (defun enforce-offer:bool
    ( token:object{token-info}
      seller:string
      amount:decimal
      sale-id:string
    )
    @doc "Capture quote spec for SALE of TOKEN from message"
    (enforce-ledger)
  )

  (defun enforce-buy:bool
    ( token:object{token-info}
      seller:string
      buyer:string
      buyer-guard:guard
      amount:decimal
      sale-id:string )
    (enforce-ledger)
  )

  (defun enforce-transfer:bool
    ( token:object{token-info}
      sender:string
      guard:guard
      receiver:string
      amount:decimal )
    (enforce-ledger)
  )

  (defun enforce-withdraw:bool
    ( token:object{token-info}
      seller:string
      amount:decimal
      sale-id:string )
    (enforce-ledger)
  )

  (defun enforce-crosschain:bool
    ( token:object{token-info}
      sender:string
      guard:guard
      receiver:string
      target-chain:string
      amount:decimal )
    (enforce-ledger)
    (enforce false "Transfer prohibited")
  )
)

(if (read-msg 'upgrade)
  ["upgrade complete"]
  [ (create-table mintguards)
])
