const idl = {
  version: "0.1.0",
  name: "meta_blocks",
  instructions: [
    {
      name: "createUniverse",
      accounts: [
        {
          name: "universe",
          isMut: true,
          isSigner: false
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true
        },
        {
          name: "universeAuthority",
          isMut: false,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "bump",
          type: "u8"
        },
        {
          name: "name",
          type: "string"
        },
        {
          name: "description",
          type: "string"
        },
        {
          name: "websiteUrl",
          type: "string"
        }
      ]
    },
    {
      name: "updateUniverse",
      accounts: [
        {
          name: "universe",
          isMut: true,
          isSigner: false
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true
        },
        {
          name: "universeAuthority",
          isMut: false,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "UpdateUniverseArgs"
          }
        }
      ]
    },
    {
      name: "depositNft",
      accounts: [
        {
          name: "userNft",
          isMut: true,
          isSigner: false
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true
        },
        {
          name: "universe",
          isMut: false,
          isSigner: false
        },
        {
          name: "userAssociatedNft",
          isMut: true,
          isSigner: false
        },
        {
          name: "vaultAssociatedNft",
          isMut: true,
          isSigner: false
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "userNftBump",
          type: "u8"
        },
        {
          name: "vaultBump",
          type: "u8"
        },
        {
          name: "associatedBump",
          type: "u8"
        }
      ]
    },
    {
      name: "withdrawNft",
      accounts: [
        {
          name: "userNft",
          isMut: true,
          isSigner: false
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false
        },
        {
          name: "vaultAssociatedNft",
          isMut: true,
          isSigner: false
        },
        {
          name: "universe",
          isMut: false,
          isSigner: false
        },
        {
          name: "userAssociatedNft",
          isMut: true,
          isSigner: false
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "userNftBump",
          type: "u8"
        },
        {
          name: "vaultBump",
          type: "u8"
        }
      ]
    }
  ],
  accounts: [
    {
      name: "Universe",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8"
          },
          {
            name: "lastUpdateTs",
            type: "i64"
          },
          {
            name: "universeAuthority",
            type: "publicKey"
          },
          {
            name: "config",
            type: {
              defined: "Config"
            }
          },
          {
            name: "totalNfts",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "UserNft",
      type: {
        kind: "struct",
        fields: [
          {
            name: "userNftBump",
            type: "u8"
          },
          {
            name: "index",
            type: "u64"
          },
          {
            name: "vaultBump",
            type: "u8"
          },
          {
            name: "associatedVaultBump",
            type: "u8"
          },
          {
            name: "nftAuthority",
            type: "publicKey"
          },
          {
            name: "universe",
            type: "publicKey"
          },
          {
            name: "vaultAuthority",
            type: "publicKey"
          }
        ]
      }
    },
    {
      name: "UpdateUniverseArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string"
          },
          {
            name: "websiteUrl",
            type: "string"
          },
          {
            name: "description",
            type: "string"
          },
          {
            name: "bump",
            type: "u8"
          }
        ]
      }
    }
  ],
  types: [
    {
      name: "Config",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string"
          },
          {
            name: "description",
            type: "string"
          },
          {
            name: "websiteUrl",
            type: "string"
          }
        ]
      }
    }
  ],
  errors: [
    {
      code: 6000,
      name: "IndexAdditionError",
      msg: "Could not add index"
    },
    {
      code: 6001,
      name: "InvalidUniverseAuthority",
      msg: "Universe authority does not match"
    },
    {
      code: 6002,
      name: "InvalidSigner",
      msg: "Account is not a signer"
    },
    {
      code: 6003,
      name: "Unauthorized",
      msg: "Unauthorized to access this instruction"
    },
    {
      code: 6004,
      name: "InvalidIndex",
      msg: "Invalid index passed, It is less than MIN"
    }
  ],
  metadata: {
    address: "9pNcm4DmZJgHYynuvhSbZ3m4bqBSKeuXqZ2cCZKbcLJc"
  }
}

export default idl
