# Bookie interface

## Game
### User interface
1. GetLottery
```
Get current lottery infomation
function GetLottery() public view returns(uint256 lotteryID, uint256 drawTime, uint256 jackpot, uint256 lastDrawTime, uint8[7] memory lastBalls)
Params:
    NONE
Returns:
    uint256 lotteryID   // lottery id, such as: 20210001
    uint256 drawTime    // balls draw time
    uint256 jackpot     // jackpot for this game
    uint256 lastDrawTime    // last time of draw
    uint8[7] memory lastBalls   // last draw result(include 6 blue balls and a red ball)
```
2. GetBetValue
```
Calculate bet value
function GetBetValue(uint64 balls, uint256 betCount) internal pure returns (uint256 betValue)
Params:
    uint64 balls        // bet balls (49 blue balls and 10 red balls, set by bit)
                        /*
                        Example:
                            6 blue balls select: 1,2,3,4,5,6 and a red ball select 1
                            ===========1111=1110=0000=0000=0000=0000
                            -----------6543-210f-edcb-a098-7654-3210
                             ...  ...  0000 0000 0000 0000 0011 1111 (49bit for 49 blue balls)
                            ----------------------------------------
                             ...   0x0  0x0  0x0  0x0  0x0  0x3  0xf
                            ==========================6555=5555=5554
                            --------------------------0987-6543-2109
                            red ball                  0000 0000 0010 (10bit for 10 red balls)
                            ----------------------------------------
                            red ball                   0x0  0x0  0x2
                            ========================================

                            sum bit: 0x200000000003f for 6 blue balls and a red ball
                        */
    uint256 betCount    // bet counts
Returns:
    uint256 betValue    // bet value
```
3. BetBalls
```
function BetBalls(uint64 balls, uint256 betCount, uint256 betValue) public
Params:
    uint64 balls        // bet balls (49 blue balls and 10 red balls, set by bit)
    uint256 betCount    // bet counts
    uint256 betValue    // bet value
Returns:
    NONE
```
4. GetUserAward
```
Get unclaimed award
function GetUserAward() public view returns(uint256)
Params:
    NONE
Returns:
    uint256 award   // user unclaimed award
```
5. ClaimUserAward
```
Claim unclaimed award
    function ClaimUserAward() internal returns(uint256 award)
Params:
    NONE
Returns:
    uint256 award   // user unclaimed award
```

### Manager interface
1. CreateLottery
```
Create a new lottery
    function CreateLottery(uint256 _lottery_id, uint256 _pool_size, uint256 _duration) public
Params:
    uint256 _lottery_id // lottery id, such as: 20210001
    uint256 _pool_size  // pool size(usdt)
    uint256 _duration   // duration for period, if _duration is ZERO, setting default: 7 days 604800 seconds
Returns:
    NONE
```
2. DrawBalls
```
Drawing balls
    function DrawBalls(uint256 btcBlock, string memory btcHash) public
Params:
    uint256 btcBlock        // btc block number
    string memory btcHash   // btc block hash
Returns:
    NONE
```
3. SetDrawResult
```
Setting award
    function SetDrawResult(uint256[8] memory _level_winner, uint256[8] memory _winner_award)
Params:
    uint256[8] memory _level_winner // winner count in level, such as: [1,2,10,100,1000,10000,20000,30000]
    uint256[8] memory _winner_award // winner award in levle, such as: [12345678,0,0,0,0,0,0,0]
Returns:
    NONE
```