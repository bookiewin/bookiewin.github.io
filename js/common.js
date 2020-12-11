//数字自增到某一值动画参数（目标元素,自定义配置）
function NumAutoPlusAnimation(targetEle, options) {
    options = options || {};
    var $this = document.getElementsByClassName(targetEle)[0],
        time = options.time, //总时间--毫秒为单位
        finalNum = options.num, //要显示的真实数值
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
        $this.innerHTML = ''
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
function choose(arr, size) {
    var allResult = [];
    (function (arr, size, result) {
        var arrLen = arr.length;
        if (size > arrLen) {
            return;
        }
        if (size == arrLen) {
            allResult.push([].concat(result, arr))
        } else {
            for (var i = 0; i < arrLen; i++) {
                var newResult = [].concat(result);
                newResult.push(arr[i]);

                if (size == 1) {
                    allResult.push(newResult);
                } else {
                    var newArr = [].concat(arr);
                    newArr.splice(0, i + 1);
                    arguments.callee(newArr, size - 1, newResult);
                }
            }
        }
    })(arr, size, []);
    return allResult;
}

function GetBets(blueBalls, redBalls) {
    var results = [];
    var blues = choose(blueBalls, 6);
    redBalls.forEach(redBall => {
        blues.forEach(blueBall => {
            //console.log(blueBall, redBall);
            var temp = [];
            for(i=0; i<blueBall.length; i++){
                temp.push(blueBall[i]);
            }
            temp.push(redBall);
            //console.log(temp);
            results.push(temp);
        });
    });
    return results;
}