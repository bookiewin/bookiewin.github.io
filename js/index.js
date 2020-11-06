
    $('#maskP').hide()
    // $('#unlockWallet').hide()
    $("#selectCurrency").hide()
    $('#gameData').hide()
    $('#jsGameBookie').hide()
    $('#unlockWallet').click(function () {
        $('#maskP').show()
    })
    $('#cancle').click(function () {
        $('#maskP').hide()
    })
    $("#connectCD").click(function(){
        $('#unlockWallet').hide()
        $('#maskP').hide()
        $("#selectCurrency").show()
    })
    $(".js-bWOwlY-Details").click(function(){
        $("#selectCurrency").hide()
        $('#gameData').show()
    })
    $('#gameDFE').click(function(){
        $('#gameData').hide()
        $('#jsGameBookie').show()
    })
    // 判断web3
    InitPage()
    async function initWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                console.log('成功')
                await ethereum.enable();
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            return true
        }
    }
    async function InitPage() {
        isweb3 = await initWeb3();
        if(!isweb3){
            alert("本网站需要安装 Metamask 插件，点击确定进入Metamask网站")
            document.location = "https://metamask.io/"
        }else{
            $('#unlockWallet').show()
        }
    }
   


    // 先定义要操作的数据对象
    var BLUELIST = []
    var REDLIST = []
    var ACTBLUELIST = []
    var ACTREDLIST = []
    for(var i=1,len=50;i<len;i++) {
        BLUELIST.push(i < 10 ? '0'+i : i.toString())
    }
    for(var i=1,len=11;i<len;i++) {
        REDLIST.push(i < 10 ? '0'+i : i.toString())
    }
    console.log('BLUELIST',BLUELIST,REDLIST);
    // 点击蓝色球
    var $blueQ = $('.js-bookie-list li')    // 蓝色球集合
    var $redQ = $('.js-bookie-red li')    // 红色球集合
    var $actList = $('.js-active-list')    // 存放选中球的盒子
    $blueQ.on('click', function() {
        var cIndex = $(this).index()
        var curNum = BLUELIST[cIndex]

        // 判断是否已经存在
        if(ACTBLUELIST.indexOf(curNum) > -1) {
            ACTBLUELIST.splice(ACTBLUELIST.indexOf(curNum), 1)
        } else {
            ACTBLUELIST.push(curNum)
        }
        creEle('blue')
    })

    $redQ.on('click', function() {
        var cIndex = $(this).index()
        var curNum = REDLIST[cIndex]

        // 判断是否已经存在
        if(ACTREDLIST.indexOf(curNum) > -1) {
            ACTREDLIST.splice(ACTREDLIST.indexOf(curNum), 1)
        } else {
            ACTREDLIST.push(curNum)
        }
        creEle('red')
    })

    // 遍历当前选中的球
    function creEle(type) {
        let curList = []
        if(type === 'blue') {
            console.log('blue',ACTBLUELIST);
            curList = ACTBLUELIST
        } else if(type === 'red') {
            console.log('red',ACTREDLIST);
            curList = ACTREDLIST
        }
        let ele = ''
        curList.map((item,index) => {
            ele += '<li>'+ item +'</li>'
        })

        console.log('循环后得到',ele);
        if(type === 'blue') {
            $actList.find('.js-active-blue-box').html(ele)
        } else if(type === 'red') {
            $actList.find('.js-active-red-box').html(ele)
        }
        
        
    }
