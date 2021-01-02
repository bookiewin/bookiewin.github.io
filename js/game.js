let _abi = BASEABI.abi
let _USDTABI = USDTABI.abi
let _CROWDABI = CROWDFUNDINGABI.abi
let contractAddress = BASEABI.contract
let contractAddressUSDT = USDTABI.contract
let contractAddressCROWD = CROWDFUNDINGABI.contract
let _Bookie, _account, _USDT, _USDTACCOUNT,ubalanceOfV,uAllowanceV
let $jsLoadingBox = $('.js-loading-box')
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
        //_USDT.balanceOf
        _USDT.balanceOf.call(_USDTACCOUNT, async function (error, result) {
            ubalanceOfV = web3.fromWei(result.toNumber(), "mwei");
        });
        //_USDT.allowance
        _USDT.allowance.call(_USDTACCOUNT,contractAddress, async function (error, result) {
            uAllowanceV = web3.fromWei(result.toNumber(), "mwei");
        })
    }
}
// Define the data object to operate on first
let BLUELIST = [], REDLIST = [], ACTBLUELIST = [],ACTREDLIST = [],_REQBLUELIST = [],_REQREDLIST = [],REQBLUELIST = [],REQREDLIST = []
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
    // 如果不存在&长度达到 则不能再添加
    //if(!ACTBLUELIST.includes(curNum) && ACTBLUELIST.length > 5) return alert('Max length 6')
    $(this).toggleClass('ac')
    if (ACTBLUELIST.includes(curNum)) {
        ACTBLUELIST.splice(ACTBLUELIST.indexOf(curNum), 1)
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
    // 如果不存在&长度达到 则不能再添加
    //if(!ACTREDLIST.includes(curNum) && ACTREDLIST.length) return alert('Max length 1')
    $(this).toggleClass('ac')
    if (ACTREDLIST.includes(curNum)) {
        ACTREDLIST.splice(ACTREDLIST.indexOf(curNum), 1)
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
        curList.map(item => $blueQ.eq(item - 1).addClass('ac')) 
    } else if (type === 'red') {
        curList = ACTREDLIST
        curList.map(item => $redQ.eq(item - 1).addClass('ac')) 
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
let reverseBlue, reverseRed
function setValue(type) {
    if (type === 'blue') {
        REQBLUELIST = JSON.parse(JSON.stringify(_REQBLUELIST))
        ACTBLUELIST.map(item => {
            REQBLUELIST[parseFloat(item) - 1] = '1'
        })
        reverseBlue = REQBLUELIST.reverse()
    } else {
        REQREDLIST = JSON.parse(JSON.stringify(_REQREDLIST))
        ACTREDLIST.map(item => {
            REQREDLIST[parseFloat(item) - 1] = '1'
        })
        reverseRed = REQREDLIST.reverse()
    }
}

// Conditions for requesting value
let result,blue ,red ,stringBR ,getbets ,$periodsValue
function submitFN() {
    $periodsValue = $('.js-periods-value').val()
    let betStr = $('.js-my-bet-box')
    let strHtml = ''
    if (ACTBLUELIST.length > 5 && ACTREDLIST.length > 0) {
         blue = reverseBlue;red = reverseRed;
         stringBR = red.concat(blue).toString().replace(/,/g,'');
         getbets ='0x'+ parseInt(stringBR,2).toString(16)
        _Bookie.GetBetValue(getbets, Number($periodsValue), async function (error, result) {
            $('.js-betValue').html(result.valueOf())
        })
        //my bet
        resultArr = GetBets(ACTBLUELIST, ACTREDLIST)
        for(var i=0;i<resultArr.length;i++){
            let arrCur = resultArr[i]
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
    if($periods.val() >= 10){
        $periods.val(10)
    }else {
        $periods.val(parseInt($periods.val()) + 1)
    }
    submitFN()
})

let $betFN = $('.js-betFN')
$betFN.click(function () {
    let $periodsValue = $('.js-periods-value').val()
    let $betHTML = $('.js-betValue').html()
    if ($betHTML != '--') {
        if(uAllowanceV < $betHTML){
            data = _USDT.approve.getData(contractAddress, ubalanceOfV);
            tx = {to: contractAddressUSDT,data: data}
            web3.eth.sendTransaction(tx, async function (err, result) {
                if (err) {
                    alert("failed: " + err.message)
                    $jsLoadingBox.hide()
                    window.location.reload();
                } else {
                    $jsLoadingBox.show()
                    let time1
                    time1 = setInterval(async () => {
                        var receipt = await getReceipt(result);
                        if (receipt == null) {} else {
                            clearInterval(time1)
                            gameSubmit(getbets,$periodsValue,$betHTML)
                        }
                    }, 3000)
                }
            })
        }else{
            gameSubmit(getbets,$periodsValue,$betHTML)
        }
    } 
})
function gameSubmit(getbets,$periodsValue,$betHTML) {
    $jsLoadingBox.show()
    let betHTMLT = Number($betHTML)
    data = _Bookie.Bet.getData(getbets, Number($periodsValue), betHTMLT);
        tx = {to: contractAddress,data: data,}
        web3.eth.sendTransaction(tx, async function (err, result) {
            if (err) {
                alert("Failed to submit transaction：" + err.message)
                $jsLoadingBox.hide()
            } else {let time2
                time2 = setInterval(async () => {
                    let receipt2 = await getReceipt(result);
                    if (receipt2 == null) {} else {
                        $jsLoadingBox.hide()
                        clearInterval(time2)
                        window.location.reload();
                    }}, 3000)
            }
        })
}
// head top
$('.js-Home').click(function () {
    if(web3.eth.coinbase){window.location.href = '/ropsten/home.html'}
})
$('.js-Bookie').click(function () {
    if(web3.eth.coinbase){window.location.href = '/ropsten/bookie.html'}
})
$('.js-Shortcut').click(function () {
    if(web3.eth.coinbase){window.location.href = '/ropsten/shortcut.html'}
})
$('.js-Dashboard').click(function () {
    if(web3.eth.coinbase){window.location.href = '/ropsten/dashboard.html'}
})
$('.js-Game').click(function () {
    if(web3.eth.coinbase){window.location.href = '/ropsten/game.html'}
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
        window.location.href = '/ropsten/unclock.html'
        $('.connect-btn').show()
    }else {
        $('.connect-con').show()
        $('.js-coinbase').html(getSubStr(web3.eth.coinbase) )
    }
})

function randomFn(){
    $('.js-bookie-list li').removeClass('ac')
    $('.js-bookie-red li').removeClass('ac')
    // 随机选数
    let arrCount = 50
    let ranArr = new Array
    for(let i = 1;i<arrCount;i++){ranArr.push(i)}
    ACTBLUELIST = ranArr.sort(() => Math.random() - 0.5).slice(0,6).map(item => item < 10 ? `0${item}` : item.toString())
    ACTREDLIST = [1,2,3,4,5,6,7,8,9,10].sort(() => Math.random() - 0.5).slice(0,1).map(item => item < 10 ? `0${item}` : item.toString())
    creEle('blue')
    creEle('red')
    setValue('blue')
    setValue('red')
    submitFN()
}
  
$('.js-random-btn').click(function() {
    randomFn()
})
// $(window).load(function(){
//     　randomFn()
// })
 
 