var BASEABI = {
	"contract":"0xDAe59655cAf3bF531F84d27CC90EC8C84ed86B01",
	"abi": [
		{
			"inputs": [
				{
					"internalType": "uint8[49]",
					"name": "blueBalls",
					"type": "uint8[49]"
				},
				{
					"internalType": "uint8[10]",
					"name": "redBalls",
					"type": "uint8[10]"
				},
				{
					"internalType": "uint256",
					"name": "betCount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "betUsdt",
					"type": "uint256"
				}
			],
			"name": "Bet",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetAwardInfo",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "totalAward",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "inviteAward",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "bookieAward",
					"type": "uint256"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetBall49Info",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "poolFund",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "betCount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "jackpot",
					"type": "uint256"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8[49]",
					"name": "blueBalls",
					"type": "uint8[49]"
				},
				{
					"internalType": "uint8[10]",
					"name": "redBalls",
					"type": "uint8[10]"
				},
				{
					"internalType": "uint256",
					"name": "betCount",
					"type": "uint256"
				}
			],
			"name": "GetBetValue",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "betValue",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetBookieInfo",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "userBLP",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "userAward",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "totalBookie",
					"type": "uint256"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetBookieUserBLP",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "userBLP",
					"type": "uint256"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		}
	]
}