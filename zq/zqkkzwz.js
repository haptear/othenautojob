/*
本脚本来自于shaolin-kongfu。

1、替换zqkd_param=为p=，使其正常提交，中青Android版本不再限制3.6.0。
2、为加快重跑速度降低黑号风险，对任务执行成功并已获取奖励的任务进行缓存，当日重跑时不再重复执行请求。
3、原提交失败任务会被脚本删除，更新后不再删除，仅做缓存记录并在重跑时重复提交，会在/docker/elecv2p/Store目录下每日新增[cache_zqkkz_wzreward_$yyyyMMdd,cache_zqllz_reward_$yyyyMMdd,cache_jckkz_reward_$yyyyMMdd]等文件，当文件删除时缓存失效。

[rewrite_local]

#看看赚
https://kandian.wkandian.com/v5/nameless/bannerstatus.json 重写目标 https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/zq/zqkkzwz.js
[MITM]
hostname = kandian.wkandian.com

version:v1.0.1
*/
const $ = new Env("中青看点看看赚文章");
const notify = $.isNode() ? require('./sendNotify') : '';
message = ""

//test
//rocess.env.zplookwzbody = 'p=nCWwRj3eGxCw%3Dr_eNlWKYuMeKCD0GRCZiId7C1AVNRQUdYBKApsKgataCzAkhWvtXXM__XMDp9JrW3hFW5_EhKT6yBlazVXQno3GCaaADoxlLb7fEBeDjFk4LQvMKza0yx-eySgg6tjxjH9iDq8u707_iPp59fWZ5nhdZu685eJI0tRGviB2X2EDbr4EV8adpsBOdCQR7wQat6SnnxScLblKWBCk-h7LukH2m08tJPCdSlPqKauGMN72nHEk-Ayd5dKiqTRafZoBS20QCZnTfZYhsafu4USi83u3rW2S4GnaebDOAbvNMa_JheugBxt7P3hDhBOBm2lU2WOlY156QP6tnqDZW2ofcxCKiUuxSphdmRKXlJp9o58rK7S9Ja9zcMwH9XetyS300nEwEuCqELy4Lw1SPZebUbEAZnFmHUTFtp4wq0d9BIVEKZ8ElHbVDwxcXfP_fT8P_ZUZB2qOJN87LaI3cRj66u5erhg6hrOsSRjjJJXCFYI6guC0jBx7f9teIhKU3zeO3dJJYJQxR9zmiI_4qgQAC1e0eR5XCG-PRu4lcaczD4QRBEZ_azP4aAkwNnCSpBc_6ihZWf2HFqzJKj3VKol2_Q28vurbXmSAFPVM4yo623vIOfI4bmAlFxo6lb_8wqU-HeM-z5Noc43HUZKTF0MnPVIvJKNSLe9rJYA58MkJwoIrF2zUNViuk3CRX4PMbzVOrgVVQ5YtvJYsWEqD0hGAXMZakXvCZirUnMmlB5OGddw-RfzN6LULa1idsVqEtds2Jk51xy1uAkWmXWkFNSG_WUNNm4O4ljXGV-nW9-ub-oIqvYauEINku9fIzY0m08EHFdYO5oW8huR4lHPHt_UpCR3C62JS7iTDAhtxFN9AKsDdAqZyqSgxtoU67CXwq1XF8uYy_gRJ4x8lRXmn4_94rGbJdtxUWCwJHoPoafY3VeTG_4ULWgF3xn_QQGAshmrGzAFtE7hrv8NtLUWe4XZd0XUfgyU_DK8n_vFdH_3Db_gP-cj5j5ANWka4Z24WQ9JelUW5bXliNqSoWCylY0ENK2D8D3pXB70uoN0Zt8gry7yr5zBkyqvWg8pi2C44rZIMsWBdddVROAYQ1P1U8Xh1Z4lqZP5_zwHdQKyf84VlJsd1OsI5weFnbhz3UGCpCw8hAC41xR9u4OBVXsiQOpcBRZyOVHWYSCk-QvI_wjQuCc9j6h0HRLZKYYecivAXD8eZoX_hNMxNWcE8%3D';
//process.env.zq_cookie = "1";

let zplookwzbody = $.isNode() ? (process.env.zplookwzbody ? process.env.zplookwzbody : "") : ($.getdata('zplookwzbody') ? $.getdata('zplookwzbody') : "")
let zplookwzbodyArr = []
let zplookwzbodys = ""

let zq_cookie = $.isNode() ? (process.env.zq_cookie ? process.env.zq_cookie : "") : ($.getdata('zq_cookie') ? $.getdata('zq_cookie') : "")
let zq_cookieArr = []
let zq_cookies = ""
//待改
const lookheader = {
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1183',
    'Host': 'kandian.wkandian.com'
}
//待改
const rewardheader = {
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1199',
    'Host': 'kandian.wkandian.com'
}

const lookStartheader = {
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1199',
    'Host': 'kandian.wkandian.com'
}


Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var nowDay = new Date();
var cacheKeyName = `cache_zqkkz_wzreward_${nowDay.Format("yyyyMMdd")}`;
var failureCacheKeyName = `cache_zqkkz_wzreward_failure_${nowDay.Format("yyyyMMdd")}`;

function setCache (cacheKey, cacheValue) {
    var tmpCacheValue = $store.get(cacheKey);
    if (tmpCacheValue) {
        if (tmpCacheValue.indexOf(cacheValue) > -1) {
            return true;
        } else {
            tmpCacheValue += "&" + cacheValue;
            $store.put(tmpCacheValue, cacheKey);
            return true;
        }
    } else {
        $store.put(cacheValue, cacheKey);
        return true;
    }
}

function getCache (cacheKey) {
    var tmpCacheValue = $store.get(cacheKey);
    return tmpCacheValue;
}

function containCache (cacheKey, cacheValue) {
    var tmpCacheValue = $store.get(cacheKey);
    if (tmpCacheValue) {
        if (tmpCacheValue.indexOf(cacheValue) > -1) {
            return true;
        }
        return false;
    } else {
        return false;
    }
}


if (zq_cookie) {
    if (zq_cookie.indexOf("@") == -1 && zq_cookie.indexOf("@") == -1) {
        zq_cookieArr.push(zq_cookie)
    } else if (zq_cookie.indexOf("@") > -1) {
        zq_cookies = zq_cookie.split("@")
    } else if (process.env.zq_cookie && process.env.zq_cookie.indexOf('@') > -1) {
        zq_cookieArr = process.env.zq_cookie.split('@');
        console.log(`您选择的是用"@"隔开\n`)
    }
} else if ($.isNode()) {
    var fs = require("fs");
    zq_cookie = fs.readFileSync("zq_cookie.txt", "utf8");
    if (zq_cookie !== `undefined`) {
        zq_cookies = zq_cookie.split("\n");
    } else {
        $.msg($.name, '【提示】进入点击右下角"任务图标"，再跑一次脚本', '不知道说啥好', {
            "open-url": "给您劈个叉吧"
        });
        $.done()
    }
}
Object.keys(zq_cookies).forEach((item) => {
    if (zq_cookies[item] && !zq_cookies[item].startsWith("#")) {
        zq_cookieArr.push(zq_cookies[item])
    }
})
if (zplookwzbody) {
    if (zplookwzbody.indexOf("&") == -1) {
        zplookwzbodyArr.push(zplookwzbody)
    } else if (zplookwzbody.indexOf("&") > -1) {
        zplookwzbodys = zplookwzbody.split("&")
    } else if (process.env.zplookwzbody && process.env.zplookwzbody.indexOf('&') > -1) {
        zplookwzbodyArr = process.env.zplookwzbody.split('&');
        console.log(`您选择的是用"&"隔开\n`)
    }
} else if ($.isNode()) {
    var fs = require("fs");
    zplookwzbody = fs.readFileSync("zplookwzbody.txt", "utf8");
    if (zplookwzbody !== `undefined`) {
        zplookwzbodys = zplookwzbody.split("\n");
    } else {
        $.msg($.name, '【提示】请点击看看赚某一任务获取body', '不知道说啥好', {
            "open-url": "给您劈个叉吧"
        });
        $.done()
    }
}
Object.keys(zplookwzbodys).forEach((item) => {
    if (zplookwzbodys[item] && !zplookwzbodys[item].startsWith("#")) {
        zplookwzbodyArr.push(zplookwzbodys[item])
    }
})

!(async () => {
    if (typeof $request !== "undefined") {
        await getzplookwzbody()
        $.done()
    } else {
        console.log(`共${zplookwzbodyArr.length}个看看赚文章body`)
        for (let k = 0; k < zplookwzbodyArr.length; k++) {
            zplookwzbody1 = zplookwzbodyArr[k];
            //兼容Android 3.8.8
            if (zplookwzbody1.indexOf("zqkd_param=") >= -1) {
                zplookwzbody1 = zplookwzbody1.replace("zqkd_param=", "p=")
            }
            console.log(`--------第 ${k + 1} 次看看赚文章执行中--------\n`)
            let tmpCache = containCache(cacheKeyName, zplookwzbody1);
            //console.log(tmpCache);
            if (tmpCache !== true) {
                await lookstartwz()
                await $.wait(1000);
            } else {
                console.log(`--------第 ${k + 1} 次看看赚文章已执行成功【cache】--------\n`)
            }
            console.log("\n\n")
        }
        console.log(`共${zq_cookieArr.length}个cookie`)
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

//获取看看赚文章激活body
async function getzplookwzbody () {
    if ($request.url.match(/\/kandian.wkandian.com\/v5\/nameless\/bannerstatus/)) {
        bodyVal = $request.body
        await $.wait(1100);
        if (zplookwzbody) {
            if (zplookwzbody.indexOf(bodyVal) > -1) {
                $.log("此看看赚任务文章请求已存在，本次跳过")
            } else if (zplookwzbody.indexOf(bodyVal) == -1) {
                zplookwzbodys = zplookwzbody + "&" + bodyVal;
                $.setdata(zplookwzbodys, 'zplookwzbody');
                $.log(`${$.name}获取看看赚文章任务: 成功, zplookwzbodys: ${bodyVal}`);
                bodys = zplookwzbodys.split("&")
                $.msg($.name, "获取第" + bodys.length + "个看看赚文章任务请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'zplookwzbody');
            $.log(`${$.name}获取看看赚文章任务: 成功, zplookwzbodys: ${bodyVal}`);
            $.msg($.name, `获取第一个看看赚任务文章请求: 成功🎉`, ``)
        }
    }

}

//看看赚文章阅读
function lookstartwz (timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: 'https://kandian.wkandian.com/v5/nameless/bannerstatus.json',
            headers: lookheader,
            body: zplookwzbody1,
        }//xsgbody,}

        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.success === true) {
                    console.log('\n浏览看看赚文章成功')
                } else {
                    console.log('\n浏览看看赚文章失败')
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}


function Env (t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send (t, e = "GET") {
            t = "string" == typeof t ? { url: t } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get (t) {
            return this.send.call(this.env, t)
        }

        post (t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }

        isNode () {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX () {
            return "undefined" != typeof $task
        }

        isSurge () {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon () {
            return "undefined" != typeof $loon
        }

        toObj (t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr (t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson (t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson (t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript (t) {
            return new Promise(e => {
                this.get({ url: t }, (t, s, i) => e(i))
            })
        }

        runScript (t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: { script_text: t, mock_type: "cron", timeout: r },
                    headers: { "X-Key": o, Accept: "*/*" }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata () {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata () {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get (t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set (t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata (t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata (t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval (t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval (t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv (t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get (t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => {
                const { message: s, response: i } = t;
                e(s, i, i && i.body)
            }))
        }

        post (t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const { url: s, ...i } = t;
                this.got.post(s, i).then(t => {
                    const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                    e(null, { status: s, statusCode: i, headers: r, body: o }, o)
                }, t => {
                    const { message: s, response: i } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time (t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }

        msg (e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return { openUrl: e, mediaUrl: s }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return { "open-url": e, "media-url": s }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return { url: e }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }

        log (...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr (t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }

        wait (t) {
            return new Promise(e => setTimeout(e, t))
        }

        done (t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}