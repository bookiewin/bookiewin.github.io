
var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
var _Bookie, _account, _USDT, _USDTACCOUNT
var $bookieBox = $('.js-bookie-box')
var $jsLoadingBox = $('.js-loading-box')
var $waitBox = $('.js-wait-box')
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

        _Bookie.GetInviter.call(function (error, result) {
            if (result != "0x0000000000000000000000000000000000000000") {
                $('.js-bookie-btn').show();
            } else {
                $('.js-invited').show();
            }
            $waitBox.hide()
            let href = window.location.href.split('=')[1] || ' '
            $('.js-invited-by').val(href)
        });
        
        // USDT shortcut Banlance 6
        _USDT.balanceOf.call(_USDTACCOUNT, async function (error, result) {
            var USDT = web3.fromWei(result.toNumber(), "mwei");
            $('.js-bookie-input').val(parseInt(USDT))
            if(USDT < 1){
                $('.js-shortcut-balance').html(USDT)
            }else {
                NumAutoPlusAnimation("js-shortcut-balance", {time: 1500,num: USDT,regulator: 30})
            }
        })
        // GetAPY
        _Bookie.GetAPY.call(function (error, result) {
            $('.js-bip-apy').html(result.c[0])
        });
        
        // bookie GetAPY
        _Bookie.GetAPY.call(function (error, result) {
            $('.js-APY-num').html(result.c[0])
            $('.js-expect').html($('.js-bookie-input').val() * result.toNumber()/100)
        });
    }
}

// bookie Register
$('.js-register').click(function(){
    $jsLoadingBox.show()
    let _inviteV = $('.js-invited-by').val()
    data = _Bookie.SetInviteCode.getData(_inviteV);
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
// bookie max
$('.js-bookie-max').click(function(){
    $('.js-bookie-input').val($('.js-shortcut-balance').html())
    let expect = ($('.js-bookie-input').val() * $('.js-APY-num').html()/100)
    $('.js-expect').html(expect)
})
// my-bookie-value
$('.js-my-bookie-value').click(function(){
    let _value = $('.js-bookie-input').val()
    let maxV = $('.js-shortcut-balance').html()
    
    if(_value < 1 || (_value - maxV > 0)){
        alert('Please enter a valid value')
        return 
    }
    $jsLoadingBox.show()
     data = _Bookie.BookieValue.getData(web3.toWei( _value , 'mwei') );
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
 // Expected
document.getElementById('js-bookie-d').addEventListener('keyup', function(e){
    let expect = ($('.js-bookie-input').val() * $('.js-APY-num').html()/100)
    $('.js-expect').html(expect)
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