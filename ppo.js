/*
 * PPO
 * +++++++++ a utility-belt library for JavaScript +++++++++
 * (c) 2011-2017 drawcall
 * https://github.com/drawcall
 */

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.ppo = factory();
    }
})(this, function () {

    function ppo() { }

    /************************************************************************
    * Detecting 
    *************************************************************************/
    /**
    * detect IOS
    * From https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
    */
    ppo.isIOS = ppo.isIos = function () {
        return /iPad|iPhone|iPod/.test(ppo.ua());
    }

    ppo.isIPad = function () {
        return /iPad/.test(ppo.ua());
    }

    /**
    * detect Android
    * From https://stackoverflow.com/questions/6031412/detect-android-phone-via-javascript-jquery
    */
    ppo.isAndroid = function () {
        return ppo.ua('l').indexOf("android") > -1;
    }

    /**
    * detect PC / Mobile
    * From https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
    */
    ppo.isMobile = function () {
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ppo.ua('l'));
    }

    ppo.isPC = function () {
        return !this.isMobile();
    }

    ppo.isWeixin = function () {
        return /MicroMessenger/i.test(ppo.ua('l'));
    }

    /**
    * detect ie
    * From https://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript
    */
    ppo.isIE = function () {
        return ppo.ieVer() > 0;
    }

    /**
    * ie version
    * From https://codepen.io/gapcode/pen/vEJNZN
    * IE 10 ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    * IE 11 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    * Edge 12 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    * Edge 13 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
    */
    ppo.ieVersion = ppo.ieVer = function () {
        var ua = ppo.ua();
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        return -1;
    }

    /**
    * navigator.userAgent
    */
    ppo.ua = function (lower) {
        return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;
    }

    /************************************************************************
    * LOGS
    *************************************************************************/
    /**
    * log on mobile html body
    */
    ppo.log = function (msg, styles) {
        var ele = document.getElementById('_ppo_log');
        if (ele === null) {
            ele = document.createElement('div');
            ele.setAttribute('id', '_ppo_log');
            ele.setAttribute('style', 'position:fixed;left:0;top:0;z-index:9999;padding:4px;');
            document.body.appendChild(ele);
        }

        if (styles) {
            for (var style in styles) {
                ele.style[style] = styles[style];
            }
        }
        ele.innerHTML = msg;
    }

    /**
    * ppo.logs('onlyid&10', 1, 2);
    */
    ppo.logs = function () {
        if (window.console && window.console.log) {
            var onlyid = arguments[0] + '';
            var times = parseInt(onlyid.split('&')[1]) || 10;
            var logsCache = ppo._cache.logs;

            if (!logsCache[onlyid]) logsCache[onlyid] = {};
            if (!logsCache[onlyid].once) logsCache[onlyid].once = 1;

            if (logsCache[onlyid].once <= times) {
                console.log.apply(console, ppo.args(arguments, 1));
                logsCache[onlyid].once++;
            }
        }
    }

    ppo.removeConsole = function (clear) {
        try {
            if (!window.console) window.console = {};
            window.console.log = window.console.info = window.console.dir = window.console.warn = window.console.trace = ppo.noop;
            if (clear === 'clear' && window.console.clear) window.console.clear();
        } catch (e) {
        }
    }


    /************************************************************************
    * Bom and Dom
    *************************************************************************/
    /**
    * open new url dont not blocked by browser 
    */
    ppo.open = function (href) {
        var id = '_ppo_open_proxy';
        var a = document.getElementById(id) || document.createElement('a');
        a.setAttribute('id', id);
        a.setAttribute('href', href);
        a.setAttribute('target', '_blank');
        a.style.display = 'none';

        if (!a.parentNode) document.body.appendChild(a);
        this.trigger(a, 'click', 'MouseEvents');
    }

    /**
    * trigger event 
    * https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript 
    */
    ppo.trigger = function (element, event, eventType) {
        if (document.createEventObject) {
            var e = document.createEventObject();
            return element.fireEvent('on' + event, e)
        } else {
            var e = document.createEvent(eventType || 'HTMLEvents');
            e.initEvent(event, true, true);
            element.dispatchEvent(e);
        }
    };

    /**
    * setInterval func fix times
    * https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
    */
    ppo.setTimesout = function () {
        var func = arguments[0];
        var delay = arguments[1] === undefined ? 0 : parseFloat(arguments[1]);
        var times = arguments[2] === undefined ? 1 : parseInt(arguments[2]);
        var args = arguments.length > 3 ? ppo.args(arguments, 3) : null;
        var target = { index: 0, times: times, over: false };

        var id = setInterval(function () {
            target.index++;
            if (target.index > times) {
                clearInterval(id);
            } else {
                if (target.index == times) target.over = true;
                func.apply(target, args);
            }
        }, delay);

        return id;
    }

    ppo.clearTimesout = function (id) {
        clearInterval(id);
    }

    /**
    * construct
    * https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
    */
    ppo.construct = function () {
        var classs = arguments[0];
        return new (Function.prototype.bind.apply(classs, arguments));
    };

    /**
    * Gets all the formal parameter names of a function
    * https://www.zhihu.com/question/28912825
    */
    ppo.paramsName = function (fn) {
        return /\(\s*([\s\S]*?)\s*\)/.exec(fn.toString())[1].split(/\s*,\s*/);
    }

    /************************************************************************
    * Date
    *************************************************************************/
    /**
    * getDate 
    * https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    */
    ppo.getDate = function (d1, d2) {
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var ms = today.getMinutes();
        var ss = today.getSeconds();

        dd = ppo.fill0(dd);
        mm = ppo.fill0(mm);
        hh = ppo.fill0(hh);
        ms = ppo.fill0(ms);
        ss = ppo.fill0(ss);

        d1 = d1 || '/';
        d2 = d2 || ':';

        return yyyy + d1 + mm + d1 + dd + ' ' + hh + d2 + ms + d2 + ss;
    }


    /************************************************************************
    * About Url Params
    *************************************************************************/
    /**
    * getUrlParam / deleteUrlParam
    * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    */
    ppo.getUrlParam = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    /**
    * setUrlParam
    * From https://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
    */
    ppo.setUrlParam = function (key, value, url) {
        if (!url) url = window.location.href;
        var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");

        if (url.match(re)) {
            return url.replace(re, "$1" + key + "=" + encodeURIComponent(value) + "$2");
        } else {
            var hash = "";
            if (url.indexOf("#") !== -1) {
                hash = url.replace(/.*#/, "#");
                url = url.replace(/#.*/, "");
            }
            var separator = url.indexOf("?") !== -1 ? "&" : "?";
            return url + separator + key + "=" + encodeURIComponent(value) + hash;
        }
    }

    ppo.deleteUrlParam = ppo.delUrlParam = function (param, url) {
        if (!url) url = window.location.href;
        //prefer to use l.search if you have a location/link object
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {

            var prefix = encodeURIComponent(param) + '=';
            var pars = urlparts[1].split(/[&;]/g);

            //reverse iteration as may be destructive
            for (var i = pars.length; i-- > 0;) {
                //idiom for string.startsWith
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
            return url;
        } else {
            return url;
        }
    }


    /************************************************************************
    * Cookies
    *************************************************************************/
    /**
    * setCookie / getCookie / deleteCookie
    * From https://stackoverflow.com/questions/1458724/how-do-i-set-unset-cookie-with-jquery/1458728#1458728
    * change by drawcall
    */
    ppo.setCookie = function (name, value, option) {
        var longTime = 10;
        var path = "; path=/";
        var val = option && option.raw ? value : encodeURIComponent(value);
        var cookie = encodeURIComponent(name) + "=" + val;

        if (option) {
            if (option.days) {
                var date = new Date();
                var ms = option.days * 24 * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                cookie += "; expires=" + date.toGMTString();
            } else if (option.hour) {
                var date = new Date();
                var ms = option.hour * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                cookie += "; expires=" + date.toGMTString();
            } else {
                var date = new Date();
                var ms = longTime * 365 * 24 * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                cookie += "; expires=" + date.toGMTString();
            }

            if (option.path) cookie += "; path=" + option.path;
            if (option.domain) cookie += "; domain=" + option.domain;
            if (option.secure) cookie += "; true";
        }

        document.cookie = cookie;
    }

    ppo.getCookie = function (name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }

        return null;
    }

    ppo.deleteCookie = ppo.delCookie = function (name) {
        this.setCookie(name, "", { hour: -1 });
    }


    /************************************************************************
    * Random And Math
    *************************************************************************/
    ppo.randomColor = function () {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }

    ppo.randomFromArray = ppo.randomfArr = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    ppo.randomFromA2B = ppo.randomA2B = function (a, b, int) {
        var result = Math.random() * (b - a) + a;
        return int ? Math.floor(result) : result;
    }

    ppo.randomKey = function (length) {
        var key = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        length = length || 6;

        for (var i = 0; i < length; i++)
            key += possible.charAt(Math.floor(Math.random() * possible.length));
        return key;
    }

    ppo.floor = function (n, m) {
        m = m || 0;
        return Math.floor(n * Math.pow(10, m)) / Math.pow(10, m);
    }

    ppo.fill0 = function (num) {
        num = parseFloat(num);
        return num < 10 ? '0' + num : num;
    }

    ppo.currency = function (val) {
        m = m || 0;
        return Math.floor(n * Math.pow(10, m)) / Math.pow(10, m);
    }

    /************************************************************************
    * Mobile 
    *************************************************************************/
    /**
    * lock touch in mobile phone
    */
    ppo.lockTouch = function () {
        document.addEventListener("touchmove", function (e) { e.preventDefault(); }, !1);
        document.addEventListener('touchstart', preventDefault, !1);
        document.addEventListener('touchend', preventDefault, !1);

        function not(e, tag) {
            return e.target.tagName != tag.toUpperCase() && e.target.tagName != tag.toLowerCase();
        }

        function preventDefault(e) {
            if (not(e, 'input') && not(e, 'textarea') && not(e, 'select') && not(e, 'menus'))
                e.preventDefault();
        }
    }


    /************************************************************************
    * Assets 
    *************************************************************************/
    /**
    * load js
    * 1. ppo.loadjs("//your_url/a.js",func);
    * 2. ppo.loadjs("//your_url/a.js","only_id",func);
    */
    ppo.loadjs = function (url, b, c) {
        var onlyId,
            callback;

        if (typeof b == "function") {
            onlyId = this.hash(url + "") + "";
            callback = b;
        } else if (typeof b == "undefined") {
            onlyId = this.hash(url + "") + "";
            callback = null;
        } else {
            onlyId = b + "";
            callback = c;
        }

        if (ppo._cache.urls[onlyId]) {
            callback && callback();
        } else {
            var func = typeof url == "string" ? _insertScript : _insertScripts;
            func.call(this, url, function () {
                ppo._cache.urls[onlyId] = true;
                callback && callback();
            });
        }
    }


    /************************************************************************
    * Other 
    *************************************************************************/
    /**
    * generate uuid
    * From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    */
    ppo.uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
    * string hash map
    * From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
    */
    ppo.hash = function (str) {
        str += "";
        var hash = 0, i, chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return hash;
    }

    /**
    * map condition judge 
    */
    ppo.judge = ppo.judgment = function (v, vals, strict) {
        if (!this.isTypeof(vals, 'array')) return false;

        for (var key in vals) {
            if (strict) {
                if (v === vals[key])
                    return true;
            } else {
                if (v == vals[key])
                    return true;
            }
        }

        return false;
    }

    /**
    * is typeof type
    */
    ppo.isTypeof = function (val, type) {
        return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === type;
    }

    /**
    * to json
    */
    ppo.toJSON = ppo.tojson = ppo.toJson = function (res) {
        if (!res) return null;

        if (typeof res == 'string') {
            try {
                return JSON.parse(res);
            } catch (e) {
                return eval('(' + res + ')');
            }
        } else if (this.isTypeof(res.json, 'function')) {
            return res.json();
        } else {
            return res;
        }
    }

    /**
    * to array
    */
    ppo.toArray = function (obj, dot) {
        if (!obj) return null;

        if (ppo.isTypeof(obj, 'array')) {
            return obj;
        } else if (ppo.isTypeof(obj, 'string') && obj.indexOf(",") > 0) {
            return obj.split(',');
        } else {
            if (dot && ppo.isTypeof(obj, 'string'))
                return obj.split(dot);
            else
                return [obj];
        }
    }

    /**
    * arguments to array
    */
    ppo.args = function ($arguments, first) {
        return Array.prototype.slice.call($arguments, first || 0);
    }

    ppo.delLastComma = ppo.deleteLastComma = function (str) {
        str += '';
        str = (str.slice(str.length - 1) === ',') ? str.slice(0, -1) : str;
        return str;
    }

    /**
    * a trash object
    */
    ppo.trash = {
        clear: function () {
            for (var key in ppo.trash) {
                if (key !== 'log' && key !== 'clear')
                    delete ppo.trash[key];
            }
        },
        log: function () {
            for (var key in ppo.trash) {
                if (key !== 'log' && key !== 'clear')
                    console.log('ppo.trash:: ', key, ppo.trash[key]);
            }
        }
    };

    ppo.noop = function () { };

    /************************************************************************
    *
    *   Private Method 
    *
    *************************************************************************/
    ppo._cache = { urls: {}, logs: {} };

    var _insertScripts = function (arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            _insertScript(arr[i], loaded);
        }

        var _index = 0;
        function loaded() {
            _index++;
            if (_index >= arr.length) {
                callback && callback();
            }
        }
    }

    var _insertScript = function (src, callback) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", src);
        document.getElementsByTagName("head")[0].appendChild(script);

        if (/msie/.test(ppo.ua('l'))) {
            script.onreadystatechange = function () {
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    callback();
                }
            };
        } else if (/gecko/.test(ppo.ua('l'))) {
            script.onload = function () {
                callback();
            };
        } else {
            setTimeout(function () { callback(); }, 50);
        }
    }


    return ppo;
});
