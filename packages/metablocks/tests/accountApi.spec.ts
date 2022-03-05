import { getAllUniverses } from '../src/accounts';
import * as anchor from '@project-serum/anchor';
import NodeWallet from './utils/sdk';
import { getMetaBlocksProgram } from '../src/factory';
import { assert } from 'chai';

describe('Account API Test cases', () => {
  const dummyKeypair = anchor.web3.Keypair.generate();
  const dummyWallet = new NodeWallet(dummyKeypair);

  const connection = new anchor.web3.Connection(
    'http://localhost:8899',
    'confirmed'
  );
  const program = getMetaBlocksProgram(connection, dummyWallet);

  it('Should get all universe accounts', async () => {
    const universes = await getAllUniverses(program);

    assert.isOk(universes.length > 0);
  });
});
