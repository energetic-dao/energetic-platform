import { ICommandBuilder, IPactCommand, IPactModules, IPublicMeta, Pact } from '@kadena/client';
import { useWallet } from '~/src/stores/wallet.store';
import { ICap, ISignatureJson, ISigningCap, ISigningRequest } from '@kadena/types';
import { IRequestKeys, send, local } from '@kadena/chainweb-node-client';

type PactModule = keyof IPactModules;
type PactFunction<T extends keyof IPactModules> = keyof IPactModules[T];

interface ISignedCommand {
  hash: string;
  cmd: string;
  sigs: ISignatureJson[];
}

interface ISigningResponse {
  status: string;
  signedCmd: ISignedCommand;
}

interface IPactCommandCap {
  name: string;
  args: ICap['args'];
}

interface IPactCommandSigner {
  pubKey: string;
  caps: IPactCommandCap[];
}

export class PactAction<M extends PactModule = PactModule, F extends PactFunction<M> = PactFunction<M>> {
  constructor(private readonly _module: M, private readonly _func: F) {}

  public async local(
    builtCommand: ICommandBuilder<any> & IPactCommand,
    options: any = { preflight: false, signatureVerification: false },
  ): Promise<any> {
    const { result } = await builtCommand
      .setMeta({
        sender: this.wallet?.session?.account as string,
        gasLimit: 1_000_000,
      })
      .local(this.apiHost, options);

    if (result.status !== 'success') {
      console.error(result);
      throw new Error(`Pact command failed: ${result.status}`);
    }

    return result.data;
  }

  public async send(commandBuilder: ICommandBuilder<any> & IPactCommand): Promise<IRequestKeys> {
    const { provider, session } = this.wallet;

    if (!provider || !session) {
      throw new Error('No wallet provider or session found');
    }

    commandBuilder.setMeta(
      {
        sender: 'k:' + session.account,
        chainId: '1',
      },
      'testnet04',
    );

    const metadata: IPublicMeta = commandBuilder.publicMeta;

    const signRequest: ISigningRequest = {
      pactCode: commandBuilder.code,
      envData: commandBuilder.data,
      caps: this.mapCapabilities(commandBuilder.signers),
      networkId: commandBuilder.networkId,
      ...metadata,
      signingPubKey: session.account,
    };

    commandBuilder.setNonceCreator((command, dateInMs) => {
      return ''; // @todo
    });

    const response: ISigningResponse = await provider?.sign(signRequest);

    if (response.status !== 'success') {
      throw new Error('Signing failed');
    }

    commandBuilder.addSignatures(...this.mapSignedSignatures(session.account, response.signedCmd.sigs));

    return send({ cmds: [response.signedCmd] }, this.apiHost);
    //return commandBuilder.send('https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact');
  }

  private mapCapabilities(signers: IPactCommandSigner[]): ISigningCap[] {
    return signers
      .flatMap((signer: IPactCommandSigner) => signer.caps)
      .map(({ name, args }): ISigningCap => {
        const role = name.split('.').pop();

        if (!role) {
          throw new Error(`Invalid role: ${name}`);
        }

        return {
          description: `${name}`,
          role,
          cap: {
            name,
            args,
          },
        };
      });
  }

  private mapSignedSignatures(publicKey: string, signedSignatures: ISignatureJson[]) {
    return signedSignatures.map(({ sig }: ISignatureJson) => ({
      pubKey: publicKey,
      sig,
    }));
  }

  public get builder(): IPactModules[M][F] {
    return Pact.modules[this._module][this._func];
  }

  public get apiHost() {
    return 'https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact';
  }

  public get module() {
    return this._module;
  }

  public get func() {
    return this._func;
  }

  public get wallet() {
    return useWallet();
  }
}
