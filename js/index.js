var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var _CROWDABI = CROWDFUNDINGABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
var contractAddressCROWD = CROWDFUNDINGABI.contract
var _Bookie, _account, _USDT, _USDTACCOUNT
var $selectCurrency = $("#selectCurrency")
var $waitBox = $('.js-wait-box')
var $crowdFunding = $('.js-crowd-funding')
let $crowdBox = $('.js-crowd-box')
let targetTime
let downTime
let times

// head top
$('.js-Home').click(function () {
    if(web3.eth.coinbase){
        window.location.href = '/index.html'
    }
    
})
$('.js-Bookie').click(function () {
    if(web3.eth.coinbase){
        window.location.href = '/bookie.html'
    }
    
})
$('.js-Shortcut').click(function () {
    if(web3.eth.coinbase){
        window.location.href = '/shortcut.html'
    }
    
})
$('.js-Dashboard').click(function () {
    if(web3.eth.coinbase){
        window.location.href = '/dashboard.html'
    }
})
$('.js-Game').click(function () {
    if(web3.eth.coinbase){
        window.location.href = '/game.html'
    }
})
$crowdFunding.click(function () {
    if(web3.eth.coinbase){
        window.location.href = '/crowgFunding.html'
    }
})
// href
$('.js-jion-game').click(function () {
    window.location.href = '/game.html'
})
// judge web3
InitPage()
async function initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            return true
        } catch (error) {
            return false
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        return true
    } else if (window.web3.eth.coinbase) {
        await ethereum.enable();
    }
}
async function InitPage() {
    isweb3 = await initWeb3();
    if (!isweb3) {
        alert("This website needs to install metamask plug-in. Click OK to enter metamask website")
        document.location = "https://metamask.io/"
    } else {
        _Bookie = web3.eth.contract(_abi).at(contractAddress)
        _account = web3.eth.coinbase;

        _USDT = web3.eth.contract(_USDTABI).at(contractAddressUSDT)
        _USDTACCOUNT = web3.eth.coinbase;
        _CROWD = web3.eth.contract(_CROWDABI).at(contractAddressCROWD)

        //Bookie GetLottery
        let $homeBookieList = $('.js-home-bookie-list li')
        let $winningNumbers = $('.js-winning-numbers')
        let $bookieJoin = $('.js-bookie-join')
        let $nextDrawing = $('.js-next-drawing')
        let gameID = ''
        let estimated = ''
        _Bookie.GetLottery.call(function (error, result) {
            gameID = result.valueOf()[0].toNumber()
            targetTime = result.valueOf()[1].toNumber()
            downTime = result.valueOf()[1].toNumber() * 1000
            now = Date.parse(new Date()); // location
            times = downTime - (now + new Date().getTimezoneOffset()*60000);
            $('.js-target-time').html(new Date(targetTime * 1000).toDateString())
            if(times > 0) {
                timestampToTime(times)
            } else {
                $('.js-time').html('--:--:--')
                $('.js-target-time').html('--')
            }
            estimated = web3.fromWei(result.valueOf()[2].toNumber(), "mwei")
            NumAutoPlusAnimation("js-estimated", {time: 1000,num: estimated,regulator: 30})
            if(estimated > 0){
                setTimeout(() => {
                    $('.js-estimated').html(numFormat(retain2(estimated , 2)))
                }, 1100);
            }
            
            if(result.valueOf()[3].toNumber() == 0){
                $winningNumbers.hide()
                $nextDrawing.show()
            }else{
                $nextDrawing.hide()
                $winningNumbers.show()
                $('.js-Winning-time').html(new Date(result.valueOf()[3].c[0] * 1000).toDateString())
                $homeBookieList.eq(0).html(result.valueOf()[4].valueOf()[0].c[0])
                $homeBookieList.eq(1).html(result.valueOf()[4].valueOf()[1].c[0])
                $homeBookieList.eq(2).html(result.valueOf()[4].valueOf()[2].c[0])
                $homeBookieList.eq(3).html(result.valueOf()[4].valueOf()[3].c[0])
                $homeBookieList.eq(4).html(result.valueOf()[4].valueOf()[4].c[0])
                $homeBookieList.eq(5).html(result.valueOf()[4].valueOf()[5].c[0])
                $homeBookieList.eq(6).html(result.valueOf()[4].valueOf()[6].c[0])
            }
        });
        //bookie crowd_status
        _CROWD.crowd_status.call(function (error, result) {
            if(result.toNumber()) {
                $bookieJoin.hide()
                $crowdBox.show()
            }else {
                $bookieJoin.show()
                $crowdBox.hide()
            }
            $waitBox.hide()
        });
    }
}

// home bookie
$('.js-home-bookie').click(function(){
    $waitBox.show()
    if(web3.eth.coinbase){
        window.location.href = '/bookie.html'
        _Bookie.GetInviter.call(function (error, result) {
            if(result == "0x0000000000000000000000000000000000000000"){
                $('.js-invited').hide();
                 $('.js-bookie-btn').show();
            }else{
                $('.js-invited').show();
                $('.js-bookie-btn').hide();
            }
            $waitBox.hide()
            let href = window.location.href.split('=')[1] || ' ' 
            $('.js-invited-by').val(href)
        });
    }
    
})
// utc time
$('.js-utc').click(function() {
    if($(this).attr('change') == 'utc') {
        $('.js-target-time').html(new Date((targetTime ) * 1000).toDateString())
        timestampToTime(times)
        $(this).removeAttr('change')
    }else {
        $(this).attr('change','utc')
        let localtime = Number(targetTime) + Number(new Date().getTimezoneOffset()*60)
        $('.js-target-time').html(new Date(localtime * 1000).toDateString())
        timestampToTime(times)
    }
})
// listen
ethereum.on('networkChanged', function (networkIDstring) {
    if (window.ethereum.networkVersion != 3) {
        alert("Please link to ropsten test network");
    }
})
ethereum.on('accountsChanged', function (networkIDstring) {
    if (web3.eth.coinbase == null) {
        window.location.href = '/unclock.html'
        $('.connect-btn').show()
    }else {
        $('.connect-con').show()
        $('.js-coinbase').html(getSubStr(web3.eth.coinbase) )
    }
})
// 时间戳转时分秒
var $timesBox = $('.js-times')
let time_1 
function timestampToTime(timestamp) {
    clearInterval(time_1)
    let tt = timestamp
    time_1 = setInterval(() => {
        tt -= 1000
        let days
        let endTimes
        if (tt > 86400000) {
            days = parseInt(tt / 86400000)
        }
        if (days) {
            endTimes = tt - days * 86400000
        }
        var date = new Date(endTimes ? endTimes : tt)
        h = date.getHours() < 10 ? `0${date.getHours()}:` : `${date.getHours()}:`
        m = date.getMinutes() < 10 ? `0${date.getMinutes()}:` : `${date.getMinutes()}:`
        s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
        if (days) {
            $timesBox.html(`${days * 24 + parseFloat(h)}:` + m + s)
        } else {
            $timesBox.html(h + m + s)
        }
    }, 1000)
}

// View status
async function getReceipt(data) {
    return new Promise(function (resolve, reject) {
        web3.eth.getTransactionReceipt(data, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}