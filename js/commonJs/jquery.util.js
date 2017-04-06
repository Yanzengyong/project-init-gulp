/**
 * Common utils based on Jquery.
 *
 * Created by Dendy on 2015/4/27.
 */
if (!jQuery) {
    throw new Error("Requires jQuery")
}

// string工具类定义 =====================================================================================================

/**
 * String replaceAll
 * @param src 被替换的字符串
 * @param dest 替换为的字符串
 * @return 替换后的字符串
 */
String.prototype.replaceAll = function (src, dest) {
    return this.replace(new RegExp(src, "gm"), dest); //g全局
};

/**
 * 去两端空格
 * @return 字符串
 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 去左空格
 *
 * @return 字符串
 */
String.prototype.trimLeft = function () {
    return this.replace(/(^\s*)/g, "");
};

/**
 * 去右空格
 *
 * @return 字符串
 */
String.prototype.trimRight = function () {
    return this.replace(/(\s*$)/g, "");
};

// 工具函数 =============================================================================================================

/**
 * 将datetime数字转换为指定日期格式的字符串。
 *
 * @param dateStr datetime数字
 * @param format 日期格式，y - 年, M - 月，d - 日, h - 时, m - 分, s - 秒, S - 毫秒。eg：yyyy-MM-dd hh:mm:ss
 * @return 格式化后的日期格式字符串。
 */
function formatDate(dateStr, format) {
    if (!dateStr) {
        return null;
    }
    var date = new Date(dateStr);

    var o = {
        "M+": date.getMonth() + 1, // month
        "d+": date.getDate(), // day
        "h+": date.getHours(), // hour
        "m+": date.getMinutes(), // minute
        "s+": date.getSeconds(), // second
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
        "S": date.getMilliseconds()
        // millisecond
    };

    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * 数组转换为json格式字符串。
 * @param o 数组
 * @return json格式字符串
 */
function arrayToJSON(o) {
    var r = [];
    if (typeof o == "string")
        return "\""
            + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n")
                .replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    if (typeof o == "object") {
        if (!o.sort) {
            for (var i in o)
                r.push(i + ":" + this.arrayToJSON(o[i]));
            if (!!document.all
                && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/
                    .test(o.toString)) {
                r.push("toString:" + o.toString.toString());
            }
            r = "{" + r.join() + "}";
        } else {
            for (var i = 0; i < o.length; i++) {
                r.push(this.arrayToJSON(o[i]));
            }
            r = "[" + r.join() + "]";
        }
        return r;
    }
    return o.toString();
}

/**
 * 数字+0前缀数组
 */
var _NUMBER_WITH_ZERO_PREFIX = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];

/**
 * 获取+0前缀格式的数字[两位]字符串
 * 例如：0 返回 00, 1 返回 01, 11 返回 11
 * @param num 数字
 * @returns {*} 格式化后的数字字符串
 */
function _getZeroPrefixNum(num) {
    if (num >= 0 && num < 10) {
        return _NUMBER_WITH_ZERO_PREFIX[num];
    } else {
        return num;
    }
}

/**
 * 将分钟数转换为格式为"时:分"的字符串
 * @param minute 分钟数
 * @return {*} 格式为"时:分"的字符串
 */
function minuteConvertHourMinute(minute) {
    if (minute && minute > 0) {
        return _getZeroPrefixNum(parseInt(minute / 60)) + ":" + getZeroPrefixNum(minute % 60);
    } else {
        return "00:00";
    }
}

/**
 * 将"时:分"的字符串转换为分钟
 * 将"时.分"的字符串转换为分钟
 * @param hhmm "时:分"字符串
 * @returns {*}
 */
function hourMinuteConvertMinute(hhmm) {
    var temp;
    if (/^\d+:\d+$/.test(hhmm)) {
        temp = hhmm.split(":");
        return parseInt(temp[0]) * 60 + parseInt(temp[1]);
    } else if (/^\d+(.\d+)?$/.test(hhmm)) {
        temp = hhmm.split(".");
        if (temp.length == 1) {
            return parseInt(temp[0]) * 60;
        } else {
            var dividend = "1";
            for (var i = 0; i < temp[1].length; i++) {
                dividend += "0";
            }
            return parseInt(temp[0]) * 60 + parseInt(temp[1]) * 60 / dividend;
        }
    } else {
        return null;
    }
}

/**
 * 设定命名空间.
 * <p>例如. namespace('com.digitalchina.citizenweb.user')
 * @param spacename 命名空间名称，格式同java包，例如：com.digitalchina.citizenweb.user
 */
function namespace() {
    var a = arguments, o = null, i, j, d, rt;
    for (i = 0; i < a.length; ++i) {
        d = a[i].split(".");
        rt = d[0];
        eval('if(typeof ' + rt + '=="undefined"){' + rt + '={};}o=' + rt + ';');
        for (j = 1; j < d.length; ++j) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
}

// 工具函数 =============================================================================================================

/**
 * 异步请求
 *
 * @author Dendy
 * @since 2013-10-29 16:48:01
 * @param url 请求url
 * @param args 请求参数
 * @param successCallback 成功后回调
 * @param erroCallback 错误后回调
 * @param tipMsg 加载框提示信息
 * @param async 是否异步请求，默认为true
 * @param showLoading 是否显示加载对话框,默认不显示，基于jquery.loading.js
 */
function ajax(url, args, successCallback, erroCallback, async, showLoading, tipMsg) {
    if (!url) {
        throw new Error("url地址不能为空！");
    }

    if (showLoading)
        startLoading(tipMsg || "处理", 1);

    if (async == undefined || async == null || async === '') {
        async = true;
    }

    var self = this;
    $.ajax({
        url: url,
        dataType: "json",
        type: "post",
        data: args || {},
        async: async,
        success: function (data) {
            try {
                successCallback.call(self, data);
            } catch (e) {
//				console.log(e);
            }
        },
        error: function (data) {
            try {
                erroCallback.call(self, data);
            } catch (e) {
//				console.log(e);
            }
        },
        complete: function (xhr, textstatus) {
            if (showLoading)
                endLoading();
        }
    });
}

/**
 * 异步提交表单，依赖于jquery.form.js.
 *
 * @param form 提交的表单-dom对象
 * @param successCallback 提交成功回调
 * @param errorCallback 提交失败回调
 * @param showLoading 是否显示加载动画，依赖于jquery.loading.js
 * @param tipMsg 加载动画提示信息，如"保存", "提交".
 */
function ajaxSubmitForm(form, successCallback, errorCallback, showLoading, tipMsg) {
    if (!form) {
        Error("目标form不能为空！");
        return;
    }
    if (showLoading)
        startLoading(tipMsg || "提交");

    var self = this;
    $(form).ajaxSubmit({
        dataType: 'json',
        success: function (data) {
            try {
                successCallback.call(self, data);
            } catch (e) {
//				console.log(e);
            }
        }, error: function (data) {
            try {
                errorCallback.call(self, data);
            } catch (e) {
//				console.log(e);
            }
        }, complete: function () {
            if (showLoading)
                endLoading();
        }
    });
}

/**
 * 跑马灯效果
 *
 * @param lh
 * @param speed
 * @param delay
 */
function startmarquee(domId, lh, speed, delay) {
    var p = false;
    var t;
    var sh;
    var o = document.getElementById(domId);
    o.innerHTML += o.innerHTML;
    o.style.marginTop = 0;
    o.onmouseover = function () {
        p = true;
    }
    o.onmouseout = function () {
        p = false;
    }
    function start() {
        sh = o.offsetHeight;
        o.style.height = sh;
        t = setInterval(scrolling, speed);
        if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
    }

    function scrolling() {
        if (parseInt(o.style.marginTop) % lh != 0) {
            o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
            if (Math.abs(parseInt(o.style.marginTop)) >= sh / 2) o.style.marginTop = 0;
        } else {
            clearInterval(t);
            setTimeout(start, delay);
        }
    }

    setTimeout(start, delay);
}

/**
 * 数组去重
 * @param arr 要去重的数组
 * @returns {Array} 去重后的数组
 */
function unique(arr) {
    var ret = [];
    var hash = {};

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var key = typeof(item) + item;
        if (hash[key] !== 1) {
            ret.push(item);
            hash[key] = 1;
        }
    }

    return ret;
}

/**
 * 判断是否是数字
 * @param oNum
 * @return {boolean}
 */
function isNumber(oNum) {
    if (!oNum) {
        return false;
    }
    var strP = /^\d+(\.\d+)?$/;
    if (!strP.test(oNum)) {
        return false;
    }
    try {
        if (parseInt(oNum) != oNum || parseInt(oNum) == 0) {
            return false;
        }
    } catch (ex) {
        return false;
    }
    return true;
}

/**
 * 将html代码中的特殊字符转义。
 *
 * <p>例如：<html>转义后为&lt;html&gt;
 * <p>例如：%3Chtml%3E转义后为&lt;html&gt;
 * @param str html字符串
 * @return 转义后的html
 */
function htmlEncode(str) {
    var s = "";
    if (str.length == 0) return "";
    //s = str.replace(/ /g, "&nbsp;");
    //s = str.replace(/&/g, "&amp;");
    s = str.replace(/</g, "&lt;");
    s = s.replace(/%3C/g, "&lt;");
    s = s.replace(/%3c/g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/%3E/g, "&gt;");
    s = s.replace(/%3e/g, "&gt;");
    //s = s.replace(/\'/g, "&#39;");
    //s = s.replace(/\"/g, "&quot;");
    //s = s.replace(/\n/g, "<br>");
    return s;
}

/**
 * 将html字符串这种的特殊字符转义。
 *
 * <p>例如：
 *  <li><html>转义后为%26lt%3Bhtml%26gt%3B.
 *  <li>%3Chtml%3E转义后为%26lt%3Bhtml%26gt%3B.
 * @param str html字符串
 * @return 转义后的html
 */
function htmlDeepEncode(str) {
    var s = "";
    if (str.length == 0) return "";
    //s = str.replace(/ /g, "&nbsp;");
    //s = str.replace(/&/g, "&amp;");
    s = str.replace(/</g, "%26lt%3B");
    s = s.replace(/%3C/g, "%26lt%3B");
    s = s.replace(/%3c/g, "%26lt%3B");
    s = s.replace(/>/g, "%26gt%3B");
    s = s.replace(/%3E/g, "%26gt%3B");
    s = s.replace(/%3e/g, "%26gt%3B");
    //s = s.replace(/\'/g, "&#39;");
    //s = s.replace(/\"/g, "&quot;");
    //s = s.replace(/\n/g, "<br>");
    return s;
}

// 浏览器相关 ===========================================================================================================

/**
 * 判断浏览器
 * @param ns 判断结果对象
 * @returns {*}
 */
function detectBrowser() {
    var ns = {};
    var ua = ns.ua = navigator.userAgent;
    ns.isWebKit = (/webkit/i).test(ua);
    ns.isMozilla = (/mozilla/i).test(ua);
    ns.isIE = "ActiveXObject" in window;
    ns.isFirefox = (/firefox/i).test(ua);
    ns.isChrome = (/chrome/i).test(ua);
    ns.isSafari = (/safari/i).test(ua) && !this.isChrome;
    ns.isMobile = (/mobile/i).test(ua);
    ns.isOpera = (/opera/i).test(ua);
    ns.isIOS = (/ios/i).test(ua);
    ns.isIpad = (/ipad/i).test(ua);
    ns.isIpod = (/ipod/i).test(ua);
    ns.isIphone = (/iphone/i).test(ua) && !this.isIpod;
    ns.isAndroid = (/android/i).test(ua);
    ns.supportStorage = "localStorage" in window;
    ns.supportOrientation = "orientation" in window;
    ns.supportDeviceMotion = "ondevicemotion" in window;
    ns.supportTouch = "ontouchstart" in window;
    ns.supportTransform3d = ('WebKitCSSMatrix' in window);
    ns.cssPrefix = ns.isWebKit ? "webkit" : ns.isFirefox ? "Moz" : ns.isOpera ? "O" : ns.isIE ? "ms" : "";
    return ns;
}

/**
 * 判断是否是移动设备
 * @returns {boolean}
 */
function detectMobile() {
    var ns = detectBrowser();
    if (ns.isIOS || ns.isIpad || ns.isIpod || ns.isIphone || ns.isAndroid || ns.isMobile) {
        return true;
    } else {
        return false;
    }
}

/**
 * 添加到收藏夹。
 *
 * @param url 收藏的地址
 * @param title 收藏名称
 */
function addFavorite(url, title) {
    if (document.all) {
        window.external.addFavorite(url, title);
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, '');
    }
}

/**
 * 设置为首页
 * @param url 地址
 */
function setHomepage(url) {//设置首页
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(url);
    }
    else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("您的浏览器未启用[设为首页]功能，开启方法：先在地址栏内输入about:config,然后将项 signed.applets.codebase_principal_support 值该为true即可");
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', url);
    }
}