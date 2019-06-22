export const Anubis_ADDRESS = '0x45eEa1ee8B0DD716A57e30EBE2DCd394E8EaCe96'
export const Anubis_ABI=[
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "Maat",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "alive",
        "type": "bool"
      },
      {
        "name": "location",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "pyramidCounter",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "population",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Jesus",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Sahara",
    "outputs": [
      {
        "name": "pharaoh",
        "type": "address"
      },
      {
        "name": "challenger",
        "type": "address"
      },
      {
        "name": "pyramidHeight",
        "type": "uint32"
      },
      {
        "name": "pyramidClock",
        "type": "uint32"
      },
      {
        "name": "round",
        "type": "uint8"
      },
      {
        "name": "inChallenge",
        "type": "bool"
      },
      {
        "name": "pharaoh_Done",
        "type": "bool"
      },
      {
        "name": "challenger_Done",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_kingId",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_playerId",
        "type": "address"
      }
    ],
    "name": "Battle",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "address"
      },
      {
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "createEgyption",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "address"
      }
    ],
    "name": "getName",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "address"
      },
      {
        "name": "_height",
        "type": "uint32"
      }
    ],
    "name": "createPyramid",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_pyramidNumber",
        "type": "uint256"
      }
    ],
    "name": "destroyPyramid",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "address"
      }
    ],
    "name": "getmyPyramid",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "address"
      },
      {
        "name": "_pyramidNumber",
        "type": "uint256"
      }
    ],
    "name": "goIntoPyramid",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "address"
      },
      {
        "name": "_pyramidNumber",
        "type": "uint256"
      },
      {
        "name": "_isCivilian",
        "type": "bool"
      }
    ],
    "name": "selectCard",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_pyramidNumber",
        "type": "uint256"
      },
      {
        "name": "_round",
        "type": "uint256"
      }
    ],
    "name": "getBattleHistory",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_pyramidNumber",
        "type": "uint256"
      }
    ],
    "name": "judge",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]