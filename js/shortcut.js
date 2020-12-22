var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var _CROWDABI = CROWDFUNDINGABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
var contractAddressCROWD = CROWDFUNDINGABI.contract
var _Bookie, _account, _USDT, _USDTACCOUNT
var $jsLoadingBox = $('.js-loading-box')
$jsLoadingBox.hide()
// judge web3
InitPage()
async function initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {await ethereum.enable();return true} catch (error) {return false}} 
        else if (window.web3) {window.web3 = new Web3(web3.currentProvider); return true} 
        else if (window.web3.eth.coinbase) {await ethereum.enable();
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

        // USDT shortcut Banlance 6
        _USDT.balanceOf.call(_USDTACCOUNT, async function (error, result) {
            var USDT = web3.fromWei(result.toNumber(), "mwei");
            $('.js-shortcut-value').val(parseInt(USDT))
            NumAutoPlusAnimation("js-shortcut-USDT", {time: 1500,num: USDT,regulator: 30})
            assignsM(50,$('.js-shortcut-value').val())
        })

        // GetAPY
        _Bookie.GetAPY.call(function (error, result) {
            $('.js-bip-apy').html(result.toNumber())
        });

        // GetBall49Info
        _Bookie.GetBall49Info.call(function (error, result) {
            $('.js-pool').html('$' + result.valueOf()[0].toNumber())
        });
        // bookie GetAPY
        _Bookie.GetAPY.call(function (error, result) {
            $('.js-APY-num').html(result.toNumber())
            $('.js-expect').html($('.js-bookie-input').val() * result.toNumber())
        });
    }
}
var scroll = document.getElementById('scroll');
var bar = document.getElementById('bar');
var mask = document.getElementById('mask');
var ptxt = document.getElementById('scrollP');
var barleft = 0
var curBb = 50
let ShortcutVal = 0
bar.onmousedown = function (event) {
    var event = event || window.event;
    var leftVal = event.clientX - this.offsetLeft;
    var that = this;
    document.onmousemove = function (event) {
        var event = event || window.event;
        barleft = event.clientX - leftVal;
        if (barleft < 0)
            barleft = 0;
        else if (barleft > scroll.offsetWidth - bar.offsetWidth)
            barleft = scroll.offsetWidth - bar.offsetWidth;
        mask.style.width = barleft + 'px';
        that.style.left = barleft + "px";
        ptxt.innerHTML = parseInt(barleft / (scroll.offsetWidth -
            bar.offsetWidth) * 100) + "%";

        curBb = parseInt(barleft / (scroll.offsetWidth - bar.offsetWidth) * 100)
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
}

$('.js-shortcut-value').on('blur',function() {
    let that = $(this)
    let _val = that.val()
    ShortcutVal = _val
    assignsM(curBb,ShortcutVal)
})
$('.js-ShortcutVal-max').on('click',function() {
    ShortcutVal = $('.js-shortcut-balance').html()
    $('.js-shortcut-value').val($('.js-shortcut-balance').html())
    assignsM(curBb,ShortcutVal)
})
bar.onmouseup = function () {
    if(ShortcutVal) {assignsM(curBb,ShortcutVal)}
    document.onmousemove = null; 
}
// random
let _arr = ['19','21','24','09','45','27','06']
$('.js-random').click(function(){
    let _ul = $('.js-random-ul')
    let str = ''
    _arr = getRandomArrayElements(arr, 7)
    for(var i=0;i<_arr.length;i++){
        let arrCur = _arr[i]
        str+='<li style="margin-right:4.5px">'+_arr[i]+'</li>'
    }
    _ul.html(str)
})
// shortcut submit
$('.js-shortcut-submit').click(function () {
    $jsLoadingBox.show()
    var $bookieLeft = $('.js-bookie-left').html(),
        $gameRight = $('.js-game-right').html(),
        balls = _arr
    data = _Bookie.Shortcut.getData($bookieLeft, $gameRight, balls);
    tx = {to: contractAddress,data: data,}
    web3.eth.sendTransaction(tx, async function (err, result) {
        if (err) {
            alert("failed: " + err.message)
        } else {
            alert("successed: " + result)
        }
        $jsLoadingBox.hide()
        window.location.reload();
    })
})
function assignsM(Bb,num) {
    var m = num
    var l, r
    l = m * (Bb / 100)
    r = m - l
    $('.js-bookie-left').html(parseInt(l))
    $('.js-game-right').html(parseInt(r))
    NumAutoPlusAnimation("js-harvest", {time: 1500,num: parseInt(l) * $('.js-bip-apy').html()/100,regulator: 30})
    NumAutoPlusAnimation("js-annual-income", {time: 1500,num: parseInt(parseInt(l) / 2),regulator: 30})
}

function changePercent(percent) {
    mask.style.width = percent * 3 + 'px';
    bar.style.left = percent * 3 + 'px';
    ptxt.innerHTML = "50%"
}
changePercent(50)
// head top
$('.js-Home').click(function () {
    if(web3.eth.coinbase){window.location.href = '/index.html'}
})
$('.js-Bookie').click(function () {
    if(web3.eth.coinbase){window.location.href = '/bookie.html'}
})
$('.js-Shortcut').click(function () {
    if(web3.eth.coinbase){window.location.href = '/shortcut.html'}
})
$('.js-Dashboard').click(function () {
    if(web3.eth.coinbase){window.location.href = '/dashboard.html'}
})
$('.js-Game').click(function () {
    if(web3.eth.coinbase){window.location.href = '/game.html'}
})
// View status
async function getReceipt(data) {
    return new Promise(function (resolve, reject) {
        web3.eth.getTransactionReceipt(data, function (err, result) {
            if (err) {reject(err)} else {resolve(result)}
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