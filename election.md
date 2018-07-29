## Introduction

what is blockchain

why vote is good app for blockchain app

smart contract with solidity

Dapp the big picture

what will be build

## Installation

install nodejs

https://nodejs.org/en/

install truffle

https://truffleframework.com/

install gnache

https://truffleframework.com/ganache

install metamask on chrome

https://metamask.io/

install visualcode

https://truffleframework.com/tutorials/configuring-visual-studio-code

## Start Project

mkdir election

cd election

truffle unbox pet-shop --> have a lot of exist code

project structure

## Initialize smart contract

election contract design and structure

start code smart contract

create migration for smart contract

truffle migrate --> migrate contract

truffle console --> interact with contract after migrate

promises review

app.address --> contract address

explain gas on ganache account

## Develop smart contract 

candidate structure

store candidate in mapping --> explain mapping in solidity

store candidate count

constructor function

add candidate function --> explain private, public

vote function



how to explain msg.sender from log ?

explain msg.sender

**instance.vote(1).then(function(ret){console.log(ret.logs[0].args.voter);})**



how to change msg.sender ?

explain web3.eth.accounts and web3.eth.accounts[0]





## Smart contract automation testing

mocha and chai

truffle test structure

truffle test --> running test

## Front end

front end structure and code

explain Election.json

web3js and communication with blockchain

## Smart contract continue

vote function

test for vote function

do vote from ui

vote event

listen to vote event on frontend

## Deploy app to test network

## Using IPFS

## Bonus : Using React for front end