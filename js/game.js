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
        // Ball49
        _Bookie.GetBall49Info.call(function (error, result) {
            let pool =web3.fromWei(result.valueOf()[0], "mwei")
            let Jackpot =web3.fromWei(result.valueOf()[2], "mwei")
            NumAutoPlusAnimation("js-bookie-value1", {time: 1000,num: pool,regulator: 30})
            NumAutoPlusAnimation("js-bookie-value3", {time: 1000,num: Jackpot,regulator: 30})
            setTimeout(() => {
                $('.js-bookie-value1').html(numFormat(retain2(pool , 2)))
                $('.js-bookie-value3').html(numFormat(retain2(Jackpot , 2)))}, 1100);
        });
    }
}
// Define the data object to operate on first
let BLUELIST = []
let REDLIST = []
let ACTBLUELIST = []
let ACTREDLIST = []
let _REQBLUELIST = []
let _REQREDLIST = []
let REQBLUELIST = []
let REQREDLIST = []
for (var i = 1, len = 50; i < len; i++) {
    BLUELIST.push(i < 10 ? '0' + i : i.toString())
    _REQBLUELIST.push('0')
}
for (var i = 1, len = 11; i < len; i++) {
    REDLIST.push(i < 10 ? '0' + i : i.toString())
    _REQREDLIST.push('0')
}
// Click on the blue ball
let $blueQ = $('.js-bookie-list li') // 蓝色球集合
let $redQ = $('.js-bookie-red li') // 红色球集合
let $actList = $('.js-active-list') // 存放选中球的盒子
$blueQ.on('click', function () {
    let cIndex = $(this).index()
    let curNum = BLUELIST[cIndex]
    this.style.background = "white";
    this.style.color = "blue";
    if (ACTBLUELIST.indexOf(curNum) > -1) {
        ACTBLUELIST.splice(ACTBLUELIST.indexOf(curNum), 1)
        this.style.background = "rgb(72, 79, 177)";
        this.style.color = "white";
    } else {
        ACTBLUELIST.push(curNum)
    }
    creEle('blue')
    setValue('blue')
    submitFN()
})

$redQ.on('click', function () {
    let cIndex = $(this).index()
    let curNum = REDLIST[cIndex]
    this.style.background = "white";
    this.style.color = "red";

    if (ACTREDLIST.indexOf(curNum) > -1) {
        ACTREDLIST.splice(ACTREDLIST.indexOf(curNum), 1)
        this.style.background = 'red';
        this.style.color = "white";
    } else {
        ACTREDLIST.push(curNum)
    }
    creEle('red')
    setValue('red')
    submitFN()
})

// Traverses the currently selected ball
function creEle(type) {
    let curList = []
    if (type === 'blue') {
        curList = ACTBLUELIST
    } else if (type === 'red') {
        curList = ACTREDLIST
    }
    let ele = ''
    curList.map((item, index) => {
        ele += '<li>' + item + '</li>'
    })
    if (type === 'blue') {
        $actList.find('.js-active-blue-box').html(ele)
    } else if (type === 'red') {
        $actList.find('.js-active-red-box').html(ele)
    }
}

function setValue(type) {
    if (type === 'blue') {
        REQBLUELIST = JSON.parse(JSON.stringify(_REQBLUELIST))
        ACTBLUELIST.map(item => {
            REQBLUELIST[parseFloat(item) - 1] = '1'
        })
    } else {
        REQREDLIST = JSON.parse(JSON.stringify(_REQREDLIST))
        ACTREDLIST.map(item => {
            REQREDLIST[parseFloat(item) - 1] = '1'
        })
    }
}
// Conditions for requesting value
let result
function submitFN() {
    let betStr = $('.js-my-bet-box')
    let strHtml = ''
    if (ACTBLUELIST.length > 5 && ACTREDLIST.length > 0) {
        _Bookie.GetBetValue(REQBLUELIST, REQREDLIST, 1, async function (error, result) {
            $('.js-betValue').html(result.valueOf() * $('.js-periods-value').val())
        })
        result = GetBets(ACTBLUELIST, ACTREDLIST)
        //my bet
        for(var i=0;i<result.length;i++){
            let arrCur = result[i]
            strHtml+='<ul class="game-detail-ul">'+'<li>'+arrCur[0]+'</li>'+'<li>'+arrCur[1]+'</li>'+'<li>'+arrCur[2]+'</li>'+'<li>'+arrCur[3]+'</li>'+'<li>'+arrCur[4]+'</li>'+'<li>'+arrCur[5]+'</li>'+'<li>'+arrCur[6]+'</li>'+'</ul>'
        }
        betStr.html(strHtml)
    } else {
        $('.js-betValue').html('--')
        betStr.html('')
    }
}
// Addition and subtraction of quantity
let $periods = $('.js-periods-value')
$('.js-min').click(function () {
    $periods.val(parseInt($periods.val()) - 1)
    if ($periods.val() <= 1) {$periods.val(1)}
    submitFN()
})
$('.js-add').click(function () {
    if($periods.val() >= 10){$periods.val(10)}else {$periods.val(parseInt($periods.val()) + 1)}
    submitFN()
})
let $betFN = $('.js-betFN')
$betFN.click(function () {
    $jsLoadingBox.show()
    let $periodsValue = $('.js-periods-value').val()
    let $betHTML = $('.js-betValue').html()
    if ($betHTML != '--') {
        data = _Bookie.Bet.getData(REQBLUELIST.map(Number), REQREDLIST.map(Number), Number($periodsValue), Number($betHTML));
        tx = {to: contractAddress,data: data,}
        web3.eth.sendTransaction(tx, async function (err, result) {
            if (err) {
                alert("Failed to submit transaction：" + err.message)
                $jsLoadingBox.hide()
            } else {let time1
                time1 = setInterval(async () => {
                    let receipt = await getReceipt(result);
                    if (null == receipt) {} else {
                        $jsLoadingBox.hide()
                        clearInterval(time1)
                        window.location.reload();
                    }}, 3000)
            }
        })
    } else {$jsLoadingBox.hide();alert('Please bet')}
})
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