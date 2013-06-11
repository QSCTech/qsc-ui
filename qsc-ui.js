// qsc-ui.js
// Licensed under the MIT license

var qscUI = (function() {
    var opinions = {
        autoAppendNav: true,
        autoAppendStatistics: true
    }

    // apply opinions in qscUIConfig
    if(typeof qscUIConfig != "undefined") {
        for(var key in qscUIConfig) {
            opinions[key] = qscUIConfig[key];
        }
    }

    var nav = {
        html:  '<ul>'
                 + '<li><a href="http://www.qsc.zju.edu.cn">求是潮</a></li>'
                 + '<li><a href="http://www.qsc.zju.edu.cn/apps/qanda">党校在线答题</a></li>'
                 + '<li><a href="http://www.qsc.zju.edu.cn/share">Share学习交流平台</a></li>'
                 + '<li><a href="http://notice.myqsc.com/">Notice活动发布平台</a></li>'
                 + '<li><a href="http://m.myqsc.com/get/">Mobile手机站</a></li>'
                 + '<li><a href="http://box.myqsc.com/">Box云优盘</a></li>'
                 + '<li><a href="http://app.myqsc.com/voice/">Voice求是好声音</a></li>'
                 + '<li><a href="https://passport.myqsc.com/">求是潮通行证</a></li>'
            + '</ul>',
        append: function() {
            (function(d) {
                d.innerHTML = nav.html + d.innerHTML;
            })(document.body);
        }
    };

    var statistics = {
        getId: function() {
            if(window.location.href.match(/apps\/video/)) {
                return 4;
            }
        },
        append: function() {
            var baseUrl = "//stat.myqsc.com/";
            document.write(unescape("%3Cscript src='" + baseUrl + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
            (function() {
                if(typeof Piwik == "undefined") {
                    setTimeout(arguments.callee, 20);
                    return;
                }
                var piwikTracker = Piwik.getTracker(baseUrl + "piwik.php", 4);
                piwikTracker.trackPageView();
                piwikTracker.enableLinkTracking();
            })();
        }
    };

    var ready = function(callback) {
        if (document.readyState == "interactive" || document.readyState == "complete") {
            if(typeof callback == "function") {
                callback();
            }
        } else {
            setTimeout(arguments.callee, 4);
        }
    };

    return {
        opinions: opinions,
        appendNav: nav.append,
        appendStatistics: statistics.append,
        ready: ready
    };
})();

(function() {
    qscUI.ready(function() {
        (function(o) {
            if(o.autoAppendNav) qscUI.appendNav();
            if(o.autoAppendStatistics) qscUI.appendStatistics();
        })(qscUI.opinions);
    });
})();
