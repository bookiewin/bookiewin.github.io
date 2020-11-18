var _abi = BASEABI.abi
var _USDTABI = USDTABI.abi
var contractAddress = BASEABI.contract
var contractAddressUSDT = USDTABI.contract
var _Bookie, _account, _USDT, _USDTACCOUNT
var $jsLoadingBox = $('.js-loading-box')
var $bookieBox = $('.js-bookie-box')
var $shortcutBox = $('.js-shortcut-box')
var $inviteUrl = $('.js-inviteUrl')
var $dashboardBox = $('.js-dashboard-box');
$('#maskP').hide()
$jsLoadingBox.hide()
$bookieBox.hide()
$shortcutBox.hide()
$inviteUrl.hide()
$("#selectCurrency").hide()
$('#dashboard').hide()
$('#jsGameBookie').hide()

$('#unlockWallet').click(function () {
    $('#maskP').show()
})
$('#cancle').click(function () {
    $('#maskP').hide()
})

$('.js-jion-game').click(function () {
    $("#selectCurrency").hide()
    $('#jsGameBookie').show()
})
// head top
$('.js-Home').click(function () {
    $("#selectCurrency").show()
    $('#unlockWallet').hide();
    $('#maskP').hide()
    $('#dashboard').hide()
    $('#jsGameBookie').hide()
    $bookieBox.hide()
    $shortcutBox.hide()
})
$('.js-Bookie').click(function () {
    $bookieBox.show()
    $("#selectCurrency").hide()
    $('#unlockWallet').hide();
    $('#maskP').hide()
    $('#dashboard').hide()
    $('#jsGameBookie').hide()
    $shortcutBox.hide()
})
$('.js-Shortcut').click(function () {
    $shortcutBox.show()
    $bookieBox.hide()
    $("#selectCurrency").hide()
    $('#unlockWallet').hide();
    $('#maskP').hide()
    $('#dashboard').hide()
    $('#jsGameBookie').hide()
})
$('.js-Dashboard').click(function () {
    $('#dashboard').show()
    $("#selectCurrency").hide()
    $('#unlockWallet').hide();
    $('#maskP').hide()
    $('#jsGameBookie').hide()
    $bookieBox.hide()
    $shortcutBox.hide()
})
$('.js-Game').click(function () {
    $('#jsGameBookie').show()
    $('#dashboard').hide()
    $("#selectCurrency").hide()
    $('#unlockWallet').hide();
    $('#maskP').hide()
    $bookieBox.hide()
    $shortcutBox.hide()

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
        $('#unlockWallet').hide()
        $("#selectCurrency").show()
        _Bookie = web3.eth.contract(_abi).at(contractAddress)
        _account = web3.eth.coinbase;

        _USDT = web3.eth.contract(_USDTABI).at(contractAddressUSDT)
        _USDTACCOUNT = web3.eth.coinbase;

        // invite-address
        $('.js-invite-address').html('https://bookiewin.github.io?share=' + _account)
        $('.js-invite-address-hide').val('https://bookiewin.github.io?share=' + _account)
        
        //award
        _Bookie.GetAwardInfo.call(function (error, result) {
            var usdtAward = web3.fromWei(result.valueOf()[1], "mwei");
            var bookieAward = web3.fromWei(result.valueOf()[2], "ether");
            $(".js-game-value2").html(usdtAward.toFixed(2))
            $(".js-game-value3").html(bookieAward.toFixed(2))
        });

        // Ball49
        _Bookie.GetBall49Info.call(function (error, result) {
            var pool = web3.fromWei(result.valueOf()[0], "mwei");
            var Jackpot = web3.fromWei(result.valueOf()[2], "mwei");
            NumAutoPlusAnimation("js-bookie-value1", {time: 1500,num: pool,regulator: 30})
            NumAutoPlusAnimation("js-bookie-value3", {time: 1500,num: Jackpot,regulator: 30})
        });

        // USDT shortcut Banlance 6
        _USDT.balanceOf.call(_USDTACCOUNT, async function (error, result) {
            console.log(result);
            
            var USDT = web3.fromWei(result.c[0], "mwei");
            // $('.js-shortcut-balance').html(result.c[0])
            NumAutoPlusAnimation("js-shortcut-balance", {time: 1500,num: USDT,regulator: 30})
            NumAutoPlusAnimation("js-shortcut-USDT", {time: 1500,num: USDT,regulator: 30})
        })
        //Bookie Supply 18
        _Bookie.GetBLPSupply.call(function (error, result) {
            var supply = web3.fromWei(result, "ether");
        });

        //Bookie GetLottery
        _Bookie.GetLottery.call(function (error, result) {
            console.log(result);
            
            // console.log('当前距离目标时间剩余秒数',result.valueOf()[1].c[0] - Date.parse(new Date()))
            let times = result.valueOf()[1].c[0] * 1000 - Date.parse(new Date())
            // console.log('首次得到时间戳',times);
            timestampToTime(times)
            // $('.js-estimated').html(result.valueOf()[2].c[0]/10000000)
            NumAutoPlusAnimation("js-estimated", {
                time: 1500,
                num: result.valueOf()[2].c[0] / 10000000,
                regulator: 30
            })
        });

        // GetInviteStatus
        _Bookie.GetInviteStatus.call(function (error, result) {
            // console.log(result);
        });

        //_USDT.allowance
        _USDT.allowance.call(_USDTACCOUNT, contractAddress, async function (error, result) {
            var approved = web3.fromWei(result, "mwei")
        })
        // GetAPY
        _Bookie.GetAPY.call(function (error, result) {
            $('.js-bip-apy').html(result.c[0])
        });

        // GetBall49Info
        _Bookie.GetBall49Info.call(function (error, result) {
            $('.js-pool').html('$' + result.valueOf()[0].c[0])
        });
        // bookie GetAPY
        _Bookie.GetAPY.call(function (error, result) {
            // console.log(result);
            $('.js-APY-num').html(result.c[0]+ '%')
        });
    }
}
// home bookie
$('.js-home-bookie').click(function(){
    _Bookie.GetInviteStatus.call(function (error, result) {
        if(result){
            $("#selectCurrency").hide()
            $('.js-bookie-box').show();
            $('.js-invited').hide();
            $('.js-bookie-btn').show();
        }else{
            $("#selectCurrency").hide()
            $('.js-bookie-box').show();
            $('.js-invited').show();
            $('.js-bookie-btn').hide();
        }
        let href = window.location.href.split('=')[1] || '0xbaebe6cf9bd8c37cc49ef66278fbddfafcfe34e2' 
        $('.js-invited-by').html(href)
    });
})
// bookie Register
$('.js-register').click(function(){
    _Bookie.Register.call(function (error, result) {
        
    })
})

// bookie max
$('.js-bookie-max').click(function(){
    $('.js-bookie-input').val($('.js-shortcut-balance').html())
})

// my-bookie-value
$('.js-my-bookie-value').click(function(){
   let _value = $('.js-bookie-input').val()
   let maxV = $('.js-shortcut-balance').html()
   
   if(_value < 1 || (_value - maxV > 0)){
       alert('Please enter a valid value')
       return 
   }
    data = _Bookie.BookieValue.getData(_value);
    tx = {
        to: contractAddress,
        data: data,
    }
    web3.eth.sendTransaction(tx, async function (err, result) {
        alert(result)
    })
})
// invite-friends
$('.js-invite-friends').click(function () {
    $('.js-dashboard-box').hide()
    $('.js-inviteUrl').show()
})
// Copy to Clipboard
$('.js-Clipboard').click(function () {
    let _select = document.getElementById('js-invite-address-hide')
    _select.select()
    document.execCommand("Copy"); 
    alert("Content copied successfully!");
})
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
// Define the data object to operate on first
var BLUELIST = []
var REDLIST = []
var ACTBLUELIST = []
var ACTREDLIST = []
var _REQBLUELIST = []
var _REQREDLIST = []
var REQBLUELIST = []
var REQREDLIST = []
for (var i = 1, len = 50; i < len; i++) {
    BLUELIST.push(i < 10 ? '0' + i : i.toString())
    _REQBLUELIST.push('0')
}
for (var i = 1, len = 11; i < len; i++) {
    REDLIST.push(i < 10 ? '0' + i : i.toString())
    _REQREDLIST.push('0')
}
// Click on the blue ball
var $blueQ = $('.js-bookie-list li') // 蓝色球集合
var $redQ = $('.js-bookie-red li') // 红色球集合
var $actList = $('.js-active-list') // 存放选中球的盒子
$blueQ.on('click', function () {
    var cIndex = $(this).index()
    var curNum = BLUELIST[cIndex]
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
    var cIndex = $(this).index()
    var curNum = REDLIST[cIndex]
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
function submitFN() {
    if (ACTBLUELIST.length > 5 && ACTREDLIST.length > 0) {
        _Bookie.GetBetValue(REQBLUELIST, REQREDLIST, 1, async function (error, result) {
            $('.js-betValue').html(result.valueOf())
        })
    } else {
        $('.js-betValue').html('--')
    }
}
// Addition and subtraction of quantity
var $periods = $('.js-periods-value')
var $periods = $('.js-periods-value')
$('.js-min').click(function () {
    $periods.val(parseInt($periods.val()) - 1)
    if ($periods.val() <= 1) {
        $periods.val(1)
    }
})
$('.js-add').click(function () {
    $periods.val(parseInt($periods.val()) + 1)
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
var $betFN = $('.js-betFN')
$betFN.click(function () {
    $jsLoadingBox.show()
    var $periodsValue = $('.js-periods-value').val()
    var $betHTML = $('.js-betValue').html()
    if ($betHTML != '--') {
        data = _Bookie.Bet.getData(REQBLUELIST.map(Number), REQREDLIST.map(Number), Number($periodsValue), Number($betHTML));
        tx = {
            to: contractAddress,
            data: data,
        }
        web3.eth.sendTransaction(tx, async function (err, result) {
            if (err) {
                alert("提交交易失败，错误：" + err.message)
                $jsLoadingBox.hide()
            } else {
                alert("提交成功，交易哈希：" + result)
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

    } else {
        $jsLoadingBox.hide()
        alert('Please bet')
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
        $('#unlockWallet').show()
        $("#selectCurrency").hide()
        $('#maskP').hide()
        $('#dashboard').hide()
        $('#jsGameBookie').hide()
    }
})


// pop
var popType = 'USDT'
$subPop = $('.js-submit-pop')
$subPop.on('click', function () {
    $subPop.hide()
})
$subPop.on('click', '.con', function (e) {
    e.stopPropagation()
})

$subPop.on('click', '.js-submit-btn', function (e) {
    var val = $subPop.find('.js-inp').val()
    var approvedAmount = web3.toWei(val, "mwei")
    if (popType === 'USDT') {
        data = _USDT.approve.getData(contractAddress, approvedAmount);
        tx = {
            to: contractAddressUSDT,
            data: data,
        }
        web3.eth.sendTransaction(tx, async function (err, result) {
            if (err) {
                alert("failed: " + err.message)
            } else {
                alert("successed: " + result)
            }
        })
        $subPop.hide()
    }
})

$('.js-widhdraw-uw').click(function () {
    data = _Bookie.WithdrawUsdt.getData();
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
    })
})

$('.js-widhdraw-bw').click(function () {
    data = _Bookie.WithdrawBlp.getData();
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
    })
})

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
        window.getSelection ? window.getSelection().removeAllRanges() :
            document.selection.empty();
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
    if(ShortcutVal) {
        console.log($('#scroll').is(":visible"));
        assignsM(curBb,ShortcutVal)
    }
    document.onmousemove = null; 
}

function assignsM(Bb,num) {
    var m = num
    var l, r
    l = m * (Bb / 100)
    r = m - l
    $('.js-bookie-left').html(parseInt(l))
    $('.js-game-right').html(parseInt(r))
    NumAutoPlusAnimation("js-harvest", {time: 1500,num: parseInt(l) * $('.js-bip-apy').html(),regulator: 30})
    NumAutoPlusAnimation("js-annual-income", {time: 1500,num: parseInt(parseInt(l) / 2),regulator: 30})
}

function changePercent(percent) {
    mask.style.width = percent * 3 + 'px';
    bar.style.left = percent * 3 + 'px';
    ptxt.innerHTML = "50%"
}
changePercent(50)

// 时间戳转时分秒
var $timesBox = $('.js-times')

function timestampToTime(timestamp) {
    // console.log('timestamp1', timestamp);
    let tt = timestamp
    setInterval(() => {
        tt -= 1000
        // console.log('timestamp2',tt);
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
            // console.log('当前时分秒', `${days * 24 + parseFloat(h)}:` + m + s )
            // return `${days * 24 + parseFloat(h)} :` + m + s 
        } else {
            $timesBox.html(h + m + s)
            // console.log('当前时分秒', h + m + s )
            // return h + m + s 
        }
    }, 1000)
}
// shortcut submit
$('.js-shortcut-submit').click(function () {
    var $bookieLeft = $('.js-bookie-left').html(),
        $gameRight = $('.js-game-right').html(),
        balls = _arr
        alert(balls)
    data = _Bookie.Shortcut.getData($bookieLeft, $gameRight, balls);
    // console.log(data);

    tx = {
        to: contractAddress,
        data: data,
    }
    web3.eth.sendTransaction(tx, async function (err, result) {
        alert(result)
    })
})

//数字自增到某一值动画参数（目标元素,自定义配置）
function NumAutoPlusAnimation(targetEle, options) {
    options = options || {};
    var $this = document.getElementsByClassName(targetEle)[0],
        time = options.time || $this.data('time'), //总时间--毫秒为单位
        finalNum = options.num || $this.data('value'), //要显示的真实数值
        regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度

        step = finalNum / (time / regulator),
        /*每30ms增加的数值--*/
        count = 0, //计数器
        initial = 0;

    var timer = setInterval(function () {

        count = count + step;

        if (count >= finalNum) {
            clearInterval(timer);
            count = finalNum;
        }
        //t未发生改变的话就直接返回
        //避免调用text函数，提高DOM性能
        var t = Math.floor(count);
        if (t == initial) return;

        initial = t;

        $this.innerHTML = initial;
    }, 30);
}
// 随机数
var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];
function getRandomArrayElements(arr, count) {
    var shuffled =arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
// console.log( getRandomArrayElements(arr, 7) );