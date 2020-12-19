var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var _CROWDABI = CROWDFUNDINGABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
var contractAddressCROWD = CROWDFUNDINGABI.contract
var _Bookie, _account, _USDT, _USDTACCOUNT
var $inviteUrl = $('.js-inviteUrl')
var $jsLoadingBox = $('.js-loading-box')
var $dashboardBox = $('.js-dashboard-box')
$inviteUrl.hide()
$jsLoadingBox.hide()
// judge web3
InitPage()
async function initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {await ethereum.enable();return true} catch (error) {return false}
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

        //award
        _Bookie.GetAwardInfo.call(function (error, result) {
            let gameAward = web3.fromWei(result.valueOf()[0].toNumber(), "mwei");
            let inviteAward = web3.fromWei(result.valueOf()[1].toNumber(), "mwei");
            let bookieAward = web3.fromWei(result.valueOf()[2].toNumber(), "ether");
            $(".js-dash-game").html(numFormat(retain2(gameAward , 2)))
            $(".js-dash-invite").html(numFormat(retain2(inviteAward , 2)))
            $(".js-dash-bookie").html(numFormat(retain2(bookieAward , 2)))
            let trackV = result.valueOf()[3].toNumber()
            let historyV = result.valueOf()[4].toNumber()
            let inviteeV = result.valueOf()[5].toNumber()
            $('.js-track-number').html(trackV)
            $('.js-history').html(historyV)
            $('.js-invitee').html(inviteeV)
        });
          // invite-address
        _Bookie.MyInviteCode.call(function (error, result) {
            if(result) {
                $('.js-invite-address').html('https://bookiewin.github.io?share=' + result)
                $('.js-invite-address-hide').val('https://bookiewin.github.io?share=' + result)
            }
        });
        //Get invited friends address list
        _Bookie.GetMyInivited.call(function (error, result) {
            let strhtml = ''
            let curIndex
            for( var i= 0; i<result[0].length; i++) {
                curIndex = result[0][i]
                strhtml+='<li>'+getSubStrEight(curIndex)+'</li>'
            }
            $('.js-invited-ul').html(strhtml)
        });
        //Get invited friends address list10
        let index = 0
        _Bookie.GetLastPrize.call(index, function (error, result) {
            if(result) {
                index +=1
                GetLastPrizeFn(index)
            }
        });
        //30
        let indexhostory = 0
        _Bookie.GetUserLastBet.call(indexhostory, function (error, result) {
            console.log(result);
            
        });

    }
}
function GetLastPrizeFn(index) {
    _Bookie.GetLastPrize.call(index, function (error, result) {
        if(result) {
            index +=1
         return  GetLastPrizeFn(index)
        }
    }) 
}
//track
let $trackBtn = $('.js-track-btn')
$trackBtn.click(function() {$('.js-track-box').show()})
$('.js-drawings-box').click(function(event) {event.stopPropagation();})
$('.js-track-box').click(function(event) {$(this).hide()})

//history
let $historyBtn = $('.js-history-btn')
$historyBtn.click(function() {$('.js-history-box').show()})
$('.js-history-box').click(function(event) {event.stopPropagation();})
$('.js-history-box').click(function(event) {$(this).hide()})

// invite-friends
$('.js-invite-friends').click(function () {
    $dashboardBox.hide()
    $inviteUrl.show()
})
// Copy to Clipboard
$('.js-Clipboard').click(function () {
    let _select = document.getElementById('js-invite-address-hide')
    _select.select()
    document.execCommand("Copy"); 
    alert("Content copied successfully!");
})
$('.js-claim-invite').click(function () {
    $jsLoadingBox.show()
    data = _Bookie.ClaimInvite.getData();
    tx = {
        to: contractAddress,
        data: data,
    }
    web3.eth.sendTransaction(tx, async function (err, result) {
        if (err) {
            alert("failed: " + err.message)
            $jsLoadingBox.hide()
            window.location.reload();
        } else {
            alert("successed: " + result)
            $jsLoadingBox.show()
            var finished = null
            var time1
            time1 = setInterval(async () => {
                var receipt = await getReceipt(result);
                if (null == receipt) {} else {
                    $jsLoadingBox.hide()
                    finished = 1
                    clearInterval(time1)
                    window.location.reload();
                }
            }, 3000)
        }
    })
})
$('.js-claim-game').click(function () {
    $jsLoadingBox.show()
    data = _Bookie.ClaimGame.getData();
    tx = {
        to: contractAddress,
        data: data,
    }
    web3.eth.sendTransaction(tx, async function (err, result) {
        if (err) {
            alert("failed: " + err.message)
            $jsLoadingBox.hide()
            window.location.reload();
        } else {
            alert("successed: " + result)
            $jsLoadingBox.show()
            var finished = null
            var time1
            time1 = setInterval(async () => {
                var receipt = await getReceipt(result);
                if (null == receipt) {} else {
                    $jsLoadingBox.hide()
                    finished = 1
                    clearInterval(time1)
                    window.location.reload();
                }
            }, 3000)
        }
    })
})
$('.js-claim-bookie').click(function () {
    $jsLoadingBox.show()
    data = _Bookie.CliamBlp.getData();
    tx = {
        to: contractAddress,
        data: data,
    }
    web3.eth.sendTransaction(tx, async function (err, result) {
        if (err) {
            alert("failed: " + err.message)
            $jsLoadingBox.hide()
            window.location.reload();
        } else {
            alert("successed: " + result)
            $jsLoadingBox.show()
            var finished = null
            var time1
            time1 = setInterval(async () => {
                var receipt = await getReceipt(result);
                if (null == receipt) {} else {
                    $jsLoadingBox.hide()
                    finished = 1
                    clearInterval(time1)
                    window.location.reload();
                }
            }, 3000)
        }
        
    })
})
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
