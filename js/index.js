
    var _abi = BASEABI.abi
    var contractAddress = BASEABI.contract
    var _Bookie,_account
    var $jsLoadingBox = $('.js-loading-box')
    $('#maskP').hide()
    // $('#unlockWallet').hide()
    $jsLoadingBox.hide()
    $("#selectCurrency").hide()
    $('#gameData').hide()
    $('#jsGameBookie').hide()
    $('#unlockWallet').click(function () {
        $('#maskP').show()
    })
    $('#cancle').click(function () {
        $('#maskP').hide()
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
                 await ethereum.enable();
                return true
            } catch (error) {
                return false
            }
        }else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            return true
        }
    }
   $('#connectCD').click(async function(){
    await InitPage()
   })
    async function InitPage() {
        isweb3 = await initWeb3();
        if(!isweb3){
            alert("本网站需要安装 Metamask 插件，点击确定进入Metamask网站")
            document.location = "https://metamask.io/"
        }else{
            $('#unlockWallet').hide()
            $("#selectCurrency").show()
            _Bookie = web3.eth.contract(_abi).at(contractAddress)
            _account = web3.eth.coinbase;
            
            // home数据
            _Bookie.GetBookieInfo.call(function (error, result) {
                $(".js-value1").html(result.valueOf()[0].c[0].toFixed(2))
                $(".js-value2").html(result.valueOf()[1].c[0].toFixed(2))
                $(".js-value3").html(result.valueOf()[2].c[0].toFixed(2))
            });
            //award
            _Bookie.GetAwardInfo.call(function (error, result) {
                $(".js-game-value1").html(result.valueOf()[0].c[0].toFixed(2))
                $(".js-game-value2").html(result.valueOf()[1].c[0].toFixed(2))
                $(".js-game-value3").html(result.valueOf()[2].c[0].toFixed(2))
            });
            // Ball49
            _Bookie.GetBall49Info.call(function (error, result) {
                $(".js-bookie-value1").html(result.valueOf()[0].c[0].toFixed(2))
                $(".js-bookie-value2").html(result.valueOf()[1].c[0])
                $(".js-bookie-value3").html(result.valueOf()[2].c[0].toFixed(2))
            });
        }
    }

    // 先定义要操作的数据对象
    var BLUELIST = []
    var REDLIST = []
    var ACTBLUELIST = []
    var ACTREDLIST = []
    var _REQBLUELIST =  []
    var _REQREDLIST =  []
    var REQBLUELIST =  []
    var REQREDLIST =  []
    for(var i=1,len=50;i<len;i++) {
        BLUELIST.push(i < 10 ? '0'+i : i.toString())
        _REQBLUELIST.push('0')
    }
    for(var i=1,len=11;i<len;i++) {
        REDLIST.push(i < 10 ? '0'+i : i.toString())
        _REQREDLIST.push('0')
    }
    // 点击蓝色球
    var $blueQ = $('.js-bookie-list li')    // 蓝色球集合
    var $redQ = $('.js-bookie-red li')    // 红色球集合
    var $actList = $('.js-active-list')    // 存放选中球的盒子
    $blueQ.on('click', function() {
        var cIndex = $(this).index()
        var curNum = BLUELIST[cIndex]

        // 判断是否已经存在
        if(ACTBLUELIST.indexOf(curNum) < 0) {
            ACTBLUELIST.push(curNum)
        } 
        creEle('blue')
        setValue('blue')
        submitFN()
    })

    $redQ.on('click', function() {
        var cIndex = $(this).index()
        var curNum = REDLIST[cIndex]

        // 判断是否已经存在
        if(ACTREDLIST.indexOf(curNum) < 0) {
            ACTREDLIST.push(curNum)
        } 
        creEle('red')
        setValue('red')
        submitFN()
    })

    // 取消选中蓝色球
    $actList.on('click','.js-active-blue-box li',function(){
        var curIndex = $(this).index()
        ACTBLUELIST.splice(curIndex ,1)
        creEle('blue')
        setValue('blue')
        submitFN()
    })

    // 取消选中红色球
    $actList.on('click','.js-active-red-box li',function(){
        var curIndex = $(this).index()
        ACTREDLIST.splice(curIndex ,1)
        creEle('red')
        setValue('red')
        submitFN()
    })
    // 遍历当前选中的球
    function creEle(type) {
        let curList = []
        if(type === 'blue') {
            curList = ACTBLUELIST
        } else if(type === 'red') {
            curList = ACTREDLIST
        }
        let ele = ''
        curList.map((item,index) => {
            ele += '<li>'+ item +'</li>'
        })
        if(type === 'blue') {
            $actList.find('.js-active-blue-box').html(ele)
        } else if(type === 'red') {
            $actList.find('.js-active-red-box').html(ele)
        }
    }
    function setValue(type){
        if(type === 'blue'){
            REQBLUELIST = JSON.parse(JSON.stringify(_REQBLUELIST))
            ACTBLUELIST.map(item => {
                REQBLUELIST[parseFloat(item) - 1] = '1'
            })
        }else{
            REQREDLIST = JSON.parse(JSON.stringify(_REQREDLIST))
            ACTREDLIST.map(item => {
                REQREDLIST[parseFloat(item) - 1] = '1'
            })
        }
    }
    // 请求value的条件s
    function submitFN(){
        if(ACTBLUELIST.length > 5 && ACTREDLIST.length > 0){
            // console.log('请求')
            _Bookie.GetBetValue(REQBLUELIST,REQREDLIST,1,async function (error, result) {
                console.log('result',result.valueOf());
                $('.js-betValue').html(result.valueOf())
            } )
        }else{
            $('.js-betValue').html('--')
        }
    }
    // 数量的加减
      var $periods = $('.js-periods-value')
      var $periods = $('.js-periods-value')
        $('.js-min').click(function(){
            $periods.val(parseInt( $periods.val())-1)
            if($periods.val() <= 1){
                $periods.val(1)
            }
        })
        $('.js-add').click(function(){
            $periods.val(parseInt( $periods.val())+1)
        })
        
        // 查看状态
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
        $betFN.click(function(){
            $jsLoadingBox.show()
            var $periodsValue = $('.js-periods-value').val()
            var $betHTML = $('.js-betValue').html()
            if($betHTML != '--'){
            _Bookie.Bet(REQBLUELIST,REQREDLIST,$periodsValue,$betHTML,async function (error, result) {
                if(result){
                    data = _Bookie.Bet.getData(REQBLUELIST.map(Number),REQREDLIST.map(Number),Number($periodsValue),Number($betHTML) );
                    tx = {
                        to: contractAddress,
                        data: data,
                    }
                    web3.eth.sendTransaction(tx,async function (err, result) {
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
                                if(null == receipt){
                                }else{
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
                }
            } )
        }else{
            $jsLoadingBox.hide()
            alert('请投注')
        }
    })
    // 监听
    ethereum.on('networkChanged', function (networkIDstring) {
        if (window.ethereum.networkVersion != 3) {
            alert("请链接Ropsten测试网络");
        }
    })
    

        
