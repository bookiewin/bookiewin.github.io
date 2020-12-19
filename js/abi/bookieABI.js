var BASEABI = {
	"contract":"0xAFF7F071561e145C7561668fc796F80F59f56dc5",
	"abi": [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				},
				{
					"indexed": false,
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"name": "Balls_Gen",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "_mintBookieLP",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "_mintUsdt",
			"type": "event"
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
				},
				{
					"internalType": "uint256",
					"name": "betValue",
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
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "BookieValue",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "ClaimBlp",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "ClaimGame",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "ClaimInvite",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "lotteryID",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "poolFund",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "duration",
					"type": "uint256"
				}
			],
			"name": "CreateLottery",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "CrowdFunding",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "btcBlock",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "btcHash",
					"type": "string"
				}
			],
			"name": "DrawBalls",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bytes4",
					"name": "",
					"type": "bytes4"
				}
			],
			"name": "generation_inviter",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint8[6]",
					"name": "level_counts",
					"type": "uint8[6]"
				}
			],
			"name": "SetDrawLevel",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "inviteCode",
					"type": "bytes4"
				}
			],
			"name": "SetInviteCode",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "blp_address",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "crowd_funding_address",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "current_lottery",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "default_invite_code",
			"outputs": [
				{
					"internalType": "bytes4",
					"name": "",
					"type": "bytes4"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "developer_address",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "Duration",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "foundation_address",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8[]",
					"name": "currentballs",
					"type": "uint8[]"
				},
				{
					"internalType": "uint256",
					"name": "randNumber",
					"type": "uint256"
				}
			],
			"name": "GenOneBall",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetAPY",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "apy",
					"type": "uint8"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetAwardInfo",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "gameAward",
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
				},
				{
					"internalType": "uint256",
					"name": "trackNumber",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "betNumber",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "invitee",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
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
			"stateMutability": "view",
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
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetBLPSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "totalSupply",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "lotteryID",
					"type": "uint256"
				}
			],
			"name": "GetDrawResult",
			"outputs": [
				{
					"internalType": "uint8[6]",
					"name": "blue_balls",
					"type": "uint8[6]"
				},
				{
					"internalType": "uint8",
					"name": "red_ball",
					"type": "uint8"
				},
				{
					"internalType": "uint256[6]",
					"name": "level_counts",
					"type": "uint256[6]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "lotteryID",
					"type": "uint256"
				}
			],
			"name": "GetGameAward",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "award",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetInviter",
			"outputs": [
				{
					"internalType": "address",
					"name": "inviter_address",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "GetLastPrize",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "lottery_id",
					"type": "uint256"
				},
				{
					"internalType": "uint8[7]",
					"name": "balls",
					"type": "uint8[7]"
				},
				{
					"internalType": "uint256[6]",
					"name": "level_counts",
					"type": "uint256[6]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetLottery",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "gameID",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "drawTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "jackpot",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "lastDrawTime",
					"type": "uint256"
				},
				{
					"internalType": "uint8[7]",
					"name": "lastBalls",
					"type": "uint8[7]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "GetMyInivited",
			"outputs": [
				{
					"internalType": "address[10]",
					"name": "",
					"type": "address[10]"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "GetUserLastBet",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "lottery_id",
					"type": "uint256"
				},
				{
					"internalType": "uint8[49]",
					"name": "blue_balls",
					"type": "uint8[49]"
				},
				{
					"internalType": "uint8[10]",
					"name": "red_balls",
					"type": "uint8[10]"
				},
				{
					"internalType": "uint256",
					"name": "bet_count",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "invited_address",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "lottery_prize",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "lottery_id",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "MyInviteCode",
			"outputs": [
				{
					"internalType": "bytes4",
					"name": "invite_code",
					"type": "bytes4"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner_address",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "usdt_address",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "user_bet_tickets",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "lottery_id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "bet_user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "bet_count",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "award",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "user_bets",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "user_tickets",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "lottery_id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "bet_user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "bet_count",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "award",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}