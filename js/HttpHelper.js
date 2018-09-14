var host = "http://chifenapi.endingtech.com";
/**
 * POST      
 * @param {string} url
 * @param {JSON} data
 * @param {function} callback
 * @param {function} complete
 */
var post = function (url, data, callback, complete) {
    var url_full = geturl(url);
    ajax("POST", 1, url_full, data, callback, complete);
}
/**
 * POST JSON OBJECT
 * @param {any} url
 * @param {any} data
 * @param {any} callback
 * @param {any} complete
 */
var postJson = function (url, data, callback, complete) {
    var url_full = geturl(url);
    ajax("POST", 0, url_full, data, callback, complete);
}
/**
 * GET
 * @param {string} url
 * @param {JSON} data
 * @param {function} callback
 * @param {function} complete
 */
var get = function (url, data, callback, complete) {
    var url_full = geturl(url);
    ajax("GET", 1, url_full, data, callback, complete);
}
/**
 * ajax
 * @param {any} method
 * @param {any} url
 * @param {any} data
 * @param {any} callback
 * @param {any} complete
 */
var ajax = function (method, dataType, url, data, callback, complete) {
    $.ajax({
        type: method,
        url: url,
        data: dataType == 0 ? JSON.stringify(data) : data,
        contentType: dataType == 0 ? "application/json" : "application/x-www-form-urlencoded",
        dataType: "json",

        complete: function (msg) {
            if (msg.status != 200) {
                if (typeof (complete) == "function") {
                    complete(msg);
                }
                alert("系统错误", "error");
            }
        },
        success: function (msg) {
            if (typeof (complete) == "function") {
                complete(msg);
                console.log(1)
            }
            if (msg.code != 0) {
                if (msg.code == 2) {
                    alertDo(msg.msg, function () {
                        location.href = "/login";
                    }, "error", "登录失效");
                } else {
                    alert(msg.err, "error");
                }
            } else {
                if (typeof (callback) == "function") {
                    callback(msg.data);
                }
            }
        }
    })
}
/**
 * 文件上传
 * @param {any} url
 * @param {any} data
 * @param {any} success
 * @param {any} onprogress
 * @param {any} index 索引
 */
var postfile = function (url, data, success, onprogress,index) {
    var dataString = new FormData();
    for (var p in data) {
        dataString.append(p, data[p]);
    }
    $.ajax({
        url: url,
        type: 'POST',
        xhr: function () {  //  XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // 这里能做好多事
                myXhr.upload.onprogress = function (e) {
                    //进度自己再这里写
                    var percent = e.loaded / e.total;//计算百分比
                    if (typeof (onprogress) == "function") {
                        onprogress(percent, index);
                    }
                }
            }
            return myXhr;
        },
        success: function (msg) {
            if (msg.code != 0) {
                alert(msg.err, "error");
            } else {
                if (typeof (success) == "function") {
                    success(msg.data);
                }
            }
        },
        error: function (r) {
            alert("上传出错,请重新打开页面继续", "error");
        },
        data: dataString,
        //关键是这个东西
        enctype: "multipart/form-data",
        cache: false,
        contentType: false,
        processData: false
    });
}
var geturl = function (url) {
    var url_full = host + url;

    return url_full;
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}