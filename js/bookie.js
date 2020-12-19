
var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var _CROWDABI = CROWDFUNDINGABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
var contractAddressCROWD = CROWDFUNDINGABI.contract
let _Bookie, _account, _USDT, _USDTACCOUNT
let $bookieBox = $('.js-bookie-box')
let $jsLoadingBox = $('.js-loading-box')
let $waitBox = $('.js-wait-box')
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
        _Bookie.GetInviter.call(function (error, result) {
            if (result == "0x0000000000000000000000000000000000000000" || result == '0x') {
                $('.js-invited').show();
            } else {
                $('.js-bookie-btn').show();
            }
            $waitBox.hide()
            let href = window.location.href.split('=')[1] || ' '
            $('.js-invited-by').val(href)
        });
        //_USDT.allowance
        _USDT.allowance.call(_USDTACCOUNT,contractAddress, async function (error, result) {
            uAllowanceV = web3.fromWei(result.toNumber(), "mwei");
        })
        //_USDT.balanceOf
        _USDT.balanceOf.call(_USDTACCOUNT, async function (error, result) {
            ubalanceOfV = web3.fromWei(result.toNumber(), "mwei");
            $('.js-bookie-input').val(parseInt(ubalanceOfV))
            if(ubalanceOfV < 1){
                $('.js-shortcut-balance').html(ubalanceOfV)
            }else {
                NumAutoPlusAnimation("js-shortcut-balance", {time: 1000,num: ubalanceOfV,regulator: 30})
                setTimeout(() => {
                    $('.js-shortcut-balance').html(numFormat(retain2(ubalanceOfV , 2)))
                }, 1100);
            }
        })
       
        // bookie GetAPY
        _Bookie.GetAPY.call(function (error, result) {
            $('.js-APY-num').html(result.c[0])
            $('.js-expect').html($('.js-bookie-input').val() * result.toNumber()/100)
        });
    }
}

// bookie Register
let $register = $('.js-register')
$register.click(function(){
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
// bookie btn
let $bookieBtn = $('.js-my-bookie-value')
$('.js-my-bookie-value').click(function(){
    let _value = $('.js-bookie-input').val()
    let maxV = $('.js-shortcut-balance').html()
    // input value
    if(_value < 1 || (_value - maxV > 0)){
        alert('Please enter a valid value')
        return 
    }
    if(uAllowanceV < _value){
        data = _USDT.approve.getData(contractAddress, ubalanceOfV);
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
                    alert("successed: " + result)
                    $jsLoadingBox.show()
                    var finished = null
                    var time1
                    time1 = setInterval(async () => {
                        var receipt = await getReceipt(result);
                        if (null == receipt) {} else {
                            finished = 1
                            clearInterval(time1)
                            data = _Bookie.BookieValue.getData(web3.toWei( _value , 'mwei') );
                            tx = {
                                to: contractAddress,
                                data: data,
                            }
                            web3.eth.sendTransaction(tx, async function (err, result) {
                                if (err) {
                                    alert("failed2: " + err.message)
                                    $jsLoadingBox.hide()
                                    // window.location.reload();
                                } else {
                                    alert("successed: " + result)
                                    $jsLoadingBox.show()
                                    var finished2 = null
                                    var time2
                                    time2 = setInterval(async () => {
                                        var receipt2 = await getReceipt(result);
                                        if (null == receipt2) {} else {
                                            $jsLoadingBox.hide()
                                            finished2 = 1
                                            clearInterval(time2)
                                            window.location.reload();
                                        }
                                    }, 3000)
                                }
                                
                            })
                        }
                    }, 3000)
                }
            })
    }
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
        $('.connect-btn').show()
    }else {
        $('.connect-con').show()
        $('.js-coinbase').html(getSubStr(web3.eth.coinbase) )
    }
})