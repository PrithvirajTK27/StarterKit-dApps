//Assets
import logo from '../logo.svg';
import sol_logo from '../Solidity_logo.svg';
import './App.css';
//Module Imports
import React, { Component, createRef } from 'react';
import Form from 'react-bootstrap/Form';                                  //Trial
import Button from 'react-bootstrap/Button';                              //Trial
import 'bootstrap/dist/css/bootstrap.css';                                //Trial
import { ethers } from 'ethers';
//Contract import
import Storage from '../abis/Storage.json'
const contractAddress = '0x6CD32B1c1dac374463F0834082A1a37600F577F1';     //Deployed Contract Address

//Create instance of contract
function createInstance(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return (new ethers.Contract(contractAddress, Storage.abi, signer));
  }
//Fetch account
function accSet(){
  const addr = window.ethereum.request({ method: 'eth_requestAccounts' });
  const promiseAddr = new Promise((resolve, reject) => {
    resolve(addr);
  });
  return promiseAddr;
}

class App extends Component {
  constructor(props) {
      super(props);
      this.inNumber = createRef();                                            //Trial
      this.outNumber = createRef();                                           //Trial
      this.state = {
        contract: createInstance(),
      }
  }

  async componentDidMount(){
    const res = await accSet();
    this.setState({account:res[0]});
    //Listeners
    await window.ethereum.on('accountsChanged', (accounts) => {
      window.location.reload();
    });
    await window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  }

  onSubmit = (e) => {                     //Trial
    console.log("Submitting form!!!");
    console.log("Using account: "+this.state.account);
    console.log("Entered value: "+this.inNumber.current.value);
    
    this.state.contract.store(this.inNumber.current.value).then ((r) => {     //Trial to put data in contract
      console.log("Number added to chain successfully...");
    });
  };

  onSubmitFetch = (e) => {                //Trial
    console.log("Fetching data from contract!!");
    console.log("Using account: "+this.state.account);
    
    this.state.contract.retrieve().then ((r) => {                             //Trial to fetch data from contract
      this.outNumber.current.value = r;
      console.log("Number fetched from the chain successfully...");
      console.log("Fetched value: "+this.outNumber.current.value);
    });
  };

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='logos'>
          <img src={logo} className="App-logo" alt="logo" />
          <img src={sol_logo} className="Sol-logo" alt="logo" />
        </div>
        <p>
          Edit <code>src/pages/App.js</code> and save to reload.
          <br></br>
          Account: <code>{this.state.account?.length > 0 ? this.state.account : "Not Connected!"}</code>
        </p>
        <div className='logos'>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a
            className="App-link"
            href="https://soliditylang.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{marginLeft: "150px"}}
          >
            Learn Solidity
          </a>
        </div>
        <div className='ContractInteraction'>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="TextInput">store(param)</Form.Label>
              <Form.Control type="number" id="TextInput" placeholder="Enter a Number" ref={this.inNumber}/>
              <Form.Text className="text-muted">
                It can be any number.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={this.onSubmit}>
              Submit
            </Button>
          </Form>
          <div class = "vertical"></div>
          <Form className='Fetch'>
            <fieldset disabled>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">retrieve()</Form.Label>
                <Form.Control type="number" id="disabledTextInput" placeholder="Number" ref={this.outNumber}/>
                <Form.Text className="text-muted">
                  Click Fetch to retrieve.
                </Form.Text>
              </Form.Group>
              </fieldset>
              <Button variant="primary" onClick={this.onSubmitFetch}>Fetch</Button>
            
          </Form>
        </div>
      </header>
    </div>
  );
  }
}

export default App;
