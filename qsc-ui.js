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
        html:  '<div id="qsc-ui-nav">'
            + '<ul>'
            + '<li><a href="http://www.qsc.zju.edu.cn">求是潮</a></li>'
            + '<li><a href="http://www.qsc.zju.edu.cn/apps/qanda">党校在线答题</a></li>'
            + '<li><a href="http://www.qsc.zju.edu.cn/share">Share学习交流平台</a></li>'
            + '<li><a href="http://notice.myqsc.com/">Notice活动发布平台</a></li>'
            + '<li><a href="http://m.myqsc.com/get/">Mobile手机站</a></li>'
            + '<li><a href="http://box.myqsc.com/">Box云优盘</a></li>'
            + '<li><a href="http://app.myqsc.com/voice/">Voice求是好声音</a></li>'
            + '<li><a href="https://passport.myqsc.com/">求是潮通行证</a></li>'
            + '</ul>'
            + '</div>',
        append: function() {
            (function(d) {
                d.innerHTML = nav.html + d.innerHTML;
            })(document.body);
        }
    };

    var statistics = {
        getId: function() {
            var href = window.location.href;
            if(href.match(/apps\/video/)) return 4;
            if(href.match(/notice\.myqsc/)) return 2;
            if(href.match(/www\.qsc\.zju\.edu\.cn/)) return 1; // 注意主站的链接要放在最后面以防错误匹配
            return false;
        },
        append: function() {
            if(!statistics.getId()) return;
            var baseUrl = "//stat.myqsc.com/";
            document.write(unescape("%3Cscript src='" + baseUrl + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
            (function() {
                if(typeof Piwik == "undefined") {
                    setTimeout(arguments.callee, 20);
                    return;
                }
                var piwikTracker = Piwik.getTracker(baseUrl + "piwik.php", statistics.getId());
                piwikTracker.trackPageView();
                piwikTracker.enableLinkTracking();
            })();
        }
    };

    var ready = function(callback) {
        (function() {
            if (document.readyState == "interactive" || document.readyState == "complete") {
                if(typeof callback == "function") {
                    callback();
                }
            } else {
                setTimeout(arguments.callee, 4);
            }
        })()
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
