
    var _abi = BASEABI.abi
    var _USDTABI = USDTABI.abi
    var contractAddress = BASEABI.contract
    var contractAddressUSDT = USDTABI.contract
    var _Bookie,_account,_USDT,_USDTACCOUNT
    var $jsLoadingBox = $('.js-loading-box')
    $('#maskP').hide()
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
    $('#gameDFE').click(function(){
        $('#gameData').hide()
        $('#jsGameBookie').show()
    })
    // head top
    $('.js-Home').click(function(){
        $("#selectCurrency").show()
        $('#unlockWallet').hide();
        $('#maskP').hide()
        $('#gameData').hide()
        $('#jsGameBookie').hide()
    })
    $('.js-Bookie').click(function(){
        $('#gameData').show()
        $("#selectCurrency").hide()
        $('#unlockWallet').hide();
        $('#maskP').hide()
        $('#jsGameBookie').hide()
    })
    $('.js-Game').click(function(){
        $('#jsGameBookie').show()
        $('#gameData').hide()
        $("#selectCurrency").hide()
        $('#unlockWallet').hide();
        $('#maskP').hide()
        
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
        }else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            return true
        }else if(window.web3.eth.coinbase){
            await ethereum.enable();
        }
    }
    async function InitPage() {
        isweb3 = await initWeb3();
        
        if(!isweb3){
            alert("This website needs to install metamask plug-in. Click OK to enter metamask website")
            document.location = "https://metamask.io/"
        }else{
            $('#unlockWallet').hide()
            $("#selectCurrency").show()
            _Bookie = web3.eth.contract(_abi).at(contractAddress)
            _account = web3.eth.coinbase;

            _USDT = web3.eth.contract(_USDTABI).at(contractAddressUSDT)
            _USDTACCOUNT = web3.eth.coinbase;
            
            // home data
            _Bookie.GetBookieInfo.call(function (error, result) {
                $(".js-value2").html(result.valueOf()[1].c[0].toFixed(2))
                $(".js-value3").html(result.valueOf()[2].c[0].toFixed(2))
            });
            //award
            _Bookie.GetAwardInfo.call(function (error, result) {
                $(".js-game-value1").html(result.valueOf()[0].c[0].toFixed(2))
                $(".js-game-value2").html((result.valueOf()[1].c[0]/Math.pow(10, 6)).toFixed(2))
                $(".js-game-value3").html((result.valueOf()[2].c[0]/Math.pow(10, 18)).toFixed(2))
            });
            
            // Ball49
            _Bookie.GetBall49Info.call(function (error, result) {
                $(".js-bookie-value1").html((result.valueOf()[0].c[0]/Math.pow(10, 6)).toFixed(2))
                $(".js-bookie-value2").html(result.valueOf()[1].c[0])
                $(".js-bookie-value3").html((result.valueOf()[2].c[0]/Math.pow(10, 6)).toFixed(2))
            });
            
            // USDT Banlance
            _USDT.balanceOf.call(_USDTACCOUNT,async function(error, result){
                $(".js-value1").html((result.c[0]/Math.pow(10, 6)).toFixed(2))
            })

            //_USDT.allowance
            _USDT.allowance.call(_USDTACCOUNT,contractAddress,async function(error,result){
                $('.js-value-usdt').html((result.c[0]/Math.pow(10, 6)).toFixed(2))
            })
        }
    }

    // Define the data object to operate on first
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
    // Click on the blue ball
    var $blueQ = $('.js-bookie-list li')    // 蓝色球集合
    var $redQ = $('.js-bookie-red li')    // 红色球集合
    var $actList = $('.js-active-list')    // 存放选中球的盒子
    $blueQ.on('click', function() {
        var cIndex = $(this).index()
        var curNum = BLUELIST[cIndex]
        this.style.background="white";
        this.style.color="blue";
        
        if(ACTBLUELIST.indexOf(curNum) > -1) {
            ACTBLUELIST.splice(ACTBLUELIST.indexOf(curNum), 1)
            this.style.background="rgb(72, 79, 177)";
            this.style.color="white";
        } else {
            ACTBLUELIST.push(curNum)
        }
        
        creEle('blue')
        setValue('blue')
        submitFN()
    })

    $redQ.on('click', function() {
        var cIndex = $(this).index()
        var curNum = REDLIST[cIndex]
        this.style.background="white";
        this.style.color="red";
        
        if(ACTREDLIST.indexOf(curNum) > -1) {
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
    // Conditions for requesting value
    function submitFN(){
        if(ACTBLUELIST.length > 5 && ACTREDLIST.length > 0){
            _Bookie.GetBetValue(REQBLUELIST,REQREDLIST,1,async function (error, result) {
                console.log('result',result.valueOf());
                $('.js-betValue').html(result.valueOf())
            } )
        }else{
            $('.js-betValue').html('--')
        }
    }
    // Addition and subtraction of quantity
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
        $betFN.click(function(){
        $jsLoadingBox.show()
        var $periodsValue = $('.js-periods-value').val()
        var $betHTML = $('.js-betValue').html()
        if($betHTML != '--'){
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
                
        }else{
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
        if(web3.eth.coinbase == null){
            $('#unlockWallet').show()
            $("#selectCurrency").hide()
            $('#maskP').hide()
            $('#gameData').hide()
            $('#jsGameBookie').hide()
        }
    })
    

    // pop
    var popType =''
    $subPop =$('.js-submit-pop')
    console.log('$subPop',$subPop);
    

    $subPop.on('click', function() {
        $subPop.hide()
    })


    $subPop.on('click','.con', function(e) {
        e.stopPropagation()
    })

    $subPop.on('click','.js-submit-btn', function(e) {
        var val = $subPop.find('.js-inp').val()
        console.log('val',val);
        if(popType === 'USDT') {
            data = _USDT.approve.getData(contractAddress, val*1000000);
            tx = {
                to: contractAddressUSDT,
                data: data,
            }
            web3.eth.sendTransaction(tx,async function (err, result) {
                if (err) {
                    alert("failed: " + err.message)
                } else {
                    alert("successed: " + result)
                    
                }
            })
            // $("#selectCurrency").hide()
            // $('#gameData').show()
            $subPop.hide()
        } 
    })
    $('.js-bWOwlY-Bookie').click(function(){
        $('#gameData').show()
        $("#selectCurrency").hide()
    })
    $(".js-bWOwlY-Details").click(function(){
        popType = 'USDT'
        $subPop.find('.js-inp').val('')
        $subPop.show()
    })

    $('.js-widhdraw-uw').click(function(){
            data = _Bookie.WithdrawUsdt.getData();
            tx = {
                to: contractAddress,
                data: data,
            }
            web3.eth.sendTransaction(tx,async function (err, result) {
                if (err) {
                    alert("failed: " + err.message)
                } else {
                    alert("successed: " + result)
                }
            })
    })

    $('.js-widhdraw-bw').click(function(){
        data = _Bookie.WithdrawBlp.getData();
            tx = {
                to: contractAddress,
                data: data,
            }
            web3.eth.sendTransaction(tx,async function (err, result) {
                if (err) {
                    alert("failed: " + err.message)
                } else {
                    alert("successed: " + result)
                }
            })
    })
    
    

        
