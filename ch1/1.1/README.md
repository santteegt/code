> The code challenges in this course build upon each other. It's highly recommended that you start from the beginning. If you haven't already, get started with our [Installation Instructions](https://cryptoeconomics.study/docs/en/sync/getting-started-development-setup).

<br />

# Section 1.1 - Hashes and Signatures

Welcome to the first coding assignment of Cryptoeconomics.study! This assignment will walk you through using cryptographic hash functions, creating a public/private key pair, and verifying digital signatures.

To do this we're going to use the EthCrypto library. This is a Javascript library that implements many cryptographic functions used in Ethereum. To get familiar with the library, check out their ([documentation](https://github.com/pubkey/eth-crypto))

<br />

## Getting Started

We're starting at Section 1.1, so `cd` into Section `1.1` of the Chapter 1 folder. You'll be editing the `client.js` file in the root (aka not a subdirectory) of this folder to complete this assignment.

<br />

## Creating A Client

We're going to start by creating a [client](https://en.wikipedia.org/wiki/Client_%28computing%29) for our centralized payment operator. A client is a piece of software that allows an end-user to interact with the network. In bitcoin and Ethereum this is a node (full client) or wallet (light client), and in the more centralized operator space the equivalent would be an app or website you use to connect to the centralized service. Here our client will allow users to send transactions to the central operator to be processed.

Inside of our client's `constructor`, assign `this.wallet` to  [`EthCrypto.createIdentity()`](https://github.com/pubkey/eth-crypto#createidentity) to create a public key, private key, and Ethereum address. This will allow users to sign and receive messages with their client.
```
// The client that end-users will use to interact with our central payment processor
class Client {
  // The constructor will initialize a public/private key pair for the user
  // - the public key is like an username or address that people can send stuff to
  // - the private key is like a password or key that allows someone to access the stuff in the account and send transactions/messages from that account
  constructor() {
    //TODO
    // create a new ethereum-identity with EthCrypto.createIdentity()
    // - should create a Javascript object with a privateKey, publicKey and address
    this.wallet = "EthCrypto identity object";
  }
}
```

> *Hint*: This assumes a knowledge of Javascript basics like classes and constructors. If this doesn't make sense yet, check out the Javascript section of our [Getting Started Guide](https://cryptoeconomics.study/docs/en/sync/getting-started-development-setup)
> [relevant documentation](https://github.com/pubkey/eth-crypto#createidentity)

> More info on clients
> [Wikipedia](https://en.wikipedia.org/wiki/Client_%28computing%29)
> [Bitcoin](https://en.bitcoin.it/wiki/Clients#Overview)
> [Ethereum Docs](http://ethdocs.org/en/latest/ethereum-clients/choosing-a-client.html)
> [Ethereum Wiki](https://github.com/ethereum/wiki/wiki/Clients,-tools,-dapp-browsers,-wallets-and-other-projects)

<br />

## Hashing

Complete the `hash` function.

You should be able to pass in some data to the function and it should return the `keccak256` hash of that data. Use `EthCrypto.hash.keccak256`.
```
// Creates a keccak256/SHA3 hash of some data
hash(data) {
	//TODO
	return "hash of data";
}
```

> *Hint*: Check out the [EthCrpto documentation](https://github.com/pubkey/eth-crypto#sign) to learn how to use `EthCrypto.hash.keccak256()`.

<br />

## Creating Digital Signatures

We use our private key in order to sign messages. Let's create a method function `sign(data)` in our Client class.

This function should take in `data`, use `this.hash` calculate the hash of that data, and then use [`EthCrypto.sign`](https://github.com/pubkey/eth-crypto#sign) and your wallet's private key to sign that hash. The function should return the resulting signature.
```
// Signs a hash of data with the client's private key
sign(data) {
	// TODO
	return "signed hash";
}
```

> *Hint*: `console.log(this.wallet)` to figure out how to access your private key.
> [relevant documentation](https://github.com/pubkey/eth-crypto#sign)

<br />

## Verifying Digital Signatures

Digital Signatures allow anyone to use someone's address to verify that that used their private key to sign a message. If someone sends us a signed message, we'd like our client to be able to verify that their signature is valid.

Write a `verify` method that takes in 3 parameters (in this order):
1. `signature` - Sender's signature
2. `message` - Hash of the sender's message
3. `sender` - Sender's Ethereum address

This function should return true if the signature is valid and false if it is not.
```
// Verifies that a messageHash is signed by a certain address
verify(signature, messageHash, address) {
	//TODO
	return "boolean";
}
```

> *Hint*: You can use [`EthCrypto.recover`](https://github.com/pubkey/eth-crypto#recover) to recover an Ethereum address from a `signature` and `messageHash`. See "Details" to learn how this function works.
> [relevant documentation](https://github.com/pubkey/eth-crypto#recover)

<br />

## Testing

Testing is a very important part of programming. Good testing will make you better.

To make sure that your code actually does what you think it does, try going through `demo.js` and filling out the story with the functions you just created. Doing so will not only allow you to check that your code is working correctly, but also let you see exactly what's happening via the console. When you're ready run `node demo.js` in the directory for this section (`1.1`) to see the functions you're creating come to life!

`$ node demo.js`

When you think you have it work, all you have to do is run `mocha` in this directory (`1.1`) and you'll see if the tests pass.

`$ mocha`

If all the tests don't pass, it's ok. That's what tests are for! Test exist to show you where your code breaks so that you can improve it. If all your tests are always passing it means you're probably not writing very good tests. Keep trying until the tests pass. If you really need help, reach out to other students on the [forum](https://forum.cryptoeconomics.study).

If all the tests do pass, congratulations! You did it. Move on to the next section whenever you're ready.

<br />
