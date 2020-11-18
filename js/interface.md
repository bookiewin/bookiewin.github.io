# bookie contract interface

## contract
```
Bookie contract address(ropsten network): 0x535865C8A7d996C4EDBF1b625681e002EC7824bC

Usdt-test contract address(ropsten network):0xAb62481FD2031bd25B3489A5db99807815e81B66
```

## USDT
```
Usdt.balanceOf(address account) public view returns (uint256) 
Param
    address
Return
    uint256 (account's usdt balance)

Usdt.approve(address spender, uint256 value) public returns (bool)
Param
    spender:    default to bookie contract address
    value:      value of usdt
```


## Home
```
* DELETED
* Bookie.GetBookieInfo() returns(uint256 userBLP, uint256 userAward, uint256 totalBookie)
Param
    None
Return
    userBLP: BLP of user(Bookie LP)
    userAward: award of user (USDT)
    totoalBookie: total bookie supply(Bookie LP)

Bookie.GetLottery() public view returns(uint256 gameID, uint256 drawTime, uint256 jackpot, uint256 lastDrawTime, uint8[7] memory lastBalls)
Param
    None
Return
    gameID: the ID of games, such as: 20200001
    drawTime: the time of drawing ball, timestamp(second)
    jackpot: jackpot of this game
    lastDrawTime: last draw time, return 0 if not have
    lastBalls:  last draw balls, return 0 for all balls if not have
                lastBalls[0-5]:blue balls, lastBalls[6]:red ball
    

Bookie.GetDraw(uint256 gameID) returns(uint8[7] balls)
Param
    gameID: the ID of games, such as: 20200001
Return
    balls: 6 blue balls (balls[0-5]) and a red ball(balls[6])
```

## Bookie page
```
Bookie.GetInviteStatus() public view returns (address inviter_address)
Param
    None
Return
    inviter_address: address of inviter, return 0 if not have inviter

Bookie.Register(address inviterAddress) public returns (bool)
Param
    inviterAddress: address of inviter
Return
    bool: true for success, otherwise is false

Bookie.GetAPY() public view returns (uint8 apy)
Param
    None
Return
    apy: Annual percentage yields

Bookie.BookieValue(uint256 value) public returns(bool)
Param
    value: the value of bookie
Return
    bool: true for success, otherwise is false

Bookie.Shortcut(uint256 bookieValue, uint256 betValue, uint8[7] memory balls) public returns (bool)
Param
    bookieValue: value of bookie
    betValue: value of bet to game
    balls:  random balls
Return
    bool: true for success, otherwise is false
```

## Award
```
Bookie.GetAwardInfo() returns(uint256 totalAward, uint256 inviteAward, uint256 bookieAward)
Param
    None
Return
    totalAward: total award for user(Bookie LP)
    inviteAward: award of invite(Bookie LP)
    bookieAward: award of bookie(Bookie LP)
```

## Ball49
```
Bookie.GetBall49Info() returns(uint256 poolFund, uint256 betCount, uint256 jackpot)
Param
    None
Return
    poolFund: pool fund of ball 49 game (USDT)
    betCount: bet count of game
    jackpot: the bigest bonus in game (USDT)

Bookie.GetBetValue(uint8[49] memory blueBalls, uint8[10] memory redBalls, uint256 betCount) returns(uint256 betValue)
Param
    blueBalls:   blue balls(49, such as:[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    redBalls:    red balls(10, such as:[1,0,0,0,0,0,0,0,0,0])
    betCount:    count of bet(such as: 2)
Return
    betValue: get bet value from betting infomation

Bookie.Bet(uint8[49] memory blueBalls, uint8[10] memory redBalls, uint256 betCount, uint256 betUsdt) return(bool)
Param
    blueBalls:   blue balls(49, such as:[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    redBalls:    red balls(10, such as:[1,0,0,0,0,0,0,0,0,0])
    betCount:    count of bet(such as: 2)
    betUsdt:     usdt value of bet
Return
    bool:   true for successed, otherwise is false


Bookie.WithdrawUsdt() public returns(uint256)
Param
    None
Return
    uint256: withdraw value of usdt

Bookie.WithdrawBlp() public returns(uint256)
Param
    None
Return
    uint256: withdraw value of blp

Bookie.GetBLPSupply() public returns(uint256){
Param
    None
Retrun
    uint256: Total supply of Bookie LP
```
