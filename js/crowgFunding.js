var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var _CROWDABI = CROWDFUNDINGABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
var contractAddressCROWD = CROWDFUNDINGABI.contract
var _Bookie, _account, _USDT, _USDTACCOUNT
var $cfundingBox = $('.js-cfunding-box')
var $jsLoadingBox = $('.js-loading-box')
var $waitBox = $('.js-wait-box')
let crowdMax
let uAllowanceV
let ubalanceOfV
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
        _CROWD = web3.eth.contract(_CROWDABI).at(contractAddressCROWD)
       
        //crowd-funding target
        _CROWD.crowd_funding_target.call(function (error, result) {
            let resultVal = web3.fromWei(result, "mwei")
            NumAutoPlusAnimation("js-crowd-funding-money", {time: 1000,num: resultVal,regulator: 30})
            setTimeout(() => {
                $('.js-crowd-funding-money').html(numFormat(retain2(resultVal , 2)))
            }, 1100);
        });
        //crowd-funding
        _CROWD.crowd_funding_progress.call(function (error, result) {
            $('.js-myBar').html(result.toNumber() + '%')
            $('.js-myBar').css('width',result.toNumber()+ '%')
            $('.js-myBar').css('backgroundColor', '#4CAF50')
         });

         // USDT shortcut Banlance 
        _USDT.balanceOf.call(_USDTACCOUNT, async function (error, result) {
            if(result.toNumber() <= 0){
                alert("Your USDT balance is ZERO.");
                return;
            }else{
                $('.js-crowd-value').val(parseInt(web3.fromWei(result, "mwei")))
                ubalanceOfV = web3.fromWei(result, "mwei");
            }
        })
        //_USDT.allowance
        _USDT.allowance.call(_USDTACCOUNT,contractAddress, async function (error, result) {
            uAllowanceV = web3.fromWei(result, "mwei");
        })
    }
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
    $('.js-crowd-value').val(parseInt(ubalanceOfV.toNumber()))
})
//crowd-funding submit
$('.js-crowd-submit').click(function() {
    $jsLoadingBox.show()
    var $crowdSubmit = $('.js-crowd-value').val()
    // check balance
    if($crowdSubmit > ubalanceOfV.toNumber()){
        alert("Your balance is NOT enough.");
        return;
    }
    // check allowance
    if($crowdSubmit > uAllowanceV.toNumber()){
        data = _USDT.approve.getData(contractAddress, web3.toWei(ubalanceOfV,"mwei"));
        tx = {
            to: contractAddressUSDT,
            data: data,
        }
        web3.eth.sendTransaction(tx, async function (err, result) {
            if (err) {
                alert("failed: " + err.message)
                $jsLoadingBox.hide()
                window.location.reload();
            } else {
                //alert("successed: " + result)
                $jsLoadingBox.show()
                var finished = null
                var time1
                time1 = setInterval(async () => {
                    var receipt = await getReceipt(result);
                    if (null == receipt) {} else {
                        finished = 1
                        clearInterval(time1)

                        CrowdFundingSubmit(web3.toWei($crowdSubmit,'mwei'));
                        // data = _Bookie.CrowdFunding.getData(web3.toWei($crowdSubmit,'mwei'));
                        // tx = {
                        //     to: contractAddress,
                        //     data: data,
                        // }
                        // web3.eth.sendTransaction(tx, async function (err, result) {
                        //     if (err) {
                        //         alert("failed: " + err.message)
                        //         $jsLoadingBox.hide()
                        //         window.location.reload();
                        //     } else {
                        //         alert("successed: " + result)
                        //         $jsLoadingBox.show()
                        //         var finished = null
                        //         var time1
                        //         time1 = setInterval(async () => {
                        //             var receipt = await getReceipt(result);
                        //             if (null == receipt) {} else {
                        //                 $jsLoadingBox.hide()
                        //                 finished = 1
                        //                 clearInterval(time1)
                        //                 window.location.reload();
                        //             }
                        //         }, 3000)
                        //     }
                            
                        // })
                    }
                }, 3000)
            }
        })
    }else{
        CrowdFundingSubmit(web3.toWei($crowdSubmit,'mwei'));
        // data = _Bookie.CrowdFunding.getData(web3.toWei($crowdSubmit,'mwei'));
        // tx = {
        //     to: contractAddress,
        //     data: data,
        // }
        // web3.eth.sendTransaction(tx, async function (err, result) {
        //     if (err) {
        //         alert("failed: " + err.message)
        //         $jsLoadingBox.hide()
        //         window.location.reload();
        //     } else {
        //         alert("successed: " + result)
        //         $jsLoadingBox.show()
        //         var finished = null
        //         var time1
        //         time1 = setInterval(async () => {
        //             var receipt = await getReceipt(result);
        //             if (null == receipt) {} else {
        //                 $jsLoadingBox.hide()
        //                 finished = 1
        //                 clearInterval(time1)
        //                 window.location.reload();
        //             }
        //         }, 3000)
        //     }
        // })
    }
})

function CrowdFundingSubmit(SubmitValue) {
    data = _Bookie.CrowdFunding.getData(SubmitValue);
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
            //alert("successed: " + result)
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
