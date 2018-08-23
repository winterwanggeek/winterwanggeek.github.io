/**
 * 
 * @param {{object}} option 
 */
function myAjax(option) {
    //type, url, data, timeout, success, error
    // 1.创建Ajax对象
    var xhr = null;
    var timer = null;
    //将对象转换为字符串
    var data = objToStr(option.data);
    if (window.XMLHttpRequest) { //必须加window,避免出错
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2.连接服务器 open(methods, url, isAysnc),是否异步 get请求默认只有一个结果
    if (option.type.toLowerCase() === "get") {
        xhr.open(option.type, option.url + "?" + data, true);
        //3.发送请求
        xhr.send();      
    } else {
        xhr.open(option.type, option.url, true);
        xhr.setRequestHeader("Context-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    //4.接受返回数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            clearInterval(timer);
            //5.判断是否请求成功
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                //6.处理返回结果
                option.success(xhr);
            } else {
                option.error(xhr);
            }
        }
    };
    if (option.timeout) {
        timer = setInterval(function () {
            xhr.abort();
            clearInterval(timer);
        }, option.timeout);
    }
}
/**
 * @description 实现数据转换
 * @param {object} data
 * @returns {array}
 */
function objToStr(data) {
    //在IE浏览器中通过ajax请求发送GET请求，IE认为同一个url只有一个结果
    data.t= new Date().getTime();
    var res = [];
    for (var key in data) {
        res.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key])); //转码解决中文字符问题，字母，数字，下划线，ASCII码
    }
    return res.join('&');
}
