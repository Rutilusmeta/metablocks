import { Provider, Wallet } from '@project-serum/anchor';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';

//export const CLUSTER_URL = 'https://api.devnet.solana.com';
export const CLUSTER_URL = 'http://localhost:8899';

export default class NodeWallet implements Wallet {
  constructor(readonly payer: Keypair) {}

  async signTransaction(tx: Transaction): Promise<Transaction> {
    tx.partialSign(this.payer);
    return tx;
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return txs.map((t) => {
      t.partialSign(this.payer);
      return t;
    });
  }

  get publicKey(): PublicKey {
    return this.payer.publicKey;
  }
}

export const addSols = async (
  provider: Provider,
  wallet: anchor.web3.PublicKey,
  amount = anchor.web3.LAMPORTS_PER_SOL
) => {
  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(wallet, amount),
    'confirmed'
  );
};

export const addSolsIfEmpty = async (
  provider: Provider,
  wallet: NodeWallet,
  amount: number
) => {
  const balance = await provider.connection.getBalance(wallet.publicKey);
  if (balance <= LAMPORTS_PER_SOL) {
    await addSols(provider, wallet.publicKey, amount);
  }
};

export const getTestAuthority = (): Keypair => {
  return Keypair.fromSecretKey(
    Buffer.from(
      JSON.parse(
        require('fs').readFileSync(
          './tests/utils/wallet/test-keypair.json',
          'utf-8'
        )
      )
    )
  );
};
