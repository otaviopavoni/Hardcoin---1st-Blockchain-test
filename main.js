// P.S.: O seguinte código foi baseado em uma vídeoaula sobre criar simples blockchains. É apenas algo feito por diversão e curiosidade.
// github.com/otaviopavoni - Siga-me para póstumas atualizações na Blockchain :)

// P.S.: That code was based in a YouTube video teaching to create simple blockchains. It is something made just for fun and curiosity.
// github.com/otaviopavoni - Follow me for next Hardcoin Blockchain's update :)

// THIS IS NOT A REAL COIN, DO NOT BUY ANYTHING RELATED TO HARDCOIN! - ESSA NÃO É UMA MOEDA DE VERDADE, NÃO COMPRE NADA RELACIONADO À HARDCOIN!
//// https://www.youtube.com/watch?v=zVqczFZr124

const SHA256 = require('crypto-js/sha256');
const date = new Date();
const currentDate = JSON.stringify(date);
const prompt = require('prompt-sync')(); //install npm install prompt-sync

var BlockNumber = 0;

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, currentDate.slice(0,11), "Genesis Block", "0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        BlockNumber +=1;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}



let hardCoin = new Blockchain();

hardCoin.addBlock(new Block(BlockNumber, currentDate.slice(0,11), { amount: 4 }));
hardCoin.addBlock(new Block(BlockNumber, currentDate.slice(0,11), { amount: 10 }));

console.log(JSON.stringify(hardCoin, null, 4,));
console.log('Is blockchain valid? ' + hardCoin.isChainValid() + '\n');

/*

// Tentendo modificar os dados da Blockchain - Trying to change Blockchain's info
hardCoin.chain[1].data = { amount: 100 };

console.log(JSON.stringify(hardCoin, null, 4,));
console.log('Is blockchain valid? ' + hardCoin.isChainValid());

*/

function CreateNewBlock(){
    let HCamount = prompt("How much Hardcoin would you like to transfer? ");
    hardCoin.addBlock(new Block(BlockNumber, currentDate.slice(0,11), { amount: HCamount }));
    console.log('Block generated!');
};

function CheckBlockchain(){
    console.log('This is the current blockchain:\n');
    console.log(JSON.stringify(hardCoin, null, 4));
    if(hardCoin.isChainValid == true){
        console.log('The blockchain is valid!\n');
    } else{
        console.log('The blockchain is not valid!\n');
    }

};

const userRequestedNewBlock = prompt('Do you want to create a new block? ');
if (userRequestedNewBlock == "y" || userRequestedNewBlock == "yes" || userRequestedNewBlock == "yea" || userRequestedNewBlock == "yep" || userRequestedNewBlock == "ye"){
    CreateNewBlock();
} else{
    console.log('Ok, you do not want to create a new block.');
};

const userRequestedBlockchain = prompt('Do you want to see the current blockchain? ');
if (userRequestedBlockchain == "y" || userRequestedBlockchain == "yes" || userRequestedBlockchain == "yea" || userRequestedBlockchain == "yep" || userRequestedBlockchain == "ye"){
    CheckBlockchain()
};