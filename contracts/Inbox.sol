// Specific version of the solidity  that our source code is written
// Version Identifier of the code
pragma solidity ^0.4.0;


contract Inbox{
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }    
}