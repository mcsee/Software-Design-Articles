# Web3 For Dummies - Part 01 - What is a Blockchain?

![Web3 For Dummies - Part 01 - What is a Blockchain?](Web3%20For%20Dummies%20-%20Part%2001%20-%20What%20is%20a%20Blockchain.jpg)

> TL;DR: In this series, we will talk from the very blockchain basics to building a complex [DAPP](https://ethereum.org/en/dapps/).

# Background

## What is FIAT? 💰

- The standard currency is called FIAT.
- FIAT requires a middle man authority (a bank or a government as examples).
- A cryptocurrency in some technology (like blockchain) relies on automatic rules to comply with the exchange rules.
- The most widely used digital currencies are [cryptocurrencies](https://en.wikipedia.org/wiki/Cryptocurrency).
- We call them *crypto* because it relies on [mathematical cryptographic](https://en.wikipedia.org/wiki/Cryptography) properties similar to password encryption.
- We cannot trust other people around without a middle man.
- We use cryptography to exchange value in the same way we use [https](https://en.wikipedia.org/wiki/HTTPS) to send sensitive data over the internet.

## Hashes ➗

- We have been using [math hashes](https://en.wikipedia.org/wiki/Hash_function) for a long time in computer science.
- [Hash functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function) take an input and produce a deterministic output.
- We use hashes on databases, algorithms, and data structures.
- A good hash function is easy to calculate on the input, but very hard (in computer time) to reverse from the output.
- Multiplying two integers is a very fast operation.
- [Factoring an integer](https://en.wikipedia.org/wiki/Integer_factorization) into its prime factors is a very expensive operation (provided factors are large enough).
- We can transform any data on blockchain into numbers and encrypt them very fast.
- If we chain a block content, its hash changes unless they have the same hash. 
- We called this a *[hash collision](https://en.wikipedia.org/wiki/Hash_collision)* and can keep its probability near zero using math.

# The Blockchain ⛓️

## What is a blockchain? 🔗

- Blockchain is about decentralized trust.
- You exchange value without an intermediate.
- Trust issues are not solved by a middle man like a market, broker, credit card, or bank. 
- You don't trust or rely on reputation or a certified third party.
- Standard middlemen are expensive, slow, and human errors prone.
- Blockchain was first designed to exchange currency. 
- Nowadays it has many other uses such as managing loans, supporting all kinds of contracts, NFTs, Tokens, etc.

## Which was the first blockchain? 🥇

- [Satoshi Nakamoto](https://en.wikipedia.org/wiki/Satoshi_Nakamoto) (a collective or fake alias) released the [First Blockchain proposition](https://bitcoin.org/bitcoin.pdf).
- Bitcoin was the first blockchain implementation.
- Blockchain technology was first designed for digital currency exchange.
- Blockchain secures transactions in an not-trusted medium (the internet).

## Blockchain Properties 🌟

- Transparency.
- Decentralize trust and carry on distributed transactions and electronic commerce.
- Remove man in the middle, merchant accounts, banks, clearing services.
- Reduce charges and improve efficiency by removing the middle man.
- Full [auditability](https://www.investopedia.com/terms/a/auditability.asp) and transactions history.
- No single point of failure. 
- We replicate the database in many places.
- Most blockchains are public, tough transactions might be encrypted.

# Blockchain Implementation 🔧

## How does it work? 🎰

- All new data is added, never removed, or replaced.
- Blockchains are immutable databases on transactions. 
- Most traditional databases (relational, files, hierarchical, spreadsheet) can be overwritten.
- Blockchain only allows CREATE and READ, No UPDATE or DELETE.
- It is not a traditional [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).

## How do we store data? 💾

- To update a change, we need to add a new transaction at the end. 
- This is analogous to [account ledgers](https://en.wikipedia.org/wiki/Ledger).
- Every Block has a group of transactions with (possible) different partners.
- Blocks are chained like a [linked list](https://en.wikipedia.org/wiki/Linked_list).
- Since blockchain is immutable; stored data is available forever.
- Blocks are replicated in nodes.
- Nodes are replicated all over the net.
- If we want to add new data, we need to reach a consensus.
- All nodes have the same authority and a single vote.
- We reach a [Consensus](https://www.investopedia.com/terms/c/consensus-mechanism-cryptocurrency.asp) once one of them gets (50% + 1) votes.
- A Transaction can be anything as long as we can store it with bytes. 
- To transfer cryptocurrency we will add to the ledger a Transaction for an amount with source a destination addresses.

## The chain 🔐

- Genesis Block is block 0
- Next block stores the previous block's hash as a linked list.
- The hash guarantees chain is neither broken nor faked

## The Nonce 🔑

- To make hash computation hard we need to introduce some random data with the transaction.
- We force the hash value of the transactions + the fake data to have an arbitrary form.
- We ask the computed hash function to have some leading zeroes.
- At Bitcoin [there are currently 19 zeroes](https://www.blockchain.com/en/charts/difficulty).
- The random data is called a Nonce.
- We need a nonce such as, together with the valid transactions, it yields a hash with some leading zeroes.
- It is very costly to search for this nonce.
- Bitcoin uses leading zeroes. Other blockchain implementations use similar mechanisms.

# Mining 🏭

# What is mining? 👨‍🏭

- Mining is the artificial process to find the proper Nonce to add to a group of transactions to achieve a hash with a fixed number of leading zeroes.
- [Mining](https://www.investopedia.com/tech/how-does-bitcoin-mining-work/) takes a lot of computational time and energy.
- Miners use specialized hardware where energy is cheap all over the world.
- Nowadays, Mining is a threat to the environment. 
- Nodes compete for the price provided it is valuable.
- The first one who solves the math puzzle gets the reward.
- After global validation, new Bitcoins (or equivalent) are rewarded to the one who solves the puzzle.
- Global validation is easy since hash encoding is cheap as opposed to hash decoding (mining).
- The reward motivates miners to legitimize and monitor Blockchain transactions, ensuring their validity.

## Integrity and Trust 💱

- Blocks are added after consensus.
- If 50% +1 agree to fake a chain, they can do it. This is known as the [51 % Attack](https://www.investopedia.com/terms/1/51-attack.asp)
- *[Proof of work](https://www.investopedia.com/terms/p/proof-work.asp)* is the most used mechanism and it consists of global hash validation.
- *[Proof of Stake](https://www.investopedia.com/terms/p/proof-stake-pos.asp)* requires less computer power than Proof of work. it uses bet voting to select a winner.
- Currently, there are no efficient ways to carry on Proof of Stake in a decentralized way.
- There are several other alternatives.

* * *

Voilá. 

This is basic Blockchain.

Subscribe to learn advanced topics on these series.