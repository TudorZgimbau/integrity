# Description
Built on the 2022 [infoeducatie](https://infoeducatie.ro/) open, integrity is a simple blockchain-based remuneration platform for content creators and service providers to use when implementing subscription-based features. 

# Motivation
When paying for services we often have trouble obtaining a proof of payment or transaction/message history with the provider. Integrity aimes to solve this by using blockchain transaction hashes as keys for storing the messages, with the history being persisted on chain.

# Tech stack
The login api uses [upstash](https://upstash.com/) to store both user classes and permissions and OAuth tokens. The requests are handled via next.js api routes(vercel serverless functions) and connected to metamask using [moralis](https://moralis.io/).

# Flow
- We wrap all pages in a guard component which progressively checks for:
  - metamask connection
  - OAuth connection
  - complete user data: type, amount(creator only), etc.
  
And updates the database when necessary.

- If a user goes to a creator's chat, we search for his transaction's hashes to retrieve the messages from database and enable transactions when necessary. Also, the wallet that the creator uses when he completes the login process gets saved as a receiving address.

- On the server, we protect the routes using session login.

# ENV specs

- NEXT_PUBLIC_APP_ID => string
- NEXT_PUBLIC_SERVER_URL => string
- NEXTAUTH_URL => string
- UPSTASH_REDIS_URL => string
- UPSTASH_REDIS_TOKEN => string
- GITHUB_ID => string
- GITHUB_SECRET => string
