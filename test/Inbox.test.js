const assert    = require('assert');
const ganache   = require("ganache-cli");
const Web3      = require("web3");

// Instance of the library connected to multiple provider ( with the different network )
const web3 = new Web3( ganache.provider()) ;
const {interface, bytecode} = require("../compile")


let accounts;
let inbox;
beforeEach( async ()=> {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Creating and Sending accounts
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy( { data: bytecode, arguments: ['Hi there'] })

        // Use one of th those accounts to deploy
        .send({ from: accounts[0], gas: '1000000'});

    
        
    
});



describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);

    })

});

