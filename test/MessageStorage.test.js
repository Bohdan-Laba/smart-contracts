const MessageStorageContract = artifacts.require("MessageStorage");

contract("MessageStorage", (accounts) => {
    before(async() => {
        messageStorageContract = await MessageStorageContract.deployed();

        console.log(messageStorageContract.address);
        console.log(accounts);

    })
    
    it("Checks messages of account 1", async() => {
        let messages = await messageStorageContract.getMessages({from: accounts[1]});

        console.log(messages);
    })

    it("Send Message", async() => {
        let sendResult  = await messageStorageContract.sendMessage(accounts[1], "Hello World!", {from: accounts[0]});
        console.log(sendResult);

        let destinationInbox1 = await messageStorageContract.getMessages({from: accounts[1]});
        console.log(destinationInbox1);
        
        assert.equal(destinationInbox1, "Hello World!", "Inbox has to have a message");
    })

    // it("Send Messages from two users", async() => {
    //     let sendResult  = await messageStorageContract.sendMessage(accounts[1], "Hello World!", {from: accounts[0   ]});
    //     console.log(sendResult);
    //     let sendResult1  = await messageStorageContract.sendMessage(accounts[2], "Hello World!", {from: accounts[0]});

    //     let destinationInbox1 = await messageStorageContract.getMessages({from: accounts[2]});
    //     console.log(destinationInbox1);
        
    //     assert.equal(destinationInbox1, "Hello World!", "Inbox has to have a message");
    // })
})