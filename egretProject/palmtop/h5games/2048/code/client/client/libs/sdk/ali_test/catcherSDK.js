! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ALISDK = t() : e.ALISDK = t()
}(window, function() {
    return function(e) {
        var t = {};

        function r(n) {
            if (t[n]) return t[n].exports;
            var o = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
        }
        return r.m = e, r.c = t, r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: n
            })
        }, r.r = function(e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return r.d(t, "a", t), t
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, r.p = "", r(r.s = 0)
    }([function(e, t, r) {
        "use strict";
        var n, o, s, i, a, c = this && this.__assign || Object.assign || function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        };
        Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            function(e) {
                e[e.inited = 0] = "inited", e[e.Connecting = 1] = "Connecting", e[e.Connected = 2] = "Connected", e[e.Ready = 3] = "Ready", e[e.Break = 4] = "Break", e[e.Reconnected = 5] = "Reconnected", e[e.GameOver = 6] = "GameOver"
            }(n || (n = {})),
            function(e) {
                e[e.Admin = 48] = "Admin", e[e.SDKCmd = 49] = "SDKCmd", e[e.Forward = 50] = "Forward"
            }(o || (o = {})),
            function(e) {
                e[e.Login = 48] = "Login", e[e.Reconnect = 49] = "Reconnect", e[e.Logout = 50] = "Logout", e[e.Progress = 54] = "Progress"
            }(s || (s = {})),
            function(e) {
                e[e.Kick = 51] = "Kick", e[e.GameOver = 52] = "GameOver", e[e.Ready = 53] = "Ready", e[e.PlayerProgress = 55] = "PlayerProgress"
            }(i || (i = {})),
            function(e) {
                e[e.CONNECTED = 0] = "CONNECTED", e[e.PROGRESSING = 1] = "PROGRESSING", e[e.INITIALIZING = 2] = "INITIALIZING", e[e.COMPLETED = 3] = "COMPLETED", e[e.WAITING = 4] = "WAITING"
            }(a = t.ProgressState || (t.ProgressState = {}));
        var u = function() {
                function e() {
                    this.rtt = 0, this.cbMap = {}, this.rpcId = Math.floor(1e6 * Math.random())
                }
                return e.prototype.newRpc = function(e) {
                    var t = this.rpcId;
                    return this.cbMap[t] = [e, new Date], this.rpcId++, t
                }, e.prototype.atRpc = function(e, t) {
                    var r = this.cbMap[e];
                    if (delete this.cbMap[e], r) {
                        var n = (r[1].valueOf() - (new Date).valueOf()) / 2;
                        return this.rtt = (this.rtt + n) / 2, r[0](t)
                    }
                }, Object.defineProperty(e.prototype, "rpcRTT", {
                    get: function() {
                        return this.rtt
                    },
                    enumerable: !0,
                    configurable: !0
                }), e
            }(),
            f = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                console.debug.apply(console, e)
            },
            d = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                console.error.apply(console, e)
            },
            h = function() {
                function e(e) {
                    this.packageCounter = 0, this.status = n.inited;
                    var t = {
                        messageType: "JSON",
                        accountToken: this.bigRandom(),
                        matchTicket: "",
                        sdkVersion: "",
                        isSuper: !1
                    };
                    this.cfg = c({}, t, e), this.retryTimes = 0, this.handlers = {}, this.rpcHandler = new u
                }
                return e.instance = function() {
                    if (!this._instance) throw "Catcher SDK not initialized!";
                    return this._instance
                }, e.init = function(e) {
                    if (this._instance) throw "Catcher SDK initialized!";
                    return this._instance = new this(e), this._instance
                }, e.prototype.start = function() {
                    var e = this;
                    this.wsc = new WebSocket(this.cfg.url), this.wsc.binaryType = "arraybuffer", this.wsc.addEventListener("close", function(t) {
                        return e.onClose(t)
                    }), this.wsc.addEventListener("message", function(t) {
                        return e.onMessage(t)
                    }), this.wsc.addEventListener("error", function(t) {
                        return e.onError()
                    }), this.wsc.addEventListener("open", function(t) {
                        return e.onOpen(t)
                    }), this.status = n.Connecting
                }, e.prototype.end = function() {
                    var e = this;
                    return this.status === n.Ready ? (this.status = n.GameOver, this.logout().then(function() {
                        e.wsc && e.wsc.readyState === WebSocket.CONNECTING && e.wsc.close()
                    })) : Promise.resolve()
                }, e.prototype.on = function(e, t) {
                    return this.handlers[e] = t, this
                }, e.prototype.sendJson = function(e) {
                    var t = "2" + JSON.stringify(e);
                    this._send(t)
                }, e.prototype.sendData = function(e) {
                    if (e instanceof ArrayBuffer) {console.log('aaaaaaaaaaaaaa'); this._send(this.buildPackage(e));}
                    else if (this.isArrayBufferView(e)){console.log('bbbbbbbbbbbbb'); this._send(this.buildPackage(e.buffer));}
                    else if ("string" == typeof e) {console.log('cccccccccccccc'); e = String.fromCharCode(o.Forward) + e; this._send(e);}
                    else {
                        console.log('ddddddddddddddd');
                        var t = JSON.stringify(e);
                        t = String.fromCharCode(o.Forward) + t, this._send(t)
                    }
                }, Object.defineProperty(e.prototype, "serverTimeDiff", {
                    get: function() {
                        return this.timeDiff - this.rpcHandler.rpcRTT
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "gameInfo", {
                    get: function() {
                        return this._gameInfo
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.updateProgress = function(e, t) {
                    if (this._gameInfo) {
                        var r = {
                            openId: this._gameInfo.userInfo.openId,
                            rate: t,
                            state: e
                        };
                        f("updateProgress", r), this.cmdRPC(s.Progress, r, function(e) {
                            return e
                        })
                    } else this.gameProgress = {
                        rate: t,
                        state: e
                    }
                }, e.prototype.onClose = function(e) {
                    this.status !== n.GameOver && (d("connection closed! " + e.code + "/" + e.reason), this.onError())
                }, e.prototype.onMessage = function(e) {
                    var t = e.data;
                    t instanceof ArrayBuffer ? this.onArrayBufferMessage(t) : "string" == typeof t ? this.onTextMessage(t) : d("not support data type: " + t)
                }, e.prototype.onArrayBufferMessage = function(e) {
                    try {
                        if (new Uint8Array(e)[0] == o.Forward) {
                            this.packageCounter++;
                            var t = e.slice(1);
                            return void this.emit("MESSAGE", {
                                data: t
                            })
                        }
                    } catch (e) {
                        d(e)
                    }
                }, e.prototype.onTextMessage = function(e) {
                    try {
                        var t = e.charCodeAt(0);
                        if (t == o.SDKCmd) {
                            var r = e.charCodeAt(1),
                                s = JSON.parse(e.slice(2));
                            return void this.processCommand(r, s)
                        }
                        if (t == o.Forward) {
                            if (this.status !== n.Ready) throw "处于非 Ready 状态时接受到 Forward 指令";
                            this.packageCounter++;
                            s = e.slice(1);
                            return "JSON" === this.cfg.messageType && (s = JSON.parse(s)), void this.emit("MESSAGE", {
                                data: s
                            })
                        }
                    } catch (e) {
                        d(e)
                    }
                }, e.prototype.onError = function() {
                    if (this.status !== n.GameOver) {
                        if (this.retryTimes >= 3) return this.emit("ERROR", {
                            code: -1
                        }), void(this.status = n.GameOver);
                        switch (this.retryTimes++, this.status) {
                            case n.Connecting:
                                f("connecting failed!");
                                break;
                            case n.Connected:
                                f("connection losed!"), this.status = n.Connecting;
                                break;
                            case n.Ready:
                                f("game connection losed!"), this.status = n.Break, this.emit("BREAK", {});
                                break;
                            case n.Break:
                                f("break connecting losed!");
                                break;
                            case n.Reconnected:
                                f("break connection losed!"), this.status = n.Break;
                                break;
                            default:
                                d("onError: never reach!")
                        }
                        this.wsc.readyState === WebSocket.CONNECTING && this.wsc.close(), this.wsc = new WebSocket(this.cfg.url)
                    }
                }, e.prototype.onOpen = function(e) {
                    switch (this.retryTimes = 0, this.status) {
                        case n.Connecting:
                            f("websocket connected!"), this.status = n.Connected, this.connnect();
                            break;
                        case n.Break:
                            f("websocket connected on break!"), this.status = n.Reconnected, this.reconnect();
                            break;
                        default:
                            d("onOpen: never reach!")
                    }
                }, e.prototype.emit = function(e, t) {
                    var r = this.handlers[e];
                    if (r) try {
                        r(t)
                    } catch (e) {
                        d(e)
                    }
                }, e.prototype.connnect = function() {
                    var e = this,
                        t = {
                            token: this.cfg.accountToken,
                            game_version: this.cfg.gameVersion,
                            sdk_version: this.cfg.sdkVersion,
                            is_super: this.cfg.isSuper
                        };
                    this.cmdRPC(s.Login, t, function(t) {
                        0 === t.code ? (e.gameToken = t.token, e._gameInfo = t.match_info, e.gameProgress && (e.updateProgress(e.gameProgress.state, e.gameProgress.rate), e.gameProgress = void 0), e.emit("CONNECT", e._gameInfo)) : (d("on protocl erorr: " + t.code + "/" + JSON.stringify(t)), e.onError())
                    })
                }, e.prototype.reconnect = function() {
                    var e = this,
                        t = {
                            token: this.gameToken,
                            recvnumber: this.packageCounter,
                            game_version: this.cfg.gameVersion,
                            sdk_version: this.cfg
                        };
                    this.cmdRPC(s.Reconnect, t, function(t) {
                        0 === t.code ? (e.status = n.Ready, e.emit("CONTINUE", e._gameInfo)) : (d("on protocl erorr: " + t.code + "/" + JSON.stringify(t)), e.onError())
                    })
                }, e.prototype.logout = function() {
                    var e = this,
                        t = {};
                    return f("logout start"), new Promise(function(r, n) {
                        e.cmdRPC(s.Logout, t, function() {
                            f("logout succ"), r()
                        })
                    })
                }, e.prototype.cmdRPC = function(e, t, r) {
                    var n = this.rpcHandler.newRpc(r);
                    t.msgId = n;
                    var o = "1" + String.fromCharCode(e) + JSON.stringify(t);
                    this._send(o)
                }, e.prototype.cmdResp = function(e, t, r) {
                    var n = {
                            code: t,
                            msgId: r.msgId
                        },
                        o = "1" + String.fromCharCode(e) + JSON.stringify(n);
                    this._send(o)
                }, e.prototype.processCommand = function(e, t) {
                    t.timestamp && this.updateTimeDiff(t.timestamp);
                    try {
                        switch (e) {
                            case i.GameOver:
                                this.emit("GAMEOVER", {
                                    code: 0,
                                    groupResult: t.groupResult
                                }), this.cmdResp(i.GameOver, 0, t), this.status = n.GameOver, this.wsc.close();
                                break;
                            case i.Kick:
                                this.emit("KICK", {
                                    code: 0,
                                    reason: "from server"
                                }), this.cmdResp(i.Kick, 0, t), this.status = n.GameOver, this.wsc.close();
                                break;
                            case i.Ready:
                                if (this.status !== n.Connected) throw "在非 Connected 状态受到 Ready 指令";
                                this.emit("READY", {
                                    code: 0,
                                    reason: "from server"
                                }), this.status = n.Ready;
                                break;
                            case i.PlayerProgress:
                                if (this.status !== n.Connected) throw "在非 Connected 状态受到 Progress 指令";
                                this.emit("PROGRESS", {
                                    openId: t.openId,
                                    rate: t.rate,
                                    state: t.state
                                });
                                break;
                            case s.Login:
                            case s.Logout:
                            case s.Reconnect:
                                f("Server Response: ", t);
                                var r = t.msgId;
                                r && this.rpcHandler.atRpc(r, t);
                                break;
                            default:
                                throw "Unknown Command " + e
                        }
                    } catch (e) {
                        d(e)
                    }
                }, e.prototype.bigRandom = function() {
                    for (var e = [], t = 0; t < 4; t++) {
                        var r = Math.floor(1e4 * Math.random());
                        e.push(r.toString())
                    }
                    return e.join("-")
                }, e.prototype.updateTimeDiff = function(e) {
                    var t = ((new Date).valueOf() - e) / 2;
                    this.timeDiff ? this.timeDiff = (this.timeDiff + t) / 2 : this.timeDiff = t
                }, e.prototype._send = function(e) {
                    try {
                        this.wsc.send(e)
                    } catch (e) {
                        d("send error", e)
                    }
                }, e.prototype.isArrayBufferView = function(e) {
                    return e && e.buffer instanceof ArrayBuffer && void 0 !== e.byteLength
                }, e.prototype.buildPackage = function(e) {
                    var t = new Uint8Array(e.byteLength + 1);
                    return t[0] = o.Forward, t.set(new Uint8Array(e), 1), t
                }, e.ProgressState = a, e
            }();
        t.CatcherSDK = h
    }])
});