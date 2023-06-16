(namespace "free")
(module energetic-plot-staking-center GOVERNANCE

  (use free.energetic-plot-item-policy)
  (use free.energetic-plot-policy)

  (use marmalade.ledger [token-schema get-token-info get-balance])
  (use kip.token-policy-v2 [token-info])

  ;;
  ;; Schemas
  ;;

  (defschema plot-schema
    plot-id:string
    escrow-account:string
    escrow-guard:guard
    original-owner:string
    account-guard:guard
    locked-since:time
    locked:bool
    token-ids:[string]
  )

  (defschema staked-plot-item-schema
    item-id:string
    plot-id:string
    amount:decimal
    type:string
    locked-since:time
    account:string
    account-guard:guard
  )

  (defschema plot-slot-constant-schema
    type:string
    max:decimal
  )

  ;;
  ;; Tables
  ;;

  (deftable staked-plots:{plot-schema})
  (deftable staked-plot-items:{staked-plot-item-schema})
  (deftable plot-slot-constants:{plot-slot-constant-schema})

  ;;
  ;; Constants
  ;;

  (defconst ADMIN_KEYSET "free.energetic-admin")
  (defconst OPERATOR_KEYSET "free.energetic-operator")

  (defconst SLOT_TYPE_ROOF_SOLAR_PANEL:string "roof-solar-panel")
  (defconst SLOT_TYPE_STANDING_SOLAR_PANEL:string "standing-solar-panel")
  (defconst SLOT_TYPE_WALL_BATTERY:string "wall-battery")
  (defconst SLOT_TYPE_WIND_TURBINE:string "wind-turbine")

  (defconst SLOT_TYPES:[string] [SLOT_TYPE_ROOF_SOLAR_PANEL SLOT_TYPE_WALL_BATTERY SLOT_TYPE_STANDING_SOLAR_PANEL SLOT_TYPE_WIND_TURBINE])

  ;;
  ;; Capabilities
  ;;

  (defcap GOVERNANCE:bool ()
    (enforce-keyset ADMIN_KEYSET)
  )

  (defcap OPERATOR:bool ()
    (enforce-keyset OPERATOR_KEYSET)
  )

  (defcap STAKE:bool (plot-id:string account:string amount:decimal)
    (compose-capability (PLOT plot-id))
  )

  (defcap UNSTAKE:bool (plot-id:string account:string)
    (with-read staked-plots plot-id
      {
        'account-guard := guard
      }
      (compose-capability (PLOT plot-id))
      (enforce-guard guard)
    )
  )

  (defcap DEGRADE_PLOT:bool (plot-id:string item-id:string account:string)
    (with-read staked-plot-items (key plot-id item-id)
      {
        'plot-id := staked-plot-id,
        'account-guard := guard
      }
      (compose-capability (PLOT plot-id))
      (enforce (= plot-id staked-plot-id) "Invalid plot id")
      (enforce-guard guard)
    )
  )

  (defcap UPGRADE_PLOT:bool (plot-id:string item-id:string account:string account-guard:guard)
    (with-read staked-plots plot-id
      {
        "account-guard" := guard,
        "original-owner" := original-owner
      }
      (enforce (= guard account-guard) "Invalid account")
      (enforce (= original-owner account) "Plot is not staked by owner")
      (enforce-guard guard)
    )
  )

  (defcap PRIVATE:bool ()
    true
  )

  (defcap PLOT:bool (plot-id:string)
    true
  )

  ;;
  ;; Escrow Utilities
  ;;

  (defun require-PLOT:bool (plot-id:string)
    (require-capability (PLOT plot-id))
  )

  (defun create-plot-guard:guard (plot-id:string)
    (create-user-guard (require-PLOT plot-id))
  )

  (defun create-escrow-account (plot-id:string)
    (create-principal (create-plot-guard plot-id))
  )


  ;;
  ;; Utilities
  ;;

  (defun key:string (plot-id:string token-id:string)
    (hash (format "{}_{}" [plot-id token-id]))
  )

  ;;
  ;; Functions
  ;;

  (defun lock-plot (plot-id:string amount:decimal account:string account-guard:guard)
    (enforce (= amount 1.0) "Amount can only be 1")
    (with-capability (STAKE plot-id account amount)
      (let
        (
          (escrow-plot-guard (create-plot-guard plot-id))
          (escrow-account (create-escrow-account plot-id))
          (is-plot:bool (item-has-policy-active plot-id 'immutable-policies free.energetic-plot-policy))
        )
        (enforce is-plot "Requires plot policy")
        (marmalade.ledger.transfer-create plot-id account escrow-account escrow-plot-guard amount)
        ; (coin::create-account escrow-account escrow-plot-guard) ; @todo change to energetic-coin
        (write staked-plots plot-id
          {
            'plot-id: plot-id,
            'escrow-account: escrow-account,
            'escrow-guard: escrow-plot-guard,
            'original-owner: account,
            'account-guard: account-guard,
            'locked-since: (at 'block-time (chain-data)),
            'locked: true,
            'token-ids: []
          }
        )
        {
          'plot-id: plot-id,
          'escrow-account: escrow-account,
          'original-owner: account,
          'account-guard: account-guard,
          'locked-since: (at 'block-time (chain-data)),
          'locked: true,
          'token-ids: []
        }
      )
    )
  )

  (defun unlock-plot:bool (plot-id:string amount:decimal account:string)
    (enforce (= amount 1.0) "Amount can only be 1")
    (with-capability (UNSTAKE plot-id account)
      (bind (get-plot plot-id)
        {
          'escrow-account := escrow-account
        }
        (let*
          (
            (staked-plot:object{plot-schema} (get-plot plot-id))
            (staked-plot-tokens:[string] (at 'token-ids staked-plot))
            (transfer-staked-item
              (lambda (staked-item:string)
                (with-read staked-plot-items (key plot-id staked-item)
                  {
                    'amount := staked-amount
                  }
                  (install-capability (free.energetic-enumerable-collection-policy.TRANSFER staked-item escrow-account account staked-amount))
                  (install-capability (marmalade.ledger.TRANSFER staked-item escrow-account account staked-amount))
                  (marmalade.ledger.transfer staked-item escrow-account account staked-amount)
                  (update staked-plot-items (key plot-id staked-item)
                    {
                      'account: "",
                      'amount: 0.0
                    }
                  )
                )
              )
            )
          )
          (if (>= (length staked-plot-tokens) 0)
            (map transfer-staked-item (distinct staked-plot-tokens))
            "No staked items on plot"
          )
          (install-capability (free.energetic-enumerable-collection-policy.TRANSFER plot-id escrow-account account amount))
          (install-capability (marmalade.ledger.TRANSFER plot-id escrow-account account amount))
          (marmalade.ledger.transfer plot-id escrow-account account amount)
          ; @todo add claim for energetic-coin rewards

          (update staked-plots plot-id
            {
              'locked: false,
              'token-ids: []
            }
          )
          true
        )
      )
    )
  )

  (defun unlock-plot-item:bool (plot-id:string token-id:string amount:decimal account:string)
    (enforce (> amount 0.0) "Amount must be greater than 0")
    (with-capability (DEGRADE_PLOT plot-id token-id account)
      (bind (get-plot plot-id)
        {
          'token-ids := token-ids,
          'escrow-account := escrow-account
        }
        (with-default-read staked-plot-items (key plot-id token-id)
          {
            'amount: 0.0
          }
          {
            'type := type,
            'amount := staked-amount
          }
          (let
            (
              (new-bal:decimal (- staked-amount amount))
              (max-staked-amount:decimal (get-slot-type-max type))
            )
            (enforce (<= amount max-staked-amount) "Exceeds max amount")
            (enforce (>= staked-amount amount) "Not enough staked items on plot")

            (install-capability (free.energetic-enumerable-collection-policy.TRANSFER token-id escrow-account account new-bal))
            (install-capability (marmalade.ledger.TRANSFER token-id escrow-account account new-bal))
            (marmalade.ledger.transfer token-id escrow-account account new-bal)
            (let
              (
                (filtered-tokens:[string] (filter (!= token-id) token-ids))
              )
              (update staked-plots plot-id
                {
                  'token-ids: (+ filtered-tokens (make-list
                    (-
                      (- (length token-ids) (length filtered-tokens))
                      (round amount)
                    ) token-id))
                }
              )

              (update staked-plot-items (key plot-id token-id)
                {
                  'amount: new-bal
                }
              )
            )
          )
          true
        )
      )
    )
  )

  (defun upgrade-plot:bool (plot-id:string item-id:string amount:decimal account:string account-guard:guard)
    (with-capability (UPGRADE_PLOT plot-id item-id account account-guard)
      (bind (get-token-metadata item-id)
        {
          'type := type
        }
        (bind (get-plot plot-id)
          {
            'escrow-account := escrow-account,
            'escrow-guard := escrow-plot-guard
          }
          (marmalade.ledger.transfer-create item-id account escrow-account escrow-plot-guard amount)
          (let*
            (
              (item-has-policy-active:bool (item-has-policy-active item-id 'immutable-policies free.energetic-plot-item-policy))
              (item-max-amount:decimal (get-slot-type-max type))
              (current-staked-amount:decimal (marmalade.ledger.get-balance item-id escrow-account))
            )
            (enforce item-has-policy-active "Invalid item upgrade")
            (enforce (<= current-staked-amount item-max-amount) (format "Amount can max be {}" [item-max-amount]))

            (write staked-plot-items (key plot-id item-id)
              {
                'plot-id: plot-id,
                'item-id: item-id,
                'amount: current-staked-amount,
                'account: account,
                'type: type,
                'account-guard: account-guard,
                'locked-since: (at 'block-time (chain-data))
              }
            )

            (with-default-read staked-plots plot-id
              {
                'token-ids: []
              }
              {
                'token-ids := token-ids
              }
              (update staked-plots plot-id
                {
                  'token-ids: (+ token-ids (make-list (round amount) item-id))
                }
              )
            )
            true
          )
        )
      )
    )
  )

  ;;
  ;; Setters
  ;;

  (defun set-slot-type-max (type:string max:decimal)
    (with-capability (OPERATOR)
      (let
        (
          (type-hash (hash type))
          (has-valid-slot-type (contains type SLOT_TYPES))
        )
        (enforce has-valid-slot-type "Invalid slot type")
        (write plot-slot-constants type-hash
          {
            'type: type,
            'max: max
          }
        )
        {
          'type: type,
          'max: max
        }
      )
    )
  )

  ;;
  ;; Getters
  ;;

  (defun get-plot:object{plot-schema} (plot-id:string)
    (with-read staked-plots plot-id
      {
        'escrow-account := escrow-account,
        'escrow-guard := escrow-guard,
        'original-owner := original-owner,
        'account-guard := account-guard,
        'locked-since := locked-since,
        'locked := locked,
        'token-ids := token-ids
      }
      {
        'plot-id: plot-id,
        'escrow-account: escrow-account,
        'escrow-guard: escrow-guard,
        'original-owner: original-owner,
        'account-guard: account-guard,
        'locked-since: locked-since,
        'locked: locked,
        'token-ids: token-ids
      }
    )
  )

  (defun get-slot-type-max:decimal (type:string)
    (with-read plot-slot-constants (hash type)
      {
        'max := max
      }
      max
    )
  )

  (defun item-has-policy-active:bool (token-id:string policy-type:string policy:module{kip.token-policy-v2})
    (contains policy (at policy-type (at 'policies (marmalade.ledger.get-token-info token-id))))
  )

  (defun get-plot-info:object (plot:object{plot-schema})
    (+
      {
        'locked: (at 'locked plot),
        'locked-since: (at 'locked-since plot)
      }
      (marmalade.ledger.get-token-info (at 'plot-id plot))
    )
  )

  (defun get-staked-plots (account:string)
    (map (get-plot-info)
      (select staked-plots
        [
          'plot-id,
          'locked,
          'locked-since
        ]
        (and?
          (where 'locked (= true))
          (where 'original-owner (= account))
        )
      )
    )
  )

  (defun get-plot-power-rate:decimal (plot-id:string)
    (with-read staked-plots plot-id
      {
        'token-ids := token-ids
      }
      (let
        (
          (map-token-power-rate
            (lambda (token-id:string)
              (at 'power-rate (free.energetic-plot-item-policy.get-token-metadata token-id))
            )
          )
        )
        (fold (+) 0
          (map
            map-token-power-rate
            token-ids
          )
        )
      )
    )
  )

  (defun get-staked-items-on-plot:object{staked-plot-item-schema} (plot-id:string)
    (with-read staked-plots plot-id
      {
        'locked := locked,
        'token-ids := token-ids
      }
      (enforce locked "Plot is not locked")
      (map (lambda (token-id:string)
        (with-read staked-plot-items (key plot-id token-id)
          {
            'plot-id := plot-id,
            'amount := amount,
            'type := type,
            'account := account,
            'locked-since := locked-since
          }
          (let
            (
              (token-info:object{token-info} (get-token-info token-id))
            )
            (+
              token-info
              {
              'plot-id: plot-id,
              'amount: amount,
              'type: type,
              'account: account,
              'locked-since: locked-since
              }
            )
          )
        )
      ) (distinct token-ids))
    )
  )
)