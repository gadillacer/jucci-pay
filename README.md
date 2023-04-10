You should take a look at the demo dApp below

# First Steps:

1. Read the instructions at https://github.com/gadillacer/juicy-nft-demo

2. Enjoy it with free mint NFTs (your gas should be sponsored)

## Main site
After that, you can either:

1. Click the link on the site, or
2. Go to https://juccipay.vercel.app to fund some gas with your Web3 wallet (e.g., MetaMask).

### NFT
You can also sell your minted NFTs using our experimental payment mechanism (AMM).

### *Note:
The site is deployed on Polygon Mumbai only, and you need at least 0.1 Matic to fund gas.

Good luck.

## For developers
Currently, we only support Biconomy Account-Abstraction SDK. We plan to expand support for more SDKs in the near future.

1. You can register a Biconomy dApp here: https://dashboard-beta.biconomy.io/.
2. Afterward, you can register your project with Jucci Pay. 

3. Enter your MetaMask EOA address in the API Key Field. Why? Because that's how Biconomy sets up the Paymaster Gas Tank. It's quite easy!

4. Refresh the page. Copy the projectId from the URL parameters of your newly registered dApp. Next, import a button with a link to our website (https://juccipay.vercel.app/projects/<projectId>) so that every user can fund the gas on behalf of the owner.

## ZeroDev/StackUp
We are working with these third-party solutions since they use a billing mechanism. However, it's okay if they can provide an API key for each developer.

### Custom Paymaster Contract (plan)
This approach would be more flexible, as you could integrate IPaymasterAPI into your userOps handler code.