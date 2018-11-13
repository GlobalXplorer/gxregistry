# gxregistry
Register real-world artifacts on-chain

### Infura
The GX registry runs on the Kovan Ethereum test network provided by Infura.

## Testing Instructions
Install dependencies

`npm install`

Create environment variables (easiest to create .env file)

`INFURA_API_KEY=<api_key_from_your_infura_account>`

`INFURA_API_SECRET=<api_secret_from_your_infura_account>`

`MNEMONIC=<12_word_mnemonic_to_generate_keys>`

Test with local blockchain

`npm run dev`

Test with Infura

`npm run prod`
