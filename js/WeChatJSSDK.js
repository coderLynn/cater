Wechat = function (doWechat) {
    get("/api/WeChat/GetJsSdkInfo", { url: location.href.split('#')[0] }, function (json) {
        wx.config({
            debug: false,//开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: json.appId,// 必填，公众号的唯一标识
            timestamp: json.timestamp,// 必填，生成签名的时间戳
            nonceStr: json.nonceStr,// 必填，生成签名的随机串
            signature: json.signature,// 必填，签名
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'closeWindow',
                'scanQRCode',
                'openLocation',
                'getLocation',
                'chooseWXPay'
            ]// 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
            if (typeof (doWechat) == "function") {
                doWechat(wx);
            }
        });
        wx.error(function (res) {
            alert(res.errMsg);
        });
    });
}
