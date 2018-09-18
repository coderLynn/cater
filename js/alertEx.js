//Sweet alert 重新封装
document.write("<link href= '../plugins/sweetalert/sweetalert.css' rel= 'stylesheet' >");
document.write("<script src='../plugins/sweetalert/sweetalert.min.js'></script>");
window.alert = function (message, type = "") {
    setTimeout(function () {
        swal({
            title: "提示",
            text: message,
            type: type
        });
    },100)
    
    //截断后续操作
    throw (message);
}
window.confirm = function (message, handler, cancel, title = "确定继续操作?") {
    setTimeout(function () {
        swal({
            title: title,
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (res) {
            if (res) {
                if (typeof (handler) == "function") {
                    handler();
                }
            } else {
                if (typeof (cancel) == "function") {
                    cancel();
                }
            }
        });
    },100)
    
    //截断后续操作
    throw (message);
}
window.alertDo = function (message, handler,type="", title = "提示") {
    setTimeout(function () {
        swal({
            title: title,
            text: message,
            type: type,
        }, function () {
            if (typeof (handler) == "function") {
                handler();
            }
        });
    },100)
    throw (message);
}