const EthCrypto = require('eth-crypto');
const Client = require('./client.js');

// Our naive implementation of a centralized payment processor
class Paypal extends Client {
  constructor() {
    super();
    // the state of the network (accounts and balances)
    this.state = {
      [this.wallet.address]: {
        balance: 1000000,
      },
    };
    // the history of transactions
    this.txHistory = [];
  }

  // Checks that the sender of a transaction is the same as the signer
  checkTxSignature(tx) {
    // get the signature from the transaction
    const message = tx.contents
    const signer = tx.contents.from
    // if the signature is invalid print an error to the console and return false
    const isValid = this.verify(tx.sig, this.hash(message), signer)
    if (!isValid) {
      console.log('Invalid signature for tx', message)
    }
    // return true if the transaction is valid
    // console.log('checkTxSignature', isValid)
    return isValid
  }

  // Checks if the user's address is already in the state, and if not, adds the user's address to the state
  checkUserAddress(tx) {
    // check if the sender is in the state
    const sender = tx.contents.from
    // if the sender is not in the state, create an account for them
    if (!this.state[[sender]]) {
      this.state[[sender]] = {
        balance: 0
      }
    }
    // check if the receiver is in the state
    const recipient = tx.contents.to
    // if the receiver is not in the state, create an account for them
    if (!this.state[[recipient]]) {
      this.state[[recipient]] = {
        balance: 0
      }
    }
    // once the checks on both accounts pass (they're both in the state), return true
    // console.log('checkUserAddress', true)
    return true
  }

  // Checks the transaction type and ensures that the transaction is valid based on that type
  checkTxType(tx) {
    const sender = tx.contents.from
    let isValid = false
    switch (tx.contents.type) {
      case 'mint':
        // check that the sender is PayPal
        if (sender != this.wallet.address) {
          // if the check fails, print an error to the concole stating why and return false so that the transaction is not processed
          console.error('Mint transaction not sent by Paypal', this.wallet.address, tx.contents.from)
          isValid = false
        } else {
          // if the check passes, return true
          isValid = true
        }
        break;
      case 'check':
        // print the balance of the sender to the console
        console.log(`Current balance for ${sender}: ${this.state[[sender]].balance}`)
        // return false so that the stateTransitionFunction does not process the tx
        isValid = false
        break;
      case 'send':
        // check that the transaction amount is positive and the sender has an account balance greater than or equal to the transaction amount
        if (this.state[[sender]].balance < tx.contents.amount) {
          // if a check fails, print an error to the console stating why and return false
          console.log('Insufficient funds for tx', tx)
          isValid = false
        } else {
          isValid = true
        }
        break;
      default:
        isValid = false
        break;
    }
    // console.log('checkTxType', isValid)
    return isValid
  }

  // Checks if a transaction is valid, adds it to the transaction history, and updates the state of accounts and balances
  checkTx(tx) {
    // console.log('checkTx', this.checkTxSignature(tx) && this.checkUserAddress(tx) && this.checkTxType(tx))
    return (
      // check that the transaction signature is valid
      this.checkTxSignature(tx) &&
      // check that the transaction sender and receiver are in the state
      this.checkUserAddress(tx) &&
      // check that the transaction type is valid
      this.checkTxType(tx)
      )
  }

  // Updates account balances according to a transaction and adds the transaction to the history
  applyTx(tx) {
    const amount = tx.contents.amount
    // decrease the balance of the transaction sender/signer
    this.state[[tx.contents.from]].balance -= amount
    // increase the balance of the transaction receiver
    this.state[[tx.contents.to]].balance += amount
    // add the transaction to the transaction history
    this.txHistory.push(tx)
    // return true once the transaction is processed
    return true
  }

  // Process a transaction
  processTx(tx) {
    // check the transaction is valid
    const isValid = this.checkTx(tx)
    if (isValid) {
      // apply the transaction to Paypal's state
      this.applyTx(tx)
    } else {
      console.log('Cannot process the transaction', tx)
    }
  }
}

module.exports = Paypal;
