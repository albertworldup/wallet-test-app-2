import React from 'react';
import ReactDOM from 'react-dom';
import QrReader from 'react-qr-reader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Subject} from 'rxjs';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
const subject = new Subject();
//import WalletTest from './wallettest';
//const Tx = require("ethereumjs-tx").Transaction;

export const tokenService = {
    setData: d => subject.next({ value: d }),
    clearData: () => subject.next(),
    getData: () => subject.asObservable()
};

export const addressService = {
  setData: d => subject.next({ value: d }),
  clearData: () => subject.next(),
  getData: () => subject.asObservable()
};

class TransferToken extends React.Component {
  
  state = {
    destAddress:'',
    transferAmount:0,
    token_status:''
  };
  
  /*
  constructor(props) {
    super(props);
    this.transferToken = this.transferToken.bind(this);
  } 
  */

  token_status(){
    this.setState({token_status:'Token transferred'});
  };

  async transferTokenWallet(){

    //  Create WalletConnect Provider

      //  Enable session (triggers QR Code modal)
      /*
      const main = async () => {
        await provider.enable();
      };
      main();
      */
    //console.log('transferred token')
    
    //const web3_1 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/b9c10f572a084de2b561fbf594c63627"));

    
    const provider = new WalletConnectProvider({
      infuraId: "0b80376570ba486d8c3b6e8dcf1de010",});
      const web3 = new Web3(provider);

    addressService.getData().subscribe(message => {
      console.log(message.value);
      this.setState({destAddress:message.value});
      });
      
    addressService.getData().subscribe(message => {
        console.log(message.value);
        this.setState({transferAmount:message.value});
      });
    
    //var destAddress = this.state.address;
    //var transferAmount = this.state.token;
    //const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/b9c10f572a084de2b561fbf594c63627"));
    //const main = async () => {
    await provider.enable();

    
// Subscribe to accounts change
provider.on("accountsChanged", (accounts) => {
  console.log(accounts);
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId) => {
  console.log(chainId);
});

// Subscribe to session disconnection
provider.on("disconnect", (code, reason) => {
  console.log(code, reason);
});



    //};
    //main();
    var myAddress = "0xE92F9742B1e4072697567804d9DAFDe1B6bF4121";
    var contractAddress = "0x558ec32f25828fde92b89001174901078325163e";
    const abiArray = [
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "_mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "Approval",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "approve",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "subtractedValue",
                  "type": "uint256"
              }
          ],
          "name": "decreaseAllowance",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "addedValue",
                  "type": "uint256"
              }
          ],
          "name": "increaseAllowance",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "transfer",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "Transfer",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "transferFrom",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              }
          ],
          "name": "allowance",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              }
          ],
          "name": "balanceOf",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "decimals",
          "outputs": [
              {
                  "internalType": "uint8",
                  "name": "",
                  "type": "uint8"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "name",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "symbol",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      }
  ];
    
    const contract = new web3.eth.Contract(abiArray, contractAddress, { from: myAddress });
    //var count = 0;
    //const main_2 = async () => {
    const count = await web3.eth.getTransactionCount(myAddress);
    //};
    //main_2();
    var rawTransaction = {
      "from": myAddress,
      "nonce": "0x" + count.toString(16),
      "gasPrice": "0x003B9ACA00",
      "gasLimit": "0x250CA",
      "to": contractAddress,
      "value": "0x0",
      "data": contract.methods.transfer(this.state.destAddress, this.state.transferAmount).encodeABI(),
      "chainId": 0x01
  };
  //var privKey = new Buffer.from('68155f7c2e50b00b040f834766fc0967608a88b2d524a8e27a2f9e264af8d640', 'hex');
  //const tx = new Tx(rawTransaction, {'chain':'rinkeby'});
  //tx.sign(privKey);
  //var signedTx = '';
  //const main_1 = async () => {
  const txHash = await web3.eth.sendTransaction(rawTransaction);
  //}
  //main_1();
  //var serializedTx = signedTx.serialize();
  console.log('sending transaction' + txHash);
  //web3_1.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
  }

  transferToken = (event) => {
    console.log('transfering token');
    this.transferTokenWallet();
    
}
  render() {
  return (
    <div><button onClick={this.transferToken}>
    Transfer Token
  </button>
  <p>{this.state.token_status}</p>
    </div>
  );
}
}

class TokenAmount extends React.Component {

  state = {
    tokenAmount:0
  };

  constructor(props) {
    super(props);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  myChangeHandler = (event) => {
    this.setState({tokenAmount: event.target.value});
    console.log(this.state.tokenAmount);
    tokenService.setData(this.state.tokenAmount);
  }
  render() {
  return (
    <div>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      <Router>
          <div>
          <ul>
          <li>
            <Link to="/transfer_token">Transfer Token</Link>
          </li>
        </ul>
          <Switch>
            <Route path="/transfer_token">
              <TransferToken/>
            </Route>
            </Switch>
            </div>
            </Router>
    </div>
  );
}
}

class ScanQR extends React.Component {

  state = {
    result: 'No result'
  };

  constructor(props) {
    super(props);        
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }

    console.log(this.state.result.substring(10));
    addressService.setData(this.state.result.substring(9));
  }

  handleError = err => {
    console.error(err)
  }
  
  render() {
  return (
    <div>
    <QrReader
    delay={300}
    //style={previewStyle}
    onError={this.handleError}
    onScan={this.handleScan}
    style={{ width: '50%' }}
  />
  <p>{this.state.result}</p>

<Router>
          <div>
          <ul>
          <li>
            <Link to="/token_amount">Token Amount</Link>
          </li>
        </ul>
          <Switch>
            <Route path="/token_amount">
              <TokenAmount/>
            </Route>
            </Switch>
            </div>
            </Router>
  
  </div>
  );
}
}

class Wallet extends React.Component {

    //state = { address:'',token:'' };

    state = {
      result: 'No result'
    };

    /*
    constructor(props) {
      super(props);        
      this.handleScan = this.handleScan.bind(this);
    }
    */
      //sendAddress(event) {

      //event.preventDefault();
      //console.log('connecting to QR scanner');

    //  Create WalletConnect Provider
    /*
    const provider = new WalletConnectProvider({
    infuraId: "b9c10f572a084de2b561fbf594c63627",});
    //  Enable session (triggers QR Code modal)
    const main = async () => {
    await provider.enable();
    };
    main();
    const web3 = new Web3(provider);
    */
  //}
  



  /*
myChangeHandlerAddress = (event) => {
  this.setState({address: event.target.value});
}

myChangeHandlerToken = (event) => {
  this.setState({token: event.target.value});
}
*/



  render() {
    return (
      <div>
     <Router>
          <div>
          <ul>
          <li>
            <Link to="/scan_qr">Scan Sender Address QR code</Link>
          </li>
        </ul>
          <Switch>
            <Route path="/scan_qr">
              <ScanQR/>
            </Route>
            </Switch>
            </div>
            </Router>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <Wallet></Wallet>
    </Router>,
    document.getElementById('root')
  );