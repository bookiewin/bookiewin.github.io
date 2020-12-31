var BASEABI = {
	"contract":"0x0D89A3C81591c47019227b8eED33eeE33FA767EC",
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
					"name": "index",
					"type": "uint8"
				},
				{
					"indexed": false,
					"internalType": "uint8",
					"name": "ball",
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
					"name": "sender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "ticket_id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "total_bet",
					"type": "uint256"
				}
			],
			"name": "BetLog",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "CreateLotteryLog",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "ball_number",
					"type": "uint256"
				}
			],
			"name": "ShowBallNumber",
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
					"internalType": "uint64",
					"name": "balls",
					"type": "uint64"
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
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint64",
					"name": "balls",
					"type": "uint64"
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
			"name": "BetBalls",
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
			"inputs": [
				{
					"internalType": "address payable",
					"name": "new_owner",
					"type": "address"
				}
			],
			"name": "ChangeOwner",
			"outputs": [],
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
					"name": "_lottery_id",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_pool_size",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_duration",
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
			"name": "Crowd_Funding",
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
			"outputs": [],
			"stateMutability": "nonpayable",
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
			"inputs": [],
			"name": "GetBetNumber",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "betNumber",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint64",
					"name": "balls",
					"type": "uint64"
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
			"name": "GetDefaultInviterCode",
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
			"name": "GetGameAward",
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
					"internalType": "uint256[8]",
					"name": "level_counts",
					"type": "uint256[8]"
				},
				{
					"internalType": "uint256[8]",
					"name": "winner_award",
					"type": "uint256[8]"
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
					"name": "lotteryID",
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
			"name": "GetLotteryPool",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "pool_size",
					"type": "uint256"
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
			"inputs": [],
			"name": "GetTrackNumber",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "trackNumber",
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
			"inputs": [],
			"name": "Kill",
			"outputs": [],
			"stateMutability": "payable",
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
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_ticket_id",
					"type": "uint256"
				}
			],
			"name": "Parse_bet",
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
					"internalType": "uint256[49]",
					"name": "blue_balls",
					"type": "uint256[49]"
				},
				{
					"internalType": "uint256[10]",
					"name": "red_balls",
					"type": "uint256[10]"
				},
				{
					"internalType": "uint256",
					"name": "bet_count",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "bet_value",
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
					"internalType": "uint256[8]",
					"name": "_level_winner",
					"type": "uint256[8]"
				},
				{
					"internalType": "uint256[8]",
					"name": "_winner_award",
					"type": "uint256[8]"
				}
			],
			"name": "SetDrawResult",
			"outputs": [],
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
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "draw_results",
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
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "lotteries",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "lottery_index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "lottery_id",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "pool_size",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "bonus",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "draw_time",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "total_bet",
					"type": "uint256"
				},
				{
					"internalType": "uint8",
					"name": "status",
					"type": "uint8"
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
			"name": "tickets_map",
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
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "user_tickets",
			"outputs": [
				{
					"internalType": "address",
					"name": "bet_user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "lottery_index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "lottery_id",
					"type": "uint256"
				},
				{
					"internalType": "uint64",
					"name": "balls",
					"type": "uint64"
				},
				{
					"internalType": "uint256",
					"name": "bet_count",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "bet_value",
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