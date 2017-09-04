$(function () {

    //------------------ Url Params -----------------
    addChapter({
        'name': 'Detecting'
    });

    // is ios
    addFragment({
        'name': 'isIOS',
        'api': 'ppo.isIOS() or ppo.isIos()',
        'introduce': 'Check whether the mobile device is an IOS device.',
        'code': [
            "if(ppo.isIOS()) { $('#con').addClass('ios'); }"
        ],
        'example': 'detecting is ios - ' + ppo.isIOS()
    });

    // is Android
    addFragment({
        'name': 'isAndroid',
        'api': 'ppo.isAndroid()',
        'introduce': 'Check whether the mobile device is an Android device.',
        'code': [
            "if(ppo.isAndroid()) { $('#con').addClass('android'); }"
        ],
        'example': 'detecting is android - ' + ppo.isAndroid()
    });

    // is ipad
    addFragment({
        'name': 'isIPad',
        'api': 'ppo.isIPad()',
        'introduce': 'Check whether the mobile device is an IPad.',
        'code': [
            "if(ppo.isIPad()) { $('#con').addClass('ipad'); }"
        ],
        'example': 'detecting is ipad - ' + ppo.isIPad()
    });

    // is isMobile
    addFragment({
        'name': 'isMobile',
        'api': 'ppo.isMobile()',
        'introduce': 'Check if the current device is a mobile device.',
        'code': [
            "if(ppo.isMobile()) { $('#con').show(); }"
        ],
        'example': 'detecting is Mobile - ' + ppo.isMobile()
    });

    // is isPC
    addFragment({
        'name': 'isPC',
        'api': 'ppo.isPC()',
        'introduce': 'Check whether the current device is an PC device.',
        'code': [
            "if(ppo.isPC()) { $('#con').show(); }"
        ],
        'example': 'detecting is PC - ' + ppo.isPC()
    });

    // is isIE
    addFragment({
        'name': 'isIE',
        'api': 'ppo.isIE()',
        'introduce': 'Detect the current browser is Microsoft IE.',
        'code': [
            "ppo.isIE()"
        ],
        'example': 'detecting is IE browser - ' + ppo.isIE()
    });

    // get ie Version
    addFragment({
        'name': 'ieVersion',
        'api': 'ppo.ieVersion() or ppo.ieVer()',
        'introduce': 'Check the IE browser version.',
        'code': [
            "document.getElementById('info').innerText = ppo.ieVersion();"
        ],
        'example': 'IE browser version - ' + ppo.ieVersion()
    });


    //------------------ LOGS -----------------
    addChapter({
        'name': 'LOGS'
    });

    // log
    addFragment({
        'name': 'log',
        'api': 'ppo.log(msg, styles?)',
        'introduce': 'the tool that display log information on your phone device.',
        'code': [
            "var cookie = ppo.getCookie('pid'); \n",
            "ppo.log(cookie); or ppo.log(cookie, {color:'#fff', 'background':'#ff0000'});"
        ],
        'example': '<div class="button log">open log</div>',
        'script': function () {
            $('.log').click(function () {
                ppo.log(ppo.randomA2B(10000, 90000, true), { 'color': '#fff', 'background': '#ff0000' });
                $('body').scrollTop(0);
            });
        }
    });

    // logs
    addFragment({
        'name': 'logs',
        'api': 'ppo.logs(\'+10\', 1, 2)',
        'introduce': 'In setInterval or requestAnimationFrame functions, a fixed number of log is performed only.',
        'code': [
            "setInterval(function(){ \n",
            "   // Print only 10 times \n",
            "   ppo.logs('+10', 1, 2, 'hello', abc); \n",
            "}, 20);"
        ],
        'example': '<div class="button logs">start log</div> Please press f12 to open the console panel',
        'script': function () {
            var id = 0;

            $('.logs').click(function () {
                var index = 0;
                clearInterval(id);

                id = setInterval(function () {
                    ppo.logs('+10', 'hello', index++);
                }, 20);
            });

        }
    });

    // removeConsole
    addFragment({
        'name': 'removeConsole',
        'api': 'ppo.removeConsole()',
        'introduce': 'Clear the console information to make the console cleaner and just keep the console.error',
        'code': [
            "ppo.removeConsole(); \n",
            "ppo.removeConsole('clear');"
        ]
    });

    //------------------ Bom and Dom -----------------
    addChapter({
        'name': 'Bom and Dom'
    });

    // open new url dont not blocked by browser 
    addFragment({
        'name': 'open',
        'api': 'ppo.open(url)',
        'introduce': 'js opens a new page without being blocked by the browser.',
        'code': [
            "$('a').click(function(){ \n",
            "   setTimeout(function () { ppo.open('https://github.com'); }, 200); \n",
            "});",
        ],
        'example': '<div class="button open">open github</div>',
        'script': function () {
            $('.open').click(function () {
                setTimeout(function () { ppo.open('https://github.com'); }, 200);
            });
        }
    });

    // lock touch in mobile phone 
    addFragment({
        'name': 'lockTouch',
        'api': 'ppo.lockTouch()',
        'introduce': 'Mobile web development often binds the touch event and sets e.preventDefault(). <br/>like code: <code style="margin-left:5px;">document.addEventListener("touchmove", function (e) { e.preventDefault(); }, false);</code>',
        'code': [
            "ppo.lockTouch()",
        ]
    });


    //------------------ Url Params -----------------
    addChapter({
        'name': 'Url Params'
    });

    // getUrlParam 
    addFragment({
        'name': 'getUrlParam',
        'api': 'ppo.getUrlParam(name, url?)',
        'introduce': 'get the url parameter of the current page(or custom).',
        'code': [
            "console.log(ppo.getUrlParam('id')); \n",
            "ppo.getUrlParam('a' ,'http://xxx.com?a=3&b=sd23s');"
        ]
    });

    // setUrlParam
    addFragment({
        'name': 'setUrlParam',
        'api': 'ppo.setUrlParam(name, val, url?)',
        'introduce': 'Set the current page (or custom) url parameters, return the modified url.',
        'code': [
            "console.log(ppo.setUrlParam('abc', 'helloworld')); \n",
            "ppo.setUrlParam('a', 1, 'http://xxx.com?a=3&b=sd23s');"
        ]
    });

    // deleteUrlParam
    addFragment({
        'name': 'deleteUrlParam',
        'api': 'ppo.deleteUrlParam(name, url?) or ppo.delUrlParam(name)',
        'introduce': 'delete the current page (or custom) url parameter, return the modified url.',
        'code': [
            "console.log(ppo.delUrlParam('uid')); \n",
            "ppo.delUrlParam('a', 'http://xxx.com?a=3&b=sd23s');"
        ]
    });

    //------------------ Cookies -----------------
    addChapter({
        'name': 'Cookies'
    });

    // setCookie 
    addFragment({
        'name': 'setCookie',
        'api': 'ppo.setCookie(name, value, option?)',
        'introduce': 'Set the browser cookie. The option param can set the following parameters: days, hour, path, domain, secure, raw.',
        'code': [
            "ppo.setCookie('username', 'small'); \n",
            "ppo.setCookie('time', 123, { hour: 12 }); \n",
            "ppo.setCookie('a', 'helloworld', { domain: '.github.com' }); \n",
            "ppo.setCookie('code', '%3Ca%3E%20sd', { raw: true }); //do not encode",
        ]
    });

    // getCookie 
    addFragment({
        'name': 'getCookie',
        'api': 'ppo.getCookie(name)',
        'introduce': 'Get the browser cookie.',
        'code': [
            "ppo.setCookie('username');"
        ]
    });

    // deleteCookie 
    addFragment({
        'name': 'deleteCookie',
        'api': 'ppo.deleteCookie(name) or ppo.delCookie(name)',
        'introduce': 'delete the browser cookie.',
        'code': [
            "ppo.delCookie('username');"
        ]
    });


    //------------------ Random And Math -----------------
    addChapter({
        'name': 'Random And Math'
    });

    // randomFromA2B 
    addFragment({
        'name': 'randomFromA2B',
        'api': 'ppo.randomFromA2B(min, max, int?)',
        'introduce': 'Returns the random number between two numbers.',
        'code': [
            "ppo.randomFromA2B(1, 20) \n",
            "ppo.randomFromA2B(1, 20, true)"
        ],
        'example': '<div class="button a2b">get random</div> <span>[1-1000](int) :: </span>',
        'script': function () {
            var pre = $('.a2b').next().text();
            $('.a2b').click(function () {
                var text = pre + ppo.randomA2B(1, 1000, true);
                $(this).next().text(text);
            });
        }
    });

    // randomFromArray 
    addFragment({
        'name': 'randomFromArray',
        'api': 'ppo.randomFromArray(arr)',
        'introduce': 'Returns a random item in the array.',
        'code': [
            "ppo.randomFromArray([1, 3, 9, 20]) \n"
        ],
        'example': '<div class="button rfa">get random</div> <span>[1, 3, 9, 20, \'a\', \'b\'] :: </span>',
        'script': function () {
            var pre = $('.rfa').next().text();
            $('.rfa').click(function () {
                var text = pre + ppo.randomFromArray([1, 3, 9, 20, 'a', 'b']);
                $(this).next().text(text);
            });
        }
    });

    // randomColor 
    addFragment({
        'name': 'randomColor',
        'api': 'ppo.randomColor()',
        'introduce': 'Returns the hex format random color.',
        'code': [
            "ppo.randomColor() \n"
        ],
        'example': '<div class="button rcolor">get random</div> <span>color :: </span>',
        'script': function () {
            var pre = $('.rcolor').next().text();
            $('.rcolor').click(function () {
                var color = ppo.randomColor();
                var text = pre + color;
                $(this).next().text(text);
                $(this).css('background', color);
            });
        }
    });

    // randomKey 
    addFragment({
        'name': 'randomKey',
        'api': 'ppo.randomKey(length?)',
        'introduce': 'Returns a random string containing uppercase and lowercase letters and numbers.',
        'code': [
            "ppo.randomKey(12) \n"
        ],
        'example': '<div class="button rkey">get random</div> <span>key :: </span>',
        'script': function () {
            var pre = $('.rkey').next().text();
            $('.rkey').click(function () {
                var text = pre + ppo.randomKey(12);
                $(this).next().text(text);
            });
        }
    });

    // floor 
    addFragment({
        'name': 'floor',
        'api': 'ppo.floor(a, b?)',
        'introduce': 'Keep a few decimal places. Default is 0',
        'code': [
            "ppo.floor(Math.random(), 5) \n"
        ],
        'example': '<div class="button rfloor">get result</div> <span>result :: </span>',
        'script': function () {
            var pre = $('.rfloor').next().text();
            $('.rfloor').click(function () {
                var text = pre + ppo.floor(Math.random(), 5);
                $(this).next().text(text);
            });
        }
    });

    // fill0 
    addFragment({
        'name': 'fill0',
        'api': 'ppo.fill0(num)',
        'introduce': 'Number less than 10 complement 0',
        'code': [
            "ppo.fill0(5) // 05 \n"
        ]
    });

    //------------------ Assets and Data -----------------
    addChapter({
        'name': 'Assets and Data'
    });

    // loadjs 
    addFragment({
        'name': 'loadjs',
        'api': 'ppo.loadjs(urls, idOrCallback?, callback?)',
        'introduce': 'Asynchronous loading javascript script, and cache loading',
        'code': [
            "ppo.loadjs('http://x.com/a.js'); \n",
            "ppo.loadjs('http://x.com/a.js', callback); \n",
            "ppo.loadjs('http://x.com/a.js', 'only_id', callback); \n",
            "ppo.loadjs(['./a.js','./b.js','./c.js'], callback); \n"
        ],
        'example': '<a href="https://github.com/SmartDoubleXiao/multipleClick" target="_blank">a jQuery plugin for multiple click</a><span style="color:#000;"></span><div class="button mclick">three click</div>',
        'script': function () {
            ppo.loadjs('./docs/js/mclick.js', function () {
                $('.mclick').prev().text(' is loaded!');
                $('.mclick').mClick(300, 3, function () {
                    alert('press three times');
                });
            });
        }
    });

    // toJson 
    addFragment({
        'name': 'toJson',
        'api': 'ppo.toJson(res) or ppo.toJSON(res)',
        'introduce': 'This method is used to handle the data returned by ajax, which is not determined to be a string or json',
        'code': [
            "$.ajax({ url:'xx', success: res => { \n",
            "   var data = ppo.toJson(res); \n",
            "   ... \n",
            "   } \n",
            "});",
        ]
    });

    //------------------ Date -----------------
    addChapter({
        'name': 'Date'
    });

    // getDate 
    addFragment({
        'name': 'getDate',
        'api': 'ppo.getDate(d1?, d2?)',
        'introduce': 'Return to the current time, year - month - day - seconds - minutes.',
        'code': [
            "ppo.getDate(); \n",
            "ppo.getDate('-', '-'); \n"
        ],
        'example': '<span class="gdate"></span>',
        'script': function () {
            setInterval(function () {
                $('.gdate').text(ppo.getDate());
            }, 1000 / 30);
        }
    });

    //------------------ Other -----------------
    addChapter({
        'name': 'Other'
    });

    // uuid 
    addFragment({
        'name': 'uuid',
        'api': 'ppo.uuid()',
        'introduce': 'Generates a Universally Unique Identifier',
        'code': [
            "ppo.uuid() \n"
        ],
        'example': 'uuid :: <span class="uuid"> </span>',
        'script': function () {
            $('.uuid').text(ppo.uuid());
        }
    });

    // hash 
    addFragment({
        'name': 'hash',
        'api': 'ppo.hash()',
        'introduce': 'Generates a unique hasn code based on the input string',
        'code': [
            "ppo.hash('sdf%$sdfMnjjskds23'); \n"
        ],
        'example': '<input placeholder="please input!" class="hashinput"></input><div class="button hash">get hash</div> <span>hash :: </span>',
        'script': function () {
            var pre = $('.rfloor').next().text();
            $('.hashinput').val('sdf%$sdfMnjjskds23');
            $('.hash').click(function () {
                var val = $('.hashinput').val();
                var hash = pre + ppo.hash(val);
                $(this).next().text(hash);
            });
        }
    });

    // isTypeof 
    addFragment({
        'name': 'isTypeof',
        'api': 'ppo.isTypeof(a, type)',
        'introduce': 'Determine the type of a variable',
        'code': [
            "if(ppo.isTypeof(arr, 'array')){ console.log(arr); } \n"
        ]
    });

    // judge 
    addFragment({
        'name': 'judge',
        'api': 'ppo.judge(v, vals, strict?)',
        'introduce': 'A number of conditions to determine, like x == a || x == b || x == c ..., strict is ===.',
        'code': [
            "if(ppo.judeg(navigator.userAgent, ['iPad','iPhone','iPod'], true){  \n",
            "   console.log('is ios device!');  \n",
            "}"
        ]
    });

    // trash 
    addFragment({
        'name': 'trash',
        'api': 'ppo.trash',
        'introduce': 'A trash cache object, used to store the development of the need to use a variety of temporary variables',
        'code': [
            "ppo.trash['name'] = 'xxxx'; \n",
            "ppo.trash['end'] = (new Date()).getTime(); \n",
            "ppo.trash['cache'] = {}; \n"
        ]
    });

    // noop 
    addFragment({
        'name': 'noop',
        'api': 'ppo.noop',
        'introduce': 'A noop function',
        'code': [
            "var func = ppo.noop; \n"
        ]
    });

});



// dom method --------------------
// add chapter
function addChapter(data) {
    var chapter = [
        '<h2 id="' + data.name.replace(/\s/ig, "") + '">' + data.name + '</h2>',
        '<hr>',
    ].join('');

    var sideCon = $('<div class="side_con"></div>');
    var side = [
        '<a class="toc_title" href="#' + data.name.replace(/\s/ig, "") + '">',
        '   <span>' + data.name + '</span>',
        '</a>',
        '<ul class="toc_section">',
        '</ul>'
    ].join('');

    sideCon.append(side);
    $("#sidebar").append(sideCon);
    $("#doc").append(chapter);
}

// add fragment
function addFragment(data) {
    var fragment = [
        '<p id="' + data.name.replace(/\s/ig, "") + '">',
        '   <b class="header"><span>✿</span> ' + data.name + '</b>',
        '   <code>' + data.api + '</code>',
        '   <br/>',
        '   <span>' + data.introduce + '</span>',
        '</p>',
        '<pre>' + (typeof data.code == 'string' ? data.code : data.code.join('')) + '</pre>'
    ].join('');

    if (data.example) {
        fragment += '<b>example : </b><span style="color:#777;">' + data.example + '</span>';
    }

    if (data.script) {
        setTimeout(data.script, 50);
    }

    var side = [
        '<li>- <a href="#' + data.name.replace(/\s/ig, "") + '">' + data.name + '</a></li>'
    ].join('');

    $('.toc_section:last').append(side);
    $("#doc").append(fragment);
}
