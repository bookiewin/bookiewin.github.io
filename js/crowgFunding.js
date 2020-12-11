var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
var _Bookie, _account, _USDT, _USDTACCOUNT
var $cfundingBox = $('.js-cfunding-box')
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
       
        //crowd-funding target
        _Bookie.crowd_funding_target.call(function (error, result) {
            let resultVal = web3.fromWei(result, "mwei")
            $('.js-crowd-value').val(resultVal)
            NumAutoPlusAnimation("js-crowd-funding-money", {time: 1500,num: resultVal,regulator: 30})
        });
        //crowd-funding
        _Bookie.crowd_funding.call(function (error, result) {
            var myBar = $('.js-myBar').html(result.toNumber() + '%')
            var myBar = $('.js-myBar').css('width',result.toNumber())
            var myBar = $('.js-myBar').css('backgroundColor', '#4CAF50')
         });
    }
}
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

//js-crowd-funding
$('.js-crowd-max').on('click',function() {
    crowdVal = $('.js-crowd-value').html()
    $('.js-crowd-value').val($('.js-crowd-funding-money').html())
})
//crowd-funding submit
$('.js-crowd-submit').click(function() {
    $jsLoadingBox.show()
    var $crowdSubmit = $('.js-crowd-value').val(),
    data = _Bookie.CrowdFunding.getData($crowdSubmit);
    tx = {
        to: contractAddress,
        data: data,
    }
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

