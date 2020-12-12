var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
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
        // invite-address
        _Bookie.MyInviteCode.call(function (error, result) {
            if(result) {
                $('.js-invite-address').html('https://bookiewin.github.io?share=' + result)
                $('.js-invite-address-hide').val('https://bookiewin.github.io?share=' + result)
            }
        });
        //award
        _Bookie.GetAwardInfo.call(function (error, result) {
            let gameAward = web3.fromWei(result.valueOf()[0], "mwei");
            let inviteAward = web3.fromWei(result.valueOf()[1], "mwei");
            let bookieAward = web3.fromWei(result.valueOf()[2], "ether");
            $(".js-dash-game").html(gameAward.toNumber())
            $(".js-dash-invite").html(inviteAward.toNumber())
            $(".js-dash-bookie").html(bookieAward.toNumber())
        });
    }
}
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
    }
})