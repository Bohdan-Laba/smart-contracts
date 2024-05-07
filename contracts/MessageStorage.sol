// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MessageStorage{
    //mapping of sent messages
    mapping (address => mapping(address => string[])) private _messages;
    mapping(address => address[]) private _contacts;

    event MessageSent(address indexed sender, address indexed recipient, string message);

    function sendMessage(address recipient, string memory message) public {
        require(bytes(message).length > 0, "Message can't be empty");
        require(recipient != msg.sender, "Sorry, no saved messages");

        _messages[msg.sender][recipient].push(message);
        _contacts[recipient].push(msg.sender);

        emit MessageSent(msg.sender, recipient, message);
    }

    function getMessages() public view returns(string[][] memory){
        address[] memory myContacts = _contacts[msg.sender];
        string[][] memory myMessages = new string[][](myContacts.length);
        for (uint128 i = 0; i < myContacts.length; i++) {
            myMessages[i] = _messages[myContacts[i]][msg.sender];
        }

        return myMessages;
    }

    function getMessageFrom(address sender) public view returns(string[] memory){
        
        return _messages[sender][msg.sender];
    }
}