import { Program } from '@project-serum/anchor';
import {
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { programIds } from '../factory';
import { findAssociatedTokenAddress, SafePdaKeys } from '../pda';
import { MintCollectionNftArgs, MintRegularNftArgs } from '../types/types';

// mint regular nft instruction
async function getMintRegularNftInstruction(args: {
  pdaKeys: SafePdaKeys;
  program: Program;
  receiverAddress: PublicKey;
  payerAddress: PublicKey;
  isParentNft: boolean;
  isMasterEdition: boolean;
  mintUri: string;
  mintSymbol: string;
  mintName: string;
}) {
  const argument: MintRegularNftArgs = {
    mintMetadataBump: args.pdaKeys.mintMetadataBump,
    mintMasterEditionBump: args.pdaKeys.mintMasterEditionBump,
    mintName: args.mintName,
    mintSymbol: args.mintSymbol,
    isMasterEdition: args.isMasterEdition,
    isParentNft: args.isParentNft,
    mintUri: args.mintUri,
  };

  const [receiverMintAta, _] = await findAssociatedTokenAddress(
    args.receiverAddress,
    args.pdaKeys.mintAddress
  );

  const mintRegularNftInstruction = await args.program.methods
    .mintRegularNft(argument)
    .accounts({
      receiver: args.receiverAddress,
      payer: args.payerAddress,
      nftSafe: args.pdaKeys.nftSafeAddress,
      mint: args.pdaKeys.mintAddress,
      payerMintAta: args.pdaKeys.payerMintAta,
      receiverMintAta: receiverMintAta,
      mintMetadata: args.pdaKeys.mintMetadataAddress,
      mintMasterEdition: args.pdaKeys.mintMasterEditionAddress,
      tokenMetadataProgram: programIds.TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: programIds.TOKEN_PROGRAM_ID,
      associatedTokenProgram: programIds.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .instruction();
  return mintRegularNftInstruction;
}

// mint collection nft instruction
async function getMintCollectionNftInstruction(args: {
  pdaKeys: SafePdaKeys;
  program: Program;
  receiverAddress: PublicKey;
  payerAddress: PublicKey;
  isParentNft: boolean;
  isMasterEdition: boolean;
  mintUri: string;
  mintSymbol: string;
  mintName: string;
  nftCollectionMint: PublicKey;
  nftCollectionMasterEdition: PublicKey;
  nftCollectionMetadata: PublicKey;
  nftCollectionMetadataBump: number;
  nftCollectionMasterEditionBump: number;
  nftCollectionAdmin: PublicKey;
  message: Uint8Array | null;
  signature: Uint8Array | null;
}) {
  const argument: MintCollectionNftArgs = {
    mintMetadataBump: args.pdaKeys.mintMetadataBump,
    mintMasterEditionBump: args.pdaKeys.mintMasterEditionBump,
    isMasterEdition: args.isMasterEdition,
    isParentNft: args.isParentNft,
    mintName: args.mintName,
    mintSymbol: args.mintSymbol,
    mintUri: args.mintUri,
    nftCollectionMasterEditionBump: args.nftCollectionMasterEditionBump,
    nftCollectionMetadataBump: args.nftCollectionMetadataBump,
    message: args.payerAddress == args.receiverAddress ? null : args.message,
    signature:
      args.payerAddress == args.receiverAddress ? null : args.signature,
  };

  const [receiverMintAta, _] = await findAssociatedTokenAddress(
    args.receiverAddress,
    args.pdaKeys.mintAddress
  );

  let payerMintAta = args.pdaKeys.payerMintAta;
  if (args.payerAddress.toString() === args.receiverAddress.toString()) {
    payerMintAta = receiverMintAta;
  }

  const mintCollectionNftInstruction = await args.program.methods
    .mintCollectionNft(argument)
    .accounts({
      nftCollectionAdmin: args.nftCollectionAdmin,
      nftCollectionMasterEdition: args.nftCollectionMasterEdition,
      nftCollectionMetadata: args.nftCollectionMetadata,
      nftCollectionMint: args.nftCollectionMint,
      nftCollectionAdminSafe: args.pdaKeys.nftSafeAddress,
      receiver: args.receiverAddress,
      payer: args.payerAddress,
      mint: args.pdaKeys.mintAddress,
      receiverMintAta: receiverMintAta,
      payerMintAta: payerMintAta,
      mintMetadata: args.pdaKeys.mintMetadataAddress,
      mintMasterEdition: args.pdaKeys.mintMasterEditionAddress,
      tokenMetadataProgram: programIds.TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: programIds.TOKEN_PROGRAM_ID,
      associatedTokenProgram: programIds.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
      instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
    })
    .instruction();
  return mintCollectionNftInstruction;
}

export { getMintRegularNftInstruction, getMintCollectionNftInstruction };
