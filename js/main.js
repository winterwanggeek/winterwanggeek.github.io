window.onload = function () {
    //获取对象
    var b_body = document.getElementById("b_body");
    var text = document.getElementById("f_left");
    var btn = this.document.getElementById("btn");
    //自动获取焦点
    text.focus();
    window.onkeydown = function (e){
        var eve = e || window.event;
        if(eve.keyCode === 13){
            action(b_body, text);
        }
    };
    btn.onclick = function () {
        action(b_body, text);
    };
};
/**
 * @description 获取数据
 * @param {object} b_body
 * @param {object} text
 */
function action(b_body, text) {
    //判断空值
    if (null === text.value || "" === text.value) {
        text.focus();
        return;
    }
    addEle(b_body, "myWord", text);
    //创建数据
    var obj ={
        type: 'get',
        url: 'http://www.tuling123.com/openapi/api',
        data: {
            key: "2e0f59bc488349d699a2d676761f3f78",
            info: text.value
        },
        success: function (xhr) {
            var result = JSON.parse(xhr.responseText);
            var msg = result.text;
            addEle(b_body, "rotWord", text, msg);
            var audioUrl = 'http://tsn.baidu.com/text2audio?tex=' + msg + '&lan=zh&cuid=35703043690945&ctp=1&tok=24.bd64810e297f92b0b0f5739293049b89.2592000.1537505481.282335-11711143';
            var audioObj = document.createElement("audio");
            audioObj.src = audioUrl;
            audioObj.setAttribute("autoplay", "autoplay");
            var audio = document.getElementsByTagName("audio");
            for(var i=0; i<audio.length; i++){
                if (audio[i]) {
                    audio[i].parentNode.removeChild(audio[i]);
                }
            }
            document.body.appendChild(audioObj);
        },
        error: function (xhr) {
            console.log(xhr.status);
        }
    };
    myAjax(obj);
    text.value = "";
    text.focus();
}
/**
 * @description 添加对话元素
 * @param {object} b_body
 * @param {string} className
 * @param {object} text
 * @param {string} msg
 * @returns
 */
function addEle(b_body, className, text, msg) {
    //创建元素
    var oDiv = document.createElement("div");
    var oSpan = document.createElement("span");
    var oP = document.createElement("p");
    oDiv.className = className;
    //添加结点
    b_body.appendChild(oDiv);
    oDiv.appendChild(oSpan);
    oDiv.appendChild(oP);
    //设置p标签的内容
    if(msg){
        oP.innerText = msg;
    }else{
        oP.innerText = text.value;
    }
    //保持在对话在最低端
    b_body.scrollTop = b_body.scrollHeight;
}