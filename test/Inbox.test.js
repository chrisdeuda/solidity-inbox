const assert    = require('assert');
const ganache   = require("ganache-cli");
const Web3      = require("web3");

// Instance of the library connected to multiple provider ( with the different network )
const provider = ganache.provider();
const web3 = new Web3(provider ) ;
const {interface, bytecode} = require("../compile")


let accounts;
let inbox;
const INITIAL_STRING = "Hi there";
beforeEach( async ()=> {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Creating and Sending accounts
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy( { data: bytecode, arguments: [INITIAL_STRING] })

        // Use one of th those accounts to deploy
        .send({ from: accounts[0], gas: '1000000'});

    inbox.setProvider(provider);
});



describe('Inbox', () => {
    // Check if sure that it was successfully deploy

    it('deploys a contract', () => {
        // If the address exist in the object
        assert.ok(inbox.options.address);
    })

    // It should check the default message as save
    it('has a default message', async ()=> {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);

    }) ;

    // Asserts that the message properties has been updated

    it('can change the message', async () => {
        // It will proceed if the Tx works well
        await inbox.methods.setMessage('bye').call()
            .send({ from: accounts[0], gas: '1000000'});
        //sending the Tx from the accounts

        const message = await inbox.method.message().call();
        
        assert.equal( message, 'bye')

    });

});

