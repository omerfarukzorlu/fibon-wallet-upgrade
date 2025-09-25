import { Des } from "data-crypto"
import { Buffer } from "buffer"
let CryptoJS = require("crypto-js")
import NfcManager, { NfcTech } from "react-native-nfc-manager"
import { Platform } from "react-native"
import { useEffect, useState } from "react"
import crypto from "crypto-js"
let xor = require("buffer-xor")
var bigInt = require("big-integer")

    //MATH FUNCS
    ; (function (_0x4b9cea, _0x45812f) {
        const _0x457fe2 = _0x2f5b,
            _0x55726a = _0x4b9cea()
        while (!![]) {
            try {
                const _0x1dd5d8 =
                    -parseInt(_0x457fe2(0x1e3)) / 0x1 +
                    -parseInt(_0x457fe2(0x1e5)) / 0x2 +
                    parseInt(_0x457fe2(0x1e1)) / 0x3 +
                    (parseInt(_0x457fe2(0x1e7)) / 0x4) *
                    (-parseInt(_0x457fe2(0x1ec)) / 0x5) +
                    (-parseInt(_0x457fe2(0x1e8)) / 0x6) *
                    (parseInt(_0x457fe2(0x1e4)) / 0x7) +
                    (-parseInt(_0x457fe2(0x1e6)) / 0x8) *
                    (-parseInt(_0x457fe2(0x1e9)) / 0x9) +
                    parseInt(_0x457fe2(0x1ed)) / 0xa
                if (_0x1dd5d8 === _0x45812f) break
                else _0x55726a["push"](_0x55726a["shift"]())
            } catch (_0x204818) {
                _0x55726a["push"](_0x55726a["shift"]())
            }
        }
    })(_0x3299, 0xc5451)
function _0x3299() {
    const _0x586dcf = [
        "899016TePjUM",
        "length",
        "80466BnGWgy",
        "597275xYSACc",
        "246284LEfWxk",
        "8pwokqj",
        "28Ejfkui",
        "102WgIzgH",
        "7711749GOrNSc",
        "toString",
        "fromCharCode",
        "66360rDVjrv",
        "13985210jMhExJ",
    ]
    _0x3299 = function () {
        return _0x586dcf
    }
    return _0x3299()
}
function _0x2f5b(_0x180e3e, _0x546c6b) {
    const _0x32990c = _0x3299()
    return (
        (_0x2f5b = function (_0x2f5b06, _0x4a635b) {
            _0x2f5b06 = _0x2f5b06 - 0x1e1
            let _0x30c826 = _0x32990c[_0x2f5b06]
            return _0x30c826
        }),
        _0x2f5b(_0x180e3e, _0x546c6b)
    )
}
function hex_to_ascii(_0x5b0b38) {
    const _0x7c3d4 = _0x2f5b
    let _0x510ae3 = _0x5b0b38[_0x7c3d4(0x1ea)](),
        _0x13da26 = ""
    for (
        var _0xf7b517 = 0x0;
        _0xf7b517 < _0x510ae3[_0x7c3d4(0x1e2)];
        _0xf7b517 += 0x2
    ) {
        _0x13da26 += String[_0x7c3d4(0x1eb)](
            parseInt(_0x510ae3["substr"](_0xf7b517, 0x2), 0x10)
        )
    }
    return _0x13da26
}
function _0x59bd() {
    var _0x3fb66d = [
        "4653fxFAaR",
        "push",
        "length",
        "3097SGqsqz",
        "630651TGMvvA",
        "49AmloPc",
        "43590SYJDpF",
        "160PgxHHc",
        "398100mcXmnL",
        "1410RJourQ",
        "484qzWDXG",
        "664DNoOST",
        "961384suoeBu",
    ]
    _0x59bd = function () {
        return _0x3fb66d
    }
    return _0x59bd()
}
function _0x319b(_0x1bdef4, _0x36ed56) {
    var _0x59bd5b = _0x59bd()
    return (
        (_0x319b = function (_0x319bd7, _0x4d3026) {
            _0x319bd7 = _0x319bd7 - 0x135
            var _0x11c6c2 = _0x59bd5b[_0x319bd7]
            return _0x11c6c2
        }),
        _0x319b(_0x1bdef4, _0x36ed56)
    )
}
; (function (_0x5731a7, _0x5bf9ef) {
    var _0x2198ca = _0x319b,
        _0x17486b = _0x5731a7()
    while (!![]) {
        try {
            var _0x419acc =
                (parseInt(_0x2198ca(0x13f)) / 0x1) *
                (parseInt(_0x2198ca(0x136)) / 0x2) +
                parseInt(_0x2198ca(0x140)) / 0x3 +
                -parseInt(_0x2198ca(0x13b)) / 0x4 +
                -parseInt(_0x2198ca(0x137)) / 0x5 +
                (parseInt(_0x2198ca(0x135)) / 0x6) *
                (-parseInt(_0x2198ca(0x141)) / 0x7) +
                (-parseInt(_0x2198ca(0x13a)) / 0x8) *
                (-parseInt(_0x2198ca(0x13c)) / 0x9) +
                (-parseInt(_0x2198ca(0x138)) / 0xa) *
                (-parseInt(_0x2198ca(0x139)) / 0xb)
            if (_0x419acc === _0x5bf9ef) break
            else _0x17486b["push"](_0x17486b["shift"]())
        } catch (_0x206486) {
            _0x17486b["push"](_0x17486b["shift"]())
        }
    }
})(_0x59bd, 0x2144f)
function hexToBytes(_0x36f127) {
    var _0x31cb00 = _0x319b
    for (
        var _0x5923ab = [], _0x5009ff = 0x0;
        _0x5009ff < _0x36f127[_0x31cb00(0x13e)];
        _0x5009ff += 0x2
    )
        _0x5923ab[_0x31cb00(0x13d)](
            parseInt(_0x36f127["substr"](_0x5009ff, 0x2), 0x10)
        )
    return _0x5923ab
}
function _0xeaef(_0x28dac7, _0x50e808) {
    var _0x591bed = _0x591b()
    return (
        (_0xeaef = function (_0xeaefbd, _0x23c8e8) {
            _0xeaefbd = _0xeaefbd - 0x177
            var _0x52c9d5 = _0x591bed[_0xeaefbd]
            return _0x52c9d5
        }),
        _0xeaef(_0x28dac7, _0x50e808)
    )
}
; (function (_0x2c0be6, _0x4641c6) {
    var _0x598b7c = _0xeaef,
        _0x5b6b8e = _0x2c0be6()
    while (!![]) {
        try {
            var _0x36e6a0 =
                (parseInt(_0x598b7c(0x179)) / 0x1) *
                (parseInt(_0x598b7c(0x185)) / 0x2) +
                parseInt(_0x598b7c(0x184)) / 0x3 +
                (parseInt(_0x598b7c(0x177)) / 0x4) *
                (-parseInt(_0x598b7c(0x17e)) / 0x5) +
                (parseInt(_0x598b7c(0x180)) / 0x6) *
                (-parseInt(_0x598b7c(0x178)) / 0x7) +
                (parseInt(_0x598b7c(0x17a)) / 0x8) *
                (-parseInt(_0x598b7c(0x17b)) / 0x9) +
                (-parseInt(_0x598b7c(0x17c)) / 0xa) *
                (parseInt(_0x598b7c(0x17f)) / 0xb) +
                (parseInt(_0x598b7c(0x17d)) / 0xc) * (parseInt(_0x598b7c(0x181)) / 0xd)
            if (_0x36e6a0 === _0x4641c6) break
            else _0x5b6b8e["push"](_0x5b6b8e["shift"]())
        } catch (_0x3a7ef4) {
            _0x5b6b8e["push"](_0x5b6b8e["shift"]())
        }
    }
})(_0x591b, 0x1998c)
function toHexString(_0x58aff5) {
    var _0x2d017a = _0xeaef
    return Array[_0x2d017a(0x182)](_0x58aff5, function (_0x3f9c65) {
        return ("0" + (_0x3f9c65 & 0xff)["toString"](0x10))["slice"](-0x2)
    })[_0x2d017a(0x183)]("")
}
function _0x591b() {
    var _0x488fe0 = [
        "5262bWBXAZ",
        "2657616wLEZuN",
        "from",
        "join",
        "597420qyJinU",
        "62ExDqaO",
        "24tlKJmb",
        "1001QiqcKp",
        "751VodMYp",
        "168uPlcpS",
        "63837BwOrFQ",
        "10LiwLeH",
        "24QFhdqA",
        "79665FTuttq",
        "1721269FfTCSe",
    ]
    _0x591b = function () {
        return _0x488fe0
    }
    return _0x591b()
}
; (function (_0x57396d, _0x908dcf) {
    var _0x48075f = _0x4194,
        _0x3a8ce6 = _0x57396d()
    while (!![]) {
        try {
            var _0x279137 =
                (parseInt(_0x48075f(0x96)) / 0x1) * (parseInt(_0x48075f(0x8d)) / 0x2) +
                (-parseInt(_0x48075f(0x99)) / 0x3) *
                (-parseInt(_0x48075f(0x9e)) / 0x4) +
                (-parseInt(_0x48075f(0x97)) / 0x5) * (parseInt(_0x48075f(0x8e)) / 0x6) +
                -parseInt(_0x48075f(0x90)) / 0x7 +
                (-parseInt(_0x48075f(0x9c)) / 0x8) * (parseInt(_0x48075f(0x9a)) / 0x9) +
                (-parseInt(_0x48075f(0x91)) / 0xa) * (parseInt(_0x48075f(0x9b)) / 0xb) +
                parseInt(_0x48075f(0x98)) / 0xc
            if (_0x279137 === _0x908dcf) break
            else _0x3a8ce6["push"](_0x3a8ce6["shift"]())
        } catch (_0x29e90f) {
            _0x3a8ce6["push"](_0x3a8ce6["shift"]())
        }
    }
})(_0x145c, 0x4c8e4)
function _0x145c() {
    var _0x1f0edf = [
        "25887ncMuFl",
        "279tlPCMA",
        "94171vbquEx",
        "14744RzMQlg",
        "unshift",
        "200iHWwHt",
        "136060kcnfwV",
        "2532BsQAmJ",
        "split",
        "84805aitmTJ",
        "690wWFcRD",
        "map",
        "length",
        "pop",
        "forEach",
        "5JJMCve",
        "2360QQuLSg",
        "4813356VJBhTN",
    ]
    _0x145c = function () {
        return _0x1f0edf
    }
    return _0x145c()
}
function _0x4194(_0x23b792, _0x373a8f) {
    var _0x145ca5 = _0x145c()
    return (
        (_0x4194 = function (_0x419425, _0x3773f2) {
            _0x419425 = _0x419425 - 0x8d
            var _0x524262 = _0x145ca5[_0x419425]
            return _0x524262
        }),
        _0x4194(_0x23b792, _0x373a8f)
    )
}
function hex2decimal(_0xd175f3) {
    var _0x10b44e = _0x4194
    function _0xd60ef6(_0x512bab, _0x5b51f8) {
        var _0x2680c1 = _0x4194,
            _0x219fcd = 0x0,
            _0xf82853 = [],
            _0x512bab = _0x512bab[_0x2680c1(0x8f)]("")[_0x2680c1(0x92)](Number),
            _0x5b51f8 = _0x5b51f8[_0x2680c1(0x8f)]("")["map"](Number)
        while (_0x512bab[_0x2680c1(0x93)] || _0x5b51f8["length"]) {
            var _0x32f14e =
                (_0x512bab[_0x2680c1(0x94)]() || 0x0) +
                (_0x5b51f8["pop"]() || 0x0) +
                _0x219fcd
            _0xf82853[_0x2680c1(0x9d)](_0x32f14e < 0xa ? _0x32f14e : _0x32f14e - 0xa),
                (_0x219fcd = _0x32f14e < 0xa ? 0x0 : 0x1)
        }
        if (_0x219fcd) _0xf82853[_0x2680c1(0x9d)](_0x219fcd)
        return _0xf82853["join"]("")
    }
    var _0x109036 = "0"
    return (
        _0xd175f3[_0x10b44e(0x8f)]("")[_0x10b44e(0x95)](function (_0x3f5a11) {
            var _0x3bac02 = parseInt(_0x3f5a11, 0x10)
            for (var _0x5e8d95 = 0x8; _0x5e8d95; _0x5e8d95 >>= 0x1) {
                _0x109036 = _0xd60ef6(_0x109036, _0x109036)
                if (_0x3bac02 & _0x5e8d95) _0x109036 = _0xd60ef6(_0x109036, "1")
            }
        }),
        _0x109036
    )
}
; (function (_0x3bd072, _0x15c463) {
    const _0x2a2f18 = _0x36f4,
        _0x1400c3 = _0x3bd072()
    while (!![]) {
        try {
            const _0x2f56f0 =
                (-parseInt(_0x2a2f18(0x186)) / 0x1) *
                (-parseInt(_0x2a2f18(0x17f)) / 0x2) +
                (parseInt(_0x2a2f18(0x17a)) / 0x3) *
                (parseInt(_0x2a2f18(0x184)) / 0x4) +
                (parseInt(_0x2a2f18(0x17d)) / 0x5) *
                (-parseInt(_0x2a2f18(0x181)) / 0x6) +
                parseInt(_0x2a2f18(0x179)) / 0x7 +
                parseInt(_0x2a2f18(0x17e)) / 0x8 +
                parseInt(_0x2a2f18(0x183)) / 0x9 +
                (-parseInt(_0x2a2f18(0x180)) / 0xa) * (parseInt(_0x2a2f18(0x17c)) / 0xb)
            if (_0x2f56f0 === _0x15c463) break
            else _0x1400c3["push"](_0x1400c3["shift"]())
        } catch (_0x481685) {
            _0x1400c3["push"](_0x1400c3["shift"]())
        }
    }
})(_0x3897, 0x68ecb)
function _0x36f4(_0x4559ce, _0x582e6a) {
    const _0x389738 = _0x3897()
    return (
        (_0x36f4 = function (_0x36f4e4, _0x3cfd08) {
            _0x36f4e4 = _0x36f4e4 - 0x179
            let _0x554f44 = _0x389738[_0x36f4e4]
            return _0x554f44
        }),
        _0x36f4(_0x4559ce, _0x582e6a)
    )
}
function padtofourdigit(_0x1808fb) {
    const _0x53d95a = _0x36f4,
        _0x5ef48a = _0x1808fb[_0x53d95a(0x17b)](0x10),
        _0x163463 = "0"
        ["repeat"](0x4 - _0x5ef48a[_0x53d95a(0x182)])
        [_0x53d95a(0x185)](_0x5ef48a)
    return _0x163463
}
function _0x3897() {
    const _0x31cdeb = [
        "3376212DKNMrm",
        "213MofeEK",
        "toString",
        "11OeLFUn",
        "5MoIzwo",
        "6648200JKNsMz",
        "14wqSoKd",
        "10901290ODDXnl",
        "4877046WNnNiP",
        "length",
        "2176002ekoZCq",
        "41212EPLsHo",
        "concat",
        "6587kthQFr",
    ]
    _0x3897 = function () {
        return _0x31cdeb
    }
    return _0x3897()
}
function _0x1d5a(_0x547c74, _0x2d5e51) {
    var _0x170f7f = _0x170f()
    return (
        (_0x1d5a = function (_0x1d5af1, _0x22b7f0) {
            _0x1d5af1 = _0x1d5af1 - 0x1cb
            var _0x270780 = _0x170f7f[_0x1d5af1]
            return _0x270780
        }),
        _0x1d5a(_0x547c74, _0x2d5e51)
    )
}
function _0x170f() {
    var _0x33156d = [
        "hex",
        "16FXOjBw",
        "log",
        "57360CIioug",
        "substring",
        "8EqHUIO",
        "decrypt",
        "length",
        "6352790IVTUfd",
        "concat",
        "740995CcDkpO",
        "encrypt",
        "Error,\x20key\x20length\x20should\x20be\x2016",
        "760389fLlwOh",
        "72819qtwXjs",
        "8CRZNSo",
        "40712pLLfOp",
        "0000000000000000",
        "638517ULIquj",
        "repeat",
    ]
    _0x170f = function () {
        return _0x33156d
    }
    return _0x170f()
}
; (function (_0x1c4a57, _0x3e11dd) {
    var _0x3e3748 = _0x1d5a,
        _0x30c0c9 = _0x1c4a57()
    while (!![]) {
        try {
            var _0x4a4844 =
                (parseInt(_0x3e3748(0x1d6)) / 0x1) *
                (parseInt(_0x3e3748(0x1cb)) / 0x2) +
                (-parseInt(_0x3e3748(0x1d8)) / 0x3) *
                (-parseInt(_0x3e3748(0x1d5)) / 0x4) +
                parseInt(_0x3e3748(0x1d0)) / 0x5 +
                -parseInt(_0x3e3748(0x1dd)) / 0x6 +
                (parseInt(_0x3e3748(0x1d3)) / 0x7) *
                (parseInt(_0x3e3748(0x1db)) / 0x8) +
                parseInt(_0x3e3748(0x1d4)) / 0x9 +
                -parseInt(_0x3e3748(0x1ce)) / 0xa
            if (_0x4a4844 === _0x3e11dd) break
            else _0x30c0c9["push"](_0x30c0c9["shift"]())
        } catch (_0x134f69) {
            _0x30c0c9["push"](_0x30c0c9["shift"]())
        }
    }
})(_0x170f, 0x4d72f)
function macIso9797_alg3(_0x3b4ec6, _0x18f45a, _0x43df6f) {
    var _0x115551 = _0x1d5a
    const _0x539530 = _0x3b4ec6[_0x115551(0x1cd)] / 0x2
    let _0x54f5d4 = _0x3b4ec6["substring"](0x0, 0x10),
        _0x3cc91f = _0x3b4ec6[_0x115551(0x1de)](0x10, 0x20)
    if (_0x539530 != 0x10)
        return console[_0x115551(0x1dc)](_0x115551(0x1d2)), null
    else {
        _0x18f45a = _0x18f45a[_0x115551(0x1cf)](_0x43df6f)
        const _0x355061 = (_0x18f45a[_0x115551(0x1cd)] / 0x2) % 0x8
        _0x18f45a = _0x18f45a[_0x115551(0x1cf)](
            "00"[_0x115551(0x1d9)](0x8 - _0x355061)
        )
        const _0x28db44 = _0x18f45a[_0x115551(0x1cd)] / 0x2 / 0x8
        var _0xd5db7d = _0x115551(0x1d7)
        for (var _0x55de78 = 0x0; _0x55de78 < _0x28db44; _0x55de78++) {
            const _0xfb3c2b = _0x18f45a[_0x115551(0x1de)](
                _0x55de78 * 0x10,
                _0x55de78 * 0x10 + 0x10
            )
            var _0x2cc00e = new Buffer(_0xfb3c2b, _0x115551(0x1da)),
                _0x2d928a = new Buffer(_0xd5db7d, "hex")
            _0xd5db7d = xor(_0x2cc00e, _0x2d928a)
            var _0x4ad284 = toHexString(_0xd5db7d)
            _0xd5db7d = Des[_0x115551(0x1d1)](_0x4ad284, _0x54f5d4)
        }
        return (
            (_0xd5db7d = Des[_0x115551(0x1cc)](_0xd5db7d, _0x3cc91f)),
            (_0xd5db7d = Des[_0x115551(0x1d1)](_0xd5db7d, _0x54f5d4)),
            _0xd5db7d
        )
    }
}
function _0x515a(_0x51a752, _0x580df) {
    var _0x3c8eeb = _0x3c8e()
    return (
        (_0x515a = function (_0x515a02, _0x3bb49b) {
            _0x515a02 = _0x515a02 - 0x1bb
            var _0x402954 = _0x3c8eeb[_0x515a02]
            return _0x402954
        }),
        _0x515a(_0x51a752, _0x580df)
    )
}
; (function (_0x3b9270, _0x5794ea) {
    var _0x3fe582 = _0x515a,
        _0x41b407 = _0x3b9270()
    while (!![]) {
        try {
            var _0x2ff2d2 =
                (parseInt(_0x3fe582(0x1c1)) / 0x1) *
                (parseInt(_0x3fe582(0x1c0)) / 0x2) +
                parseInt(_0x3fe582(0x1be)) / 0x3 +
                -parseInt(_0x3fe582(0x1c9)) / 0x4 +
                (parseInt(_0x3fe582(0x1cb)) / 0x5) *
                (parseInt(_0x3fe582(0x1cc)) / 0x6) +
                (-parseInt(_0x3fe582(0x1c3)) / 0x7) *
                (-parseInt(_0x3fe582(0x1c7)) / 0x8) +
                -parseInt(_0x3fe582(0x1bc)) / 0x9 +
                (-parseInt(_0x3fe582(0x1bf)) / 0xa) * (parseInt(_0x3fe582(0x1bd)) / 0xb)
            if (_0x2ff2d2 === _0x5794ea) break
            else _0x41b407["push"](_0x41b407["shift"]())
        } catch (_0x28c2fc) {
            _0x41b407["push"](_0x41b407["shift"]())
        }
    }
})(_0x3c8e, 0x64020)
function get_ENC_MAC(_0x5341e2) {
    var _0x3291ac = _0x515a,
        _0x470724 = _0x5341e2[_0x3291ac(0x1c4)](_0x3291ac(0x1cf)),
        _0x566536 = CryptoJS[_0x3291ac(0x1c2)](
            CryptoJS[_0x3291ac(0x1bb)]["Hex"]["parse"](_0x470724)
        )[_0x3291ac(0x1ca)](CryptoJS[_0x3291ac(0x1bb)][_0x3291ac(0x1c6)])
    _0x566536 = _0x566536[_0x3291ac(0x1c5)]()
    var _0x1632e6 = _0x566536[_0x3291ac(0x1ce)](0x0, 0x10),
        _0x7305e9 = _0x566536["substring"](0x10, 0x20),
        _0x52c505 = _0x1632e6[_0x3291ac(0x1c4)](_0x7305e9),
        _0x1f0317 = _0x5341e2["concat"](_0x3291ac(0x1c8)),
        _0x3a86b5 = CryptoJS[_0x3291ac(0x1c2)](
            CryptoJS[_0x3291ac(0x1bb)]["Hex"][_0x3291ac(0x1cd)](_0x1f0317)
        )[_0x3291ac(0x1ca)](CryptoJS[_0x3291ac(0x1bb)][_0x3291ac(0x1c6)])
    _0x3a86b5 = _0x3a86b5["toUpperCase"]()
    var _0x3a5817 = _0x3a86b5[_0x3291ac(0x1ce)](0x0, 0x10),
        _0x440063 = _0x3a86b5[_0x3291ac(0x1ce)](0x10, 0x20),
        _0x4efea4 = _0x3a5817[_0x3291ac(0x1c4)](_0x440063)
    return { k_enc: _0x52c505, k_mac: _0x4efea4 }
}
function _0x3c8e() {
    var _0x50963a = [
        "7EPUtqX",
        "concat",
        "toUpperCase",
        "Hex",
        "3710104dHtQRb",
        "00000002",
        "1790612coSxFf",
        "toString",
        "73735mctwsv",
        "306hCXKfV",
        "parse",
        "substring",
        "00000001",
        "enc",
        "3642552MpKXbh",
        "291335KjtUJy",
        "1469634ZUpGSn",
        "460VWIQlY",
        "210arsMER",
        "7377NVJUzt",
        "SHA1",
    ]
    _0x3c8e = function () {
        return _0x50963a
    }
    return _0x3c8e()
}
function _0x117d(_0x378319, _0x307ab2) {
    var _0x3ea833 = _0x3ea8()
    return (
        (_0x117d = function (_0x117d8d, _0x3d5031) {
            _0x117d8d = _0x117d8d - 0x143
            var _0x321d04 = _0x3ea833[_0x117d8d]
            return _0x321d04
        }),
        _0x117d(_0x378319, _0x307ab2)
    )
}
; (function (_0x48e1bc, _0x296a88) {
    var _0x10cbbf = _0x117d,
        _0x1210b4 = _0x48e1bc()
    while (!![]) {
        try {
            var _0x31b12d =
                (-parseInt(_0x10cbbf(0x147)) / 0x1) *
                (-parseInt(_0x10cbbf(0x14c)) / 0x2) +
                parseInt(_0x10cbbf(0x14f)) / 0x3 +
                (-parseInt(_0x10cbbf(0x144)) / 0x4) *
                (parseInt(_0x10cbbf(0x143)) / 0x5) +
                parseInt(_0x10cbbf(0x14e)) / 0x6 +
                (-parseInt(_0x10cbbf(0x14a)) / 0x7) *
                (parseInt(_0x10cbbf(0x148)) / 0x8) +
                (-parseInt(_0x10cbbf(0x146)) / 0x9) *
                (-parseInt(_0x10cbbf(0x145)) / 0xa) +
                -parseInt(_0x10cbbf(0x14d)) / 0xb
            if (_0x31b12d === _0x296a88) break
            else _0x1210b4["push"](_0x1210b4["shift"]())
        } catch (_0x2f496c) {
            _0x1210b4["push"](_0x1210b4["shift"]())
        }
    }
})(_0x3ea8, 0xdcbc5)
function _0x3ea8() {
    var _0x1d4104 = [
        "indexOf",
        "2xWgKVo",
        "36230975DTKceN",
        "8531064SKwLev",
        "5343309rCbGmr",
        "3305pUgjxP",
        "1516ZDDbZR",
        "20bABfeW",
        "3887127BMRsob",
        "1374481HmMSSe",
        "8zIRkBY",
        "length",
        "6949999QQzIgG",
    ]
    _0x3ea8 = function () {
        return _0x1d4104
    }
    return _0x3ea8()
}
function checkdigitCalc(_0x32a9ce) {
    var _0x213b53 = _0x117d,
        _0x196a7c = 0x0,
        _0xd3aca9 = 0x0,
        _0x29f677,
        _0x24f45e = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
        ]
    for (
        let _0x3b8da1 = 0x0;
        _0x3b8da1 < _0x32a9ce[_0x213b53(0x149)];
        _0x3b8da1++
    ) {
        if (_0x3b8da1 % 0x3 === 0x0) _0xd3aca9 = 0x7
        else _0x3b8da1 % 0x3 === 0x1 ? (_0xd3aca9 = 0x3) : (_0xd3aca9 = 0x1)
        isNaN(_0x32a9ce[_0x3b8da1])
            ? (_0x29f677 = _0x24f45e[_0x213b53(0x14b)](_0x32a9ce[_0x3b8da1]) + 0xa)
            : (_0x29f677 = _0x32a9ce[_0x3b8da1]),
            (_0x196a7c += parseInt(_0x29f677) * _0xd3aca9)
    }
    return (_0x196a7c = _0x196a7c % 0xa), _0x196a7c
}
function _0xaf8e(_0x406a10, _0xeaf6a2) {
    var _0xdedecd = _0xdede()
    return (
        (_0xaf8e = function (_0xaf8ed3, _0x43037c) {
            _0xaf8ed3 = _0xaf8ed3 - 0x1a5
            var _0x1877c7 = _0xdedecd[_0xaf8ed3]
            return _0x1877c7
        }),
        _0xaf8e(_0x406a10, _0xeaf6a2)
    )
}
function _0xdede() {
    var _0x569878 = [
        "6468836NpbCrq",
        "3QQVOAo",
        "NoPadding",
        "9fHFrUq",
        "CBC",
        "1573662IBtRyX",
        "483005UoRVHd",
        "10600570lMbWIf",
        "84UKCMHJ",
        "parse",
        "15913942kJKrkK",
        "2yjvYyy",
        "Hex",
        "852784CIkbJN",
        "00000000",
        "mode",
        "TripleDES",
        "8998563rkkKZL",
        "enc",
        "ciphertext",
        "toUpperCase",
    ]
    _0xdede = function () {
        return _0x569878
    }
    return _0xdede()
}
; (function (_0x5eac4b, _0x541a3f) {
    var _0x1d9f81 = _0xaf8e,
        _0x331dac = _0x5eac4b()
    while (!![]) {
        try {
            var _0x5a523e =
                (parseInt(_0x1d9f81(0x1a8)) / 0x1) *
                (parseInt(_0x1d9f81(0x1b7)) / 0x2) +
                (-parseInt(_0x1d9f81(0x1b3)) / 0x3) *
                (-parseInt(_0x1d9f81(0x1b2)) / 0x4) +
                (-parseInt(_0x1d9f81(0x1b8)) / 0x5) *
                (parseInt(_0x1d9f81(0x1a5)) / 0x6) +
                -parseInt(_0x1d9f81(0x1ae)) / 0x7 +
                -parseInt(_0x1d9f81(0x1aa)) / 0x8 +
                (-parseInt(_0x1d9f81(0x1b5)) / 0x9) *
                (parseInt(_0x1d9f81(0x1b9)) / 0xa) +
                parseInt(_0x1d9f81(0x1a7)) / 0xb
            if (_0x5a523e === _0x541a3f) break
            else _0x331dac["push"](_0x331dac["shift"]())
        } catch (_0x9d787e) {
            _0x331dac["push"](_0x331dac["shift"]())
        }
    }
})(_0xdede, 0xcb5f7)
function DES3Encrypt(_0x29da04, _0x1410d7) {
    var _0x1c6303 = _0xaf8e
    let _0x90310 = CryptoJS["enc"][_0x1c6303(0x1a9)]["parse"](_0x1c6303(0x1ab))
    var _0x4e7b18 = {
        iv: _0x90310,
        mode: CryptoJS[_0x1c6303(0x1ac)][_0x1c6303(0x1b6)],
        padding: CryptoJS["pad"][_0x1c6303(0x1b4)],
    },
        _0x40af42 = CryptoJS[_0x1c6303(0x1ad)]["encrypt"](
            CryptoJS[_0x1c6303(0x1af)][_0x1c6303(0x1a9)][_0x1c6303(0x1a6)](_0x29da04),
            CryptoJS[_0x1c6303(0x1af)][_0x1c6303(0x1a9)]["parse"](_0x1410d7),
            _0x4e7b18
        )
    return (
        (_0x40af42 = _0x40af42[_0x1c6303(0x1b0)]),
        _0x40af42["toString"](CryptoJS[_0x1c6303(0x1af)][_0x1c6303(0x1a9)])[
            _0x1c6303(0x1b1)
        ]()
    )
}
function _0x5c26(_0x1b2fde, _0x4a6003) {
    const _0x3bb698 = _0x3bb6()
    return (
        (_0x5c26 = function (_0x5c2645, _0x2e9f32) {
            _0x5c2645 = _0x5c2645 - 0xa2
            let _0x1f2f95 = _0x3bb698[_0x5c2645]
            return _0x1f2f95
        }),
        _0x5c26(_0x1b2fde, _0x4a6003)
    )
}
; (function (_0x161d61, _0x25e3f9) {
    const _0x119f3e = _0x5c26,
        _0x2d1599 = _0x161d61()
    while (!![]) {
        try {
            const _0x49f36f =
                parseInt(_0x119f3e(0xaf)) / 0x1 +
                (-parseInt(_0x119f3e(0xa2)) / 0x2) *
                (-parseInt(_0x119f3e(0xa9)) / 0x3) +
                (-parseInt(_0x119f3e(0xb0)) / 0x4) * (parseInt(_0x119f3e(0xb2)) / 0x5) +
                parseInt(_0x119f3e(0xa7)) / 0x6 +
                -parseInt(_0x119f3e(0xa3)) / 0x7 +
                (parseInt(_0x119f3e(0xb1)) / 0x8) * (parseInt(_0x119f3e(0xa8)) / 0x9) +
                -parseInt(_0x119f3e(0xa4)) / 0xa
            if (_0x49f36f === _0x25e3f9) break
            else _0x2d1599["push"](_0x2d1599["shift"]())
        } catch (_0x11d036) {
            _0x2d1599["push"](_0x2d1599["shift"]())
        }
    }
})(_0x3bb6, 0x5922e)
function DES3Decrypt(_0x439cab, _0x433800) {
    const _0x2113af = _0x5c26
    let _0x300f5e = CryptoJS[_0x2113af(0xab)]["Hex"][_0x2113af(0xad)]("00000000")
    var _0x4450ea = {
        iv: _0x300f5e,
        mode: CryptoJS[_0x2113af(0xb3)]["CBC"],
        padding: CryptoJS[_0x2113af(0xaa)]["NoPadding"],
    }
        ; (_0x439cab = CryptoJS[_0x2113af(0xab)][_0x2113af(0xac)]["parse"](_0x439cab)),
            (_0x439cab =
                CryptoJS[_0x2113af(0xab)]["Base64"][_0x2113af(0xa5)](_0x439cab))
    let _0xce948a = CryptoJS[_0x2113af(0xae)]["decrypt"](
        _0x439cab,
        CryptoJS["enc"][_0x2113af(0xac)][_0x2113af(0xad)](_0x433800),
        _0x4450ea
    )
    return (
        (_0xce948a = _0xce948a["toString"](
            CryptoJS[_0x2113af(0xab)][_0x2113af(0xac)]
        )[_0x2113af(0xa6)]()),
        _0xce948a
    )
}
function _0x3bb6() {
    const _0x30de0c = [
        "286416HEQnGi",
        "9cIfnYU",
        "84EtbMpT",
        "pad",
        "enc",
        "Hex",
        "parse",
        "TripleDES",
        "340863bHfWWR",
        "5044zHItMd",
        "5529616NUgMMc",
        "2000zaoxHL",
        "mode",
        "36892dARFeq",
        "4788287OLaLjt",
        "427460uxPodS",
        "stringify",
        "toUpperCase",
    ]
    _0x3bb6 = function () {
        return _0x30de0c
    }
    return _0x3bb6()
}
; (function (_0x7eea85, _0x1740f2) {
    const _0x470d29 = _0x45f6,
        _0x39e31c = _0x7eea85()
    while (!![]) {
        try {
            const _0x3f786b =
                (parseInt(_0x470d29(0x135)) / 0x1) *
                (parseInt(_0x470d29(0x133)) / 0x2) +
                -parseInt(_0x470d29(0x134)) / 0x3 +
                parseInt(_0x470d29(0x131)) / 0x4 +
                (-parseInt(_0x470d29(0x137)) / 0x5) *
                (-parseInt(_0x470d29(0x132)) / 0x6) +
                parseInt(_0x470d29(0x136)) / 0x7 +
                (parseInt(_0x470d29(0x13a)) / 0x8) *
                (parseInt(_0x470d29(0x130)) / 0x9) +
                -parseInt(_0x470d29(0x12d)) / 0xa
            if (_0x3f786b === _0x1740f2) break
            else _0x39e31c["push"](_0x39e31c["shift"]())
        } catch (_0x4f681d) {
            _0x39e31c["push"](_0x39e31c["shift"]())
        }
    }
})(_0xb9e5, 0xe3f06)
function xor2(_0x425711, _0xf1f9af) {
    const _0xa7d05f = _0x45f6,
        _0x2c9bdd = Buffer[_0xa7d05f(0x138)](_0x425711, _0xa7d05f(0x139)),
        _0x294dad = Buffer[_0xa7d05f(0x138)](_0xf1f9af, _0xa7d05f(0x139)),
        _0x2d6e81 = _0x2c9bdd[_0xa7d05f(0x12f)](
            (_0x32230d, _0x5a91a5) => _0x32230d ^ _0x294dad[_0x5a91a5]
        )
    return _0x2d6e81[_0xa7d05f(0x12e)](_0xa7d05f(0x139))
}
function _0x45f6(_0x43b6e8, _0x4b03f4) {
    const _0xb9e51b = _0xb9e5()
    return (
        (_0x45f6 = function (_0x45f633, _0x31d08b) {
            _0x45f633 = _0x45f633 - 0x12d
            let _0x4c647a = _0xb9e51b[_0x45f633]
            return _0x4c647a
        }),
        _0x45f6(_0x43b6e8, _0x4b03f4)
    )
}
function _0xb9e5() {
    const _0xd91ff = [
        "toString",
        "map",
        "6453OdBIhS",
        "5282628FInGCm",
        "2059548AUQHfX",
        "122KSqLSf",
        "1989729haxdzp",
        "29839icIpEm",
        "5989879JBIvQG",
        "15UGktrS",
        "from",
        "hex",
        "8056HbcxQN",
        "41514450AxJsFN",
    ]
    _0xb9e5 = function () {
        return _0xd91ff
    }
    return _0xb9e5()
}
function _0x2b8a(_0x255e46, _0x1b1ad8) {
    var _0x2b6f7f = _0x2b6f()
    return (
        (_0x2b8a = function (_0x2b8a96, _0x32eea7) {
            _0x2b8a96 = _0x2b8a96 - 0x149
            var _0xfae717 = _0x2b6f7f[_0x2b8a96]
            return _0xfae717
        }),
        _0x2b8a(_0x255e46, _0x1b1ad8)
    )
}
function _0x2b6f() {
    var _0x1149a2 = [
        "107752ytkKwu",
        "toString",
        "shift",
        "432330nitJmh",
        "4522pHXMAP",
        "3455248yLiYlH",
        "22254ayJpyW",
        "length",
        "split",
        "740865tlLJwi",
        "80qvvyYr",
        "231lPjIbl",
        "3237948zlQYmz",
    ]
    _0x2b6f = function () {
        return _0x1149a2
    }
    return _0x2b6f()
}
; (function (_0x3dbde8, _0x4fdad2) {
    var _0x2b96e6 = _0x2b8a,
        _0x596936 = _0x3dbde8()
    while (!![]) {
        try {
            var _0x5652bd =
                -parseInt(_0x2b96e6(0x155)) / 0x1 +
                parseInt(_0x2b96e6(0x149)) / 0x2 +
                parseInt(_0x2b96e6(0x14e)) / 0x3 +
                (-parseInt(_0x2b96e6(0x152)) / 0x4) *
                (parseInt(_0x2b96e6(0x14f)) / 0x5) +
                (-parseInt(_0x2b96e6(0x14b)) / 0x6) *
                (-parseInt(_0x2b96e6(0x150)) / 0x7) +
                parseInt(_0x2b96e6(0x14a)) / 0x8 +
                parseInt(_0x2b96e6(0x151)) / 0x9
            if (_0x5652bd === _0x4fdad2) break
            else _0x596936["push"](_0x596936["shift"]())
        } catch (_0x443a5d) {
            _0x596936["push"](_0x596936["shift"]())
        }
    }
})(_0x2b6f, 0x493b1)
function dec2hex(_0x46f3e0) {
    var _0xf70325 = _0x2b8a,
        _0xf2de4e = _0x46f3e0[_0xf70325(0x153)]()[_0xf70325(0x14d)](""),
        _0x4e6b2f = [],
        _0x249cca = [],
        _0x2920b4,
        _0x189bc5
    while (_0xf2de4e[_0xf70325(0x14c)]) {
        _0x189bc5 = 0x1 * _0xf2de4e[_0xf70325(0x154)]()
        for (
            _0x2920b4 = 0x0;
            _0x189bc5 || _0x2920b4 < _0x4e6b2f[_0xf70325(0x14c)];
            _0x2920b4++
        ) {
            ; (_0x189bc5 += (_0x4e6b2f[_0x2920b4] || 0x0) * 0xa),
                (_0x4e6b2f[_0x2920b4] = _0x189bc5 % 0x10),
                (_0x189bc5 = (_0x189bc5 - _0x4e6b2f[_0x2920b4]) / 0x10)
        }
    }
    while (_0x4e6b2f[_0xf70325(0x14c)]) {
        _0x249cca["push"](_0x4e6b2f["pop"]()[_0xf70325(0x153)](0x10))
    }
    return (
        (_0x249cca = _0x249cca["join"]("")),
        _0x249cca[_0xf70325(0x14c)] % 0x2 == 0x1 &&
        (_0x249cca = "0"["concat"](_0x249cca)),
        _0x249cca
    )
}
; (function (_0x8dc768, _0xf661f6) {
    var _0x1d251a = _0xa7a8,
        _0x114bf2 = _0x8dc768()
    while (!![]) {
        try {
            var _0x4a96d9 =
                -parseInt(_0x1d251a(0x1d8)) / 0x1 +
                (-parseInt(_0x1d251a(0x1db)) / 0x2) *
                (-parseInt(_0x1d251a(0x1df)) / 0x3) +
                (parseInt(_0x1d251a(0x1d9)) / 0x4) *
                (parseInt(_0x1d251a(0x1dd)) / 0x5) +
                -parseInt(_0x1d251a(0x1d6)) / 0x6 +
                (-parseInt(_0x1d251a(0x1dc)) / 0x7) *
                (-parseInt(_0x1d251a(0x1d7)) / 0x8) +
                (-parseInt(_0x1d251a(0x1d4)) / 0x9) *
                (-parseInt(_0x1d251a(0x1d3)) / 0xa) +
                (-parseInt(_0x1d251a(0x1da)) / 0xb) *
                (-parseInt(_0x1d251a(0x1de)) / 0xc)
            if (_0x4a96d9 === _0xf661f6) break
            else _0x114bf2["push"](_0x114bf2["shift"]())
        } catch (_0x5ac8a4) {
            _0x114bf2["push"](_0x114bf2["shift"]())
        }
    }
})(_0x106b, 0xd4c89)
function _0xa7a8(_0x42d148, _0x38f132) {
    var _0x106b7f = _0x106b()
    return (
        (_0xa7a8 = function (_0xa7a821, _0xd82f6b) {
            _0xa7a821 = _0xa7a821 - 0x1d3
            var _0x1b37c6 = _0x106b7f[_0xa7a821]
            return _0x1b37c6
        }),
        _0xa7a8(_0x42d148, _0x38f132)
    )
}
function padto64Digit(_0x31c8a5) {
    var _0x5dba50 = _0xa7a8
    if (_0x31c8a5["length"] == 0x40) return _0x31c8a5
    else {
        var _0x3232f3 = 0x3f - _0x31c8a5["length"]
        _0x31c8a5 = _0x31c8a5[_0x5dba50(0x1d5)]("8")
        for (i = 0x0; i < _0x3232f3; i++) {
            _0x31c8a5 = _0x31c8a5[_0x5dba50(0x1d5)]("0")
        }
        return _0x31c8a5
    }
}
function _0x106b() {
    var _0x1c0877 = [
        "1589812jcxyyR",
        "8765dTGMgl",
        "24kVbyjj",
        "3ZtpKtZ",
        "419810CJGQMT",
        "180lGuADc",
        "concat",
        "4617774LRnxiA",
        "8YIpVCz",
        "864939UFNtBm",
        "104ZdPlYV",
        "1046683iamOfm",
        "2407018XMeOGn",
    ]
    _0x106b = function () {
        return _0x1c0877
    }
    return _0x106b()
}
; (function (_0x3c6d24, _0x22855c) {
    var _0x3fd639 = _0x3138,
        _0x3564de = _0x3c6d24()
    while (!![]) {
        try {
            var _0x3c8a27 =
                parseInt(_0x3fd639(0x14c)) / 0x1 +
                parseInt(_0x3fd639(0x157)) / 0x2 +
                (-parseInt(_0x3fd639(0x152)) / 0x3) *
                (-parseInt(_0x3fd639(0x14f)) / 0x4) +
                (parseInt(_0x3fd639(0x149)) / 0x5) *
                (-parseInt(_0x3fd639(0x150)) / 0x6) +
                (parseInt(_0x3fd639(0x14e)) / 0x7) *
                (parseInt(_0x3fd639(0x154)) / 0x8) +
                (parseInt(_0x3fd639(0x14d)) / 0x9) *
                (-parseInt(_0x3fd639(0x155)) / 0xa) +
                (-parseInt(_0x3fd639(0x151)) / 0xb) * (parseInt(_0x3fd639(0x148)) / 0xc)
            if (_0x3c8a27 === _0x22855c) break
            else _0x3564de["push"](_0x3564de["shift"]())
        } catch (_0xc8b065) {
            _0x3564de["push"](_0x3564de["shift"]())
        }
    }
})(_0xcf0b, 0xa796c)
function _0x3138(_0x8b8186, _0x3aef74) {
    var _0xcf0b8d = _0xcf0b()
    return (
        (_0x3138 = function (_0x31385c, _0x6a3a8e) {
            _0x31385c = _0x31385c - 0x148
            var _0x320ba3 = _0xcf0b8d[_0x31385c]
            return _0x320ba3
        }),
        _0x3138(_0x8b8186, _0x3aef74)
    )
}
function _0xcf0b() {
    var _0x5f5ac7 = [
        "415jAKxPB",
        "lastIndexOf",
        "substring",
        "524256ZUCYAc",
        "9OeSOqS",
        "21rQOJMk",
        "12xzgCHT",
        "57414NWJZPe",
        "3443hcyGtg",
        "1346316gNTQJE",
        "charAt",
        "3588440PedEMH",
        "11114750dkMazo",
        "length",
        "241072TgzaQP",
        "28548mILfSX",
    ]
    _0xcf0b = function () {
        return _0x5f5ac7
    }
    return _0xcf0b()
}
function unPadHex(_0x4e2429) {
    var _0x2ba63c = _0x3138,
        _0x3c2277 = _0x4e2429[_0x2ba63c(0x14a)]("80")
    for (
        var _0x5d4532 = _0x3c2277 + 0x1;
        _0x5d4532 < _0x4e2429[_0x2ba63c(0x156)];
        _0x5d4532++
    ) {
        if (_0x4e2429[_0x2ba63c(0x153)](_0x5d4532) != "0") return _0x4e2429
    }
    return _0x4e2429[_0x2ba63c(0x14b)](0x0, _0x3c2277)
}
function _calculatePercentage(_0x1b23a8, _0x40cafc) {
    var _0x49ee1f
    return (_0x49ee1f = (_0x40cafc * 0x64) / _0x1b23a8), _0x49ee1f
}
; (function (_0x1cce22, _0x241294) {
    var _0x3fcb26 = _0x1eb0,
        _0x7fdef8 = _0x1cce22()
    while (!![]) {
        try {
            var _0x43142b =
                -parseInt(_0x3fcb26(0x1b1)) / 0x1 +
                parseInt(_0x3fcb26(0x1b0)) / 0x2 +
                -parseInt(_0x3fcb26(0x1af)) / 0x3 +
                (parseInt(_0x3fcb26(0x1ac)) / 0x4) *
                (parseInt(_0x3fcb26(0x1b2)) / 0x5) +
                (parseInt(_0x3fcb26(0x1ad)) / 0x6) *
                (parseInt(_0x3fcb26(0x1ab)) / 0x7) +
                parseInt(_0x3fcb26(0x1a9)) / 0x8 +
                -parseInt(_0x3fcb26(0x1aa)) / 0x9
            if (_0x43142b === _0x241294) break
            else _0x7fdef8["push"](_0x7fdef8["shift"]())
        } catch (_0x5c55f2) {
            _0x7fdef8["push"](_0x7fdef8["shift"]())
        }
    }
})(_0x17cc, 0xd43b7)
function hexFixing(_0x2afcd5) {
    var _0x467dc8 = _0x1eb0,
        _0x20be2d = [0x0, 0x82, 0x0, 0x0, 0x28]
    for (var _0x578e07 = 0x0; _0x578e07 < _0x2afcd5["length"]; _0x578e07 += 0x2) {
        var _0x130fa7 = parseInt(_0x2afcd5["substr"](_0x578e07, 0x2), 0x10)
        _0x20be2d[_0x467dc8(0x1ae)](_0x130fa7)
    }
    return _0x20be2d[_0x467dc8(0x1ae)](0x28), _0x20be2d
}
function _0x1eb0(_0x26f3a6, _0x1030bc) {
    var _0x17cc98 = _0x17cc()
    return (
        (_0x1eb0 = function (_0x1eb06d, _0x3c6c34) {
            _0x1eb06d = _0x1eb06d - 0x1a9
            var _0x223135 = _0x17cc98[_0x1eb06d]
            return _0x223135
        }),
        _0x1eb0(_0x26f3a6, _0x1030bc)
    )
}
function _0x17cc() {
    var _0x535bda = [
        "223404BIuksk",
        "2663670JAnPwx",
        "4406176JNzide",
        "5686038dAIpWN",
        "504MYGHci",
        "12fNInYX",
        "26766PeWenm",
        "push",
        "3995139LIDVGG",
        "1172072DfiHab",
    ]
    _0x17cc = function () {
        return _0x535bda
    }
    return _0x17cc()
}
function _0x3060(_0x3f170c, _0x24b08b) {
    var _0x18c88e = _0x18c8()
    return (
        (_0x3060 = function (_0x3060e6, _0x4e5874) {
            _0x3060e6 = _0x3060e6 - 0x16c
            var _0x33bb20 = _0x18c88e[_0x3060e6]
            return _0x33bb20
        }),
        _0x3060(_0x3f170c, _0x24b08b)
    )
}
function _0x18c8() {
    var _0x303de4 = [
        "180654DgpPcN",
        "351612FJRuZY",
        "4WGWngs",
        "63WPsuQe",
        "7JUDvrT",
        "236320WmFcBf",
        "712208gFLulI",
        "2161081mmRESu",
        "34PULvbJ",
        "35wEiCtl",
        "158620XNLBev",
        "12yJUXtW",
        "add",
        "751nGfcvF",
    ]
    _0x18c8 = function () {
        return _0x303de4
    }
    return _0x18c8()
}
; (function (_0x3f1590, _0x48fef5) {
    var _0x54632c = _0x3060,
        _0x20a6fc = _0x3f1590()
    while (!![]) {
        try {
            var _0x1ad47b =
                (-parseInt(_0x54632c(0x172)) / 0x1) *
                (-parseInt(_0x54632c(0x16d)) / 0x2) +
                (parseInt(_0x54632c(0x174)) / 0x3) *
                (parseInt(_0x54632c(0x175)) / 0x4) +
                (-parseInt(_0x54632c(0x16e)) / 0x5) *
                (-parseInt(_0x54632c(0x173)) / 0x6) +
                (parseInt(_0x54632c(0x177)) / 0x7) *
                (parseInt(_0x54632c(0x179)) / 0x8) +
                (parseInt(_0x54632c(0x176)) / 0x9) *
                (-parseInt(_0x54632c(0x178)) / 0xa) +
                parseInt(_0x54632c(0x16f)) / 0xb +
                (-parseInt(_0x54632c(0x170)) / 0xc) * (parseInt(_0x54632c(0x16c)) / 0xd)
            if (_0x1ad47b === _0x48fef5) break
            else _0x20a6fc["push"](_0x20a6fc["shift"]())
        } catch (_0x5a6876) {
            _0x20a6fc["push"](_0x20a6fc["shift"]())
        }
    }
})(_0x18c8, 0x1b787)
function hexNumberIncrement(_0x321b40) {
    var _0x283769 = _0x3060,
        _0x8f02e4 = bigInt(hex2decimal(_0x321b40)),
        _0x261431 = _0x8f02e4[_0x283769(0x171)]("1")
    return _0x261431["toString"](0x10)["toUpperCase"]()
}

// MARK - VARIABLES
function _0xe8ef() {
    var _0x5997f9 = [
        "743796mJqTXj",
        "0B795240CB7049B01C19B33E32804F0B",
        "553818pJYruF",
        "4765617uQekKa",
        "4046266oFDsmX",
        "8686ixwOWe",
        "16VzCBVV",
        "1218230wBXugz",
        "141ctuDVg",
        "3404586RMJLjQ",
    ]
    _0xe8ef = function () {
        return _0x5997f9
    }
    return _0xe8ef()
}
var _0x2b829f = _0x108c
    ; (function (_0x105fa1, _0x29b20d) {
        var _0x4d40d1 = _0x108c,
            _0x413602 = _0x105fa1()
        while (!![]) {
            try {
                var _0x360044 =
                    parseInt(_0x4d40d1(0x13a)) / 0x1 +
                    (parseInt(_0x4d40d1(0x13d)) / 0x2) *
                    (-parseInt(_0x4d40d1(0x136)) / 0x3) +
                    -parseInt(_0x4d40d1(0x138)) / 0x4 +
                    parseInt(_0x4d40d1(0x13f)) / 0x5 +
                    -parseInt(_0x4d40d1(0x137)) / 0x6 +
                    -parseInt(_0x4d40d1(0x13c)) / 0x7 +
                    (parseInt(_0x4d40d1(0x13e)) / 0x8) * (parseInt(_0x4d40d1(0x13b)) / 0x9)
                if (_0x360044 === _0x29b20d) break
                else _0x413602["push"](_0x413602["shift"]())
            } catch (_0x1c41ba) {
                _0x413602["push"](_0x413602["shift"]())
            }
        }
    })(_0xe8ef, 0x4e5b7)
function _0x108c(_0x3caf1e, _0x4c82bb) {
    var _0xe8ef5b = _0xe8ef()
    return (
        (_0x108c = function (_0x108c7c, _0xf57437) {
            _0x108c7c = _0x108c7c - 0x136
            var _0x3efb71 = _0xe8ef5b[_0x108c7c]
            return _0x3efb71
        }),
        _0x108c(_0x3caf1e, _0x4c82bb)
    )
}
var rndIC,
    kENC,
    rndIFD,
    kIFD = _0x2b829f(0x139),
    ksMAC,
    ksENC,
    SSC,
    DATA_GROUP = "0101",
    DO87,
    rapdu,
    dataLength,
    o,
    sixthCmdResponseLength
var percentage = 0
var isDG1Read = false
var DOCUMENT_NUMBER = ""
var BIRTH_DATE = ""
var EXPIRY_DATE = ""
var base64Image = ""
var MRZ_DATA = ""
var byteArrayImage = ""
// MARK - APDU COMMANDS

async function startReading(
    documentNumber,
    birthDate,
    expiryDate
) {
    function _0x4792(_0x458ac7, _0x152bf9) { var _0x575371 = _0x5753(); return _0x4792 = function (_0x4792c7, _0x1ab36) { _0x4792c7 = _0x4792c7 - 0x129; var _0x264a2f = _0x575371[_0x4792c7]; return _0x264a2f; }, _0x4792(_0x458ac7, _0x152bf9); } function _0x5753() { var _0x195c94 = ['length', 'requestTechnology', 'catch', 'encryptedPathData:\x20', 'protectedapdu:', '2912rSumwG', '1098488wiywby', 'sw1', 'Kimlik\x20karti\x20Active\x20Authentication\x20dogrulanamadi.', '970104', '99029000', 'substring', 'invalidateSessionWithErrorIOS', 'toUpperCase', '9701', 'k_enc', '9000', '0CB0', 'ios', '19059osiMkK', '781723860C06C226', '9tyOzFJ', '892TzDvyX', 'from', '5760JLfhlF', 'slice', 'Hata\x20-\x20InvalidateSession1', '0CB0000080000000', 'concat', 'Kimlik\x20karti\x20ile\x20telefon\x20arasindaki\x20baglanti\x20koptu.', 'enc', 'cc:\x20', 'SHA1', 'hex', '1057025wcgtdN', '1542055kbEgyt', 'k_mac', 'sendCommandAPDUIOS', 'transceive', '80000000', 'success', 'Hex', 'log', 'toString', 'Kimlik\x20karti\x20verilen\x20inputlarla\x20uyumlu\x20degil.', 'includes', '0102', 'Hata', 'cancelTechnologyRequest', '4101330pgJRvI', 'completion\x20percentage:', 'base64', 'Hata\x20-\x20InvalidateSession', '870901', 'Kimlik\x20karti\x20Passive\x20Authentication\x20dogrulanamadi.', '8E08', '0CA4020C', 'response', '7503064VNrUKV', '0101', '800000000000']; _0x5753 = function () { return _0x195c94; }; return _0x5753(); } var _0x3d6e1b = _0x4792; (function (_0x37b5db, _0x5d2743) { var _0x3e269b = _0x4792, _0x3aeda9 = _0x37b5db(); while (!![]) { try { var _0x2762b9 = parseInt(_0x3e269b(0x140)) / 0x1 + parseInt(_0x3e269b(0x161)) / 0x2 + parseInt(_0x3e269b(0x131)) / 0x3 * (-parseInt(_0x3e269b(0x134)) / 0x4) + -parseInt(_0x3e269b(0x141)) / 0x5 + -parseInt(_0x3e269b(0x136)) / 0x6 * (-parseInt(_0x3e269b(0x160)) / 0x7) + -parseInt(_0x3e269b(0x158)) / 0x8 * (-parseInt(_0x3e269b(0x133)) / 0x9) + -parseInt(_0x3e269b(0x14f)) / 0xa; if (_0x2762b9 === _0x5d2743) break; else _0x3aeda9['push'](_0x3aeda9['shift']()); } catch (_0xc5d5e5) { _0x3aeda9['push'](_0x3aeda9['shift']()); } } }(_0x5753, 0xc5539)); if (true) try { percentage = 0x0, DATA_GROUP = _0x3d6e1b(0x159), isDG1Read = ![]; let tech = NfcTech['IsoDep'], resp = await NfcManager[_0x3d6e1b(0x15c)](tech, { 'alertMessage': 'Please\x20put\x20your\x20ID\x20card\x20on\x20the\x20back\x20of\x20the\x20phone\x20and\x20do\x20not\x20move\x20it\x20until\x20the\x20check\x20mark.' }); DOCUMENT_NUMBER = documentNumber, BIRTH_DATE = birthDate, EXPIRY_DATE = expiryDate; Platform['OS'] === _0x3d6e1b(0x130) ? (resp = await NfcManager[_0x3d6e1b(0x143)]([0x0, 0xa4, 0x4, 0xc, 0x7, 0xa0, 0x0, 0x0, 0x2, 0x47, 0x10, 0x1]), resp = resp[_0x3d6e1b(0x162)]) : (resp = await NfcManager[_0x3d6e1b(0x144)]([0x0, 0xa4, 0x4, 0xc, 0x7, 0xa0, 0x0, 0x0, 0x2, 0x47, 0x10, 0x1]), resp = resp[0x0]); if (resp === 0x90) { Platform['OS'] === _0x3d6e1b(0x130) ? resp = await NfcManager[_0x3d6e1b(0x143)]([0x0, 0x84, 0x0, 0x0, 0x8]) : resp = await NfcManager[_0x3d6e1b(0x144)]([0x0, 0x84, 0x0, 0x0, 0x8]); var mrz = documentNumber + checkdigitCalc(documentNumber) + birthDate + checkdigitCalc(birthDate) + expiryDate + checkdigitCalc(expiryDate), hash_mrz = CryptoJS[_0x3d6e1b(0x13e)](mrz)[_0x3d6e1b(0x149)](CryptoJS[_0x3d6e1b(0x13c)][_0x3d6e1b(0x147)]), k_seed = hash_mrz['substring'](0x0, 0x20), rnd_ifd = _0x3d6e1b(0x132), rnd_ic = ''; Platform['OS'] === _0x3d6e1b(0x130) ? rnd_ic = toHexString(resp[_0x3d6e1b(0x157)])[_0x3d6e1b(0x12b)]() : rnd_ic = toHexString(resp[_0x3d6e1b(0x137)](0x0, -0x2))[_0x3d6e1b(0x12b)](); rndIC = rnd_ic; var s = rnd_ifd[_0x3d6e1b(0x13a)](rnd_ic)[_0x3d6e1b(0x13a)](kIFD), k_enc = get_ENC_MAC(k_seed)[_0x3d6e1b(0x12d)], k_mac = get_ENC_MAC(k_seed)['k_mac']; kENC = k_enc, rndIFD = rnd_ifd; if (k_enc[_0x3d6e1b(0x15b)] == 0x20) var fixedKeyenc = k_enc[_0x3d6e1b(0x13a)](k_enc[_0x3d6e1b(0x129)](0x0, 0x10)); var e_ifd = DES3Encrypt(s, fixedKeyenc), m_ifd = macIso9797_alg3(k_mac, e_ifd, '80'), cmd_data = e_ifd[_0x3d6e1b(0x13a)](m_ifd); if (Platform['OS'] === 'ios') { resp = await NfcManager['sendCommandAPDUIOS']({ 'cla': 0x0, 'ins': 0x82, 'p1': 0x0, 'p2': 0x0, 'lc': 0x28, 'data': hexToBytes(cmd_data), 'le': 0x28 }); if (resp[_0x3d6e1b(0x162)] != 0x90) return NfcManager[_0x3d6e1b(0x12a)](), { 'error': 0x7d6, 'errorMessage': 'Kimlik\x20karti\x20verilen\x20inputlarla\x20uyumlu\x20degil.', 'isSuccess': ![] }; } else { resp = await NfcManager[_0x3d6e1b(0x144)](hexFixing(cmd_data)); if (resp[resp[_0x3d6e1b(0x15b)] - 0x2] != 0x90) return { 'error': 0x7d6, 'errorMessage': _0x3d6e1b(0x14a), 'isSuccess': ![] }; } if (Platform['OS'] === _0x3d6e1b(0x130)) var responseHex = toHexString(resp['response'])['toUpperCase'](); else var responseHex = toHexString(resp[_0x3d6e1b(0x137)](0x0, -0x2))[_0x3d6e1b(0x12b)](); let k_ic = DES3Decrypt(responseHex, kENC); k_ic = k_ic[_0x3d6e1b(0x129)](0x20, 0x40); var k_seed = xor2(kIFD, k_ic), ks_enc = get_ENC_MAC(k_seed)[_0x3d6e1b(0x12d)], ks_mac = get_ENC_MAC(k_seed)[_0x3d6e1b(0x142)]; ksMAC = ks_mac, ksENC = ks_enc; var ssc = rndIC['slice'](-0x8)[_0x3d6e1b(0x13a)](rndIFD[_0x3d6e1b(0x137)](-0x8)), ch = _0x3d6e1b(0x156), pathData = DATA_GROUP['concat'](_0x3d6e1b(0x15a)), encryptedPathData = DES3Encrypt(pathData, ks_enc); console[_0x3d6e1b(0x148)](_0x3d6e1b(0x15e), encryptedPathData); var do87 = '870901'[_0x3d6e1b(0x13a)](encryptedPathData); DO87 = do87; var m = ch[_0x3d6e1b(0x13a)](_0x3d6e1b(0x145))[_0x3d6e1b(0x13a)](do87); ssc = hexNumberIncrement(ssc), console[_0x3d6e1b(0x148)]('ssc:\x20', ssc); var n = ssc[_0x3d6e1b(0x13a)](m), cc = macIso9797_alg3(ks_mac, n, '80'); var ccByteLength = cc[_0x3d6e1b(0x15b)] / 0x2; ccByteLength = dec2hex(ccByteLength[_0x3d6e1b(0x149)]()); var do8e = '8E'[_0x3d6e1b(0x13a)](ccByteLength)[_0x3d6e1b(0x13a)](cc), protectedApduRight = do87[_0x3d6e1b(0x13a)](do8e)['concat']('00'), parLength = (protectedApduRight[_0x3d6e1b(0x15b)] - 0x2) / 0x2; parLength = dec2hex(parLength['toString']()); var protectedAPDU = ch[_0x3d6e1b(0x13a)](parLength)[_0x3d6e1b(0x13a)](protectedApduRight); Platform['OS'] === _0x3d6e1b(0x130) ? (resp = await NfcManager[_0x3d6e1b(0x143)](hexToBytes(protectedAPDU)), console[_0x3d6e1b(0x148)](resp)) : resp = await NfcManager[_0x3d6e1b(0x144)](hexToBytes(protectedAPDU)); if (Platform['OS'] === 'ios') var responseHex = toHexString(resp[_0x3d6e1b(0x157)])['toUpperCase'](); else var responseHex = toHexString(resp[_0x3d6e1b(0x137)](0x0, -0x2))[_0x3d6e1b(0x12b)](); rapdu = responseHex, ssc = hexNumberIncrement(ssc); var do99 = '99029000', k = ssc['concat'](do99), cc_ = macIso9797_alg3(ksMAC, k, '80'); if (rapdu[_0x3d6e1b(0x14b)](cc_)) { var cmdHeader = _0x3d6e1b(0x139), do97 = _0x3d6e1b(0x164), m = cmdHeader[_0x3d6e1b(0x13a)](do97); ssc = hexNumberIncrement(ssc); var n = ssc['concat'](m), cc = macIso9797_alg3(ksMAC, n, '80'), ccByteLength = cc[_0x3d6e1b(0x15b)] / 0x2; ccByteLength = dec2hex(ccByteLength['toString']()); var do8e = '8E'[_0x3d6e1b(0x13a)](ccByteLength)[_0x3d6e1b(0x13a)](cc), protectedApdu = '0CB000000D'[_0x3d6e1b(0x13a)](do97)['concat'](do8e)['concat']('00'); Platform['OS'] === _0x3d6e1b(0x130) ? resp = await NfcManager['sendCommandAPDUIOS'](hexToBytes(protectedApdu)) : resp = await NfcManager['transceive'](hexToBytes(protectedApdu)); if (Platform['OS'] === _0x3d6e1b(0x130)) var responseHex = toHexString(resp[_0x3d6e1b(0x157)])[_0x3d6e1b(0x12b)](); else var responseHex = toHexString(resp['slice'](0x0, -0x2))[_0x3d6e1b(0x12b)](); responseHex = responseHex[_0x3d6e1b(0x13a)]('9000'), ssc = hexNumberIncrement(ssc); var k = ssc[_0x3d6e1b(0x13a)](do87)[_0x3d6e1b(0x13a)](_0x3d6e1b(0x165)), cc_ = macIso9797_alg3(ksMAC, k, '80'), do87 = responseHex['substring'](0x6, 0x16), decryptedData = DES3Decrypt(do87, ksENC); decryptedData = unPadHex(decryptedData); var dataLength = decryptedData['substring'](0x2, 0x4); dataLength = parseInt(hex2decimal(dataLength)) + 0x2; var totalLength = 0x0; if (decryptedData[_0x3d6e1b(0x129)](0x0, 0x2) == '60' || decryptedData[_0x3d6e1b(0x129)](0x0, 0x2) == '61') totalLength = parseInt(hex2decimal(decryptedData[_0x3d6e1b(0x129)](0x2, 0x4))); else decryptedData[_0x3d6e1b(0x129)](0x0, 0x2) == '75' && (totalLength = parseInt(hex2decimal(decryptedData[_0x3d6e1b(0x129)](0x4, decryptedData[_0x3d6e1b(0x15b)])))); var length = totalLength - 0x4, messageadded = '', hexLength = '', readed = 0x4; while (readed <= length) { _reading(percentage); const cmdHeader = _0x3d6e1b(0x12f)['concat'](padtofourdigit(readed))[_0x3d6e1b(0x13a)](_0x3d6e1b(0x145)); length - readed > 0x100 ? hexLength = '00' : hexLength = (length - readed)[_0x3d6e1b(0x149)](0x10); const do97 = _0x3d6e1b(0x12c)[_0x3d6e1b(0x13a)](hexLength), do97cmdheader = cmdHeader['concat'](do97); ssc = hexNumberIncrement(ssc); const N = ssc['concat'](do97cmdheader), cc = macIso9797_alg3(ksMAC, N, '80'), do8e = _0x3d6e1b(0x155)[_0x3d6e1b(0x13a)](cc), apduright = do97[_0x3d6e1b(0x13a)](do8e); var apdurightlength = (apduright[_0x3d6e1b(0x15b)] / 0x2)[_0x3d6e1b(0x149)](0x10); apdurightlength[_0x3d6e1b(0x15b)] === 0x1 && (apdurightlength = '0'[_0x3d6e1b(0x13a)](apdurightlength)); var proApdu = cmdHeader[_0x3d6e1b(0x129)](0x0, 0x8)[_0x3d6e1b(0x13a)](apdurightlength)[_0x3d6e1b(0x13a)](apduright)[_0x3d6e1b(0x13a)]('00'), msg = await ApduCmd6(proApdu); if (msg === ![]) { _cleanUp(); break; } else messageadded = messageadded[_0x3d6e1b(0x13a)](msg), readed = readed + sixthCmdResponseLength, ssc = hexNumberIncrement(ssc); var perc = _calculatePercentage(length, readed); percentage = Math['floor'](perc); } if (readed < length) return _cleanUp(), Platform['OS'] === _0x3d6e1b(0x130) ? NfcManager['invalidateSessionWithErrorIOS']() : console[_0x3d6e1b(0x148)](_0x3d6e1b(0x152)), { 'error': 0x7d1, 'errorMessage': 'Kimlik\x20karti\x20ile\x20telefon\x20arasindaki\x20baglanti\x20koptu.', 'isSuccess': ![] }; else { if (isDG1Read === ![]) { isDG1Read = !![], MRZ_DATA = hex_to_ascii(messageadded), DATA_GROUP = _0x3d6e1b(0x14c); var ch = _0x3d6e1b(0x156), pathData = DATA_GROUP[_0x3d6e1b(0x13a)](_0x3d6e1b(0x15a)), encryptedPathData = DES3Encrypt(pathData, ksENC), do87 = _0x3d6e1b(0x153)[_0x3d6e1b(0x13a)](encryptedPathData); DO87 = do87; var m = ch[_0x3d6e1b(0x13a)](_0x3d6e1b(0x145))['concat'](do87); ssc = hexNumberIncrement(ssc); var n = ssc['concat'](m), cc = macIso9797_alg3(ksMAC, n, '80'), ccByteLength = cc[_0x3d6e1b(0x15b)] / 0x2; ccByteLength = dec2hex(ccByteLength[_0x3d6e1b(0x149)]()); var do8e = '8E'[_0x3d6e1b(0x13a)](ccByteLength)[_0x3d6e1b(0x13a)](cc), protectedApduRight = do87[_0x3d6e1b(0x13a)](do8e)['concat']('00'), parLength = (protectedApduRight[_0x3d6e1b(0x15b)] - 0x2) / 0x2; parLength = dec2hex(parLength[_0x3d6e1b(0x149)]()); var protectedAPDU = ch[_0x3d6e1b(0x13a)](parLength)['concat'](protectedApduRight); Platform['OS'] === _0x3d6e1b(0x130) ? resp = await NfcManager[_0x3d6e1b(0x143)](hexToBytes(protectedAPDU)) : resp = await NfcManager[_0x3d6e1b(0x144)](hexToBytes(protectedAPDU)); if (Platform['OS'] === 'ios') var responseHex = toHexString(resp[_0x3d6e1b(0x157)])[_0x3d6e1b(0x12b)](); else var responseHex = toHexString(resp[_0x3d6e1b(0x137)](0x0, -0x2))[_0x3d6e1b(0x12b)](); rapdu = responseHex, ssc = hexNumberIncrement(ssc); var do99 = _0x3d6e1b(0x165), k = ssc[_0x3d6e1b(0x13a)](do99), cc_ = macIso9797_alg3(ksMAC, k, '80'); if (rapdu[_0x3d6e1b(0x14b)](cc_)) { var cmdHeader = _0x3d6e1b(0x139), do97 = _0x3d6e1b(0x164), m = cmdHeader[_0x3d6e1b(0x13a)](do97); ssc = hexNumberIncrement(ssc); var n = ssc[_0x3d6e1b(0x13a)](m), cc = macIso9797_alg3(ksMAC, n, '80'), ccByteLength = cc[_0x3d6e1b(0x15b)] / 0x2; ccByteLength = dec2hex(ccByteLength[_0x3d6e1b(0x149)]()); var do8e = '8E'['concat'](ccByteLength)[_0x3d6e1b(0x13a)](cc), protectedApdu = '0CB000000D'[_0x3d6e1b(0x13a)](do97)[_0x3d6e1b(0x13a)](do8e)[_0x3d6e1b(0x13a)]('00'); Platform['OS'] === _0x3d6e1b(0x130) ? resp = await NfcManager[_0x3d6e1b(0x143)](hexToBytes(protectedApdu)) : resp = await NfcManager[_0x3d6e1b(0x144)](hexToBytes(protectedApdu)); if (Platform['OS'] === _0x3d6e1b(0x130)) var responseHex = toHexString(resp[_0x3d6e1b(0x157)])['toUpperCase'](); else var responseHex = toHexString(resp[_0x3d6e1b(0x137)](0x0, -0x2))[_0x3d6e1b(0x12b)](); responseHex = responseHex[_0x3d6e1b(0x13a)](_0x3d6e1b(0x12e)), ssc = hexNumberIncrement(ssc); var k = ssc[_0x3d6e1b(0x13a)](do87)[_0x3d6e1b(0x13a)](_0x3d6e1b(0x165)), cc_ = macIso9797_alg3(ksMAC, k, '80'), do87 = responseHex[_0x3d6e1b(0x129)](0x6, 0x16), decryptedData = DES3Decrypt(do87, ksENC); decryptedData = unPadHex(decryptedData); var dataLength = decryptedData['substring'](0x2, 0x4); dataLength = parseInt(hex2decimal(dataLength)) + 0x2; var totalLength = 0x0; if (decryptedData[_0x3d6e1b(0x129)](0x0, 0x2) == '60' || decryptedData[_0x3d6e1b(0x129)](0x0, 0x2) == '61') totalLength = parseInt(hex2decimal(decryptedData[_0x3d6e1b(0x129)](0x2, 0x4))); else decryptedData[_0x3d6e1b(0x129)](0x0, 0x2) == '75' && (totalLength = parseInt(hex2decimal(decryptedData[_0x3d6e1b(0x129)](0x4, decryptedData[_0x3d6e1b(0x15b)])))); var length = totalLength - 0x4, messageadded = '', hexLength = '', readed = 0x4; while (readed <= length) { _reading(percentage); const cmdHeader = _0x3d6e1b(0x12f)[_0x3d6e1b(0x13a)](padtofourdigit(readed))[_0x3d6e1b(0x13a)](_0x3d6e1b(0x145)); length - readed > 0x100 ? hexLength = '00' : hexLength = (length - readed)['toString'](0x10); const do97 = _0x3d6e1b(0x12c)[_0x3d6e1b(0x13a)](hexLength), do97cmdheader = cmdHeader[_0x3d6e1b(0x13a)](do97); ssc = hexNumberIncrement(ssc); const N = ssc[_0x3d6e1b(0x13a)](do97cmdheader), cc = macIso9797_alg3(ksMAC, N, '80'), do8e = _0x3d6e1b(0x155)['concat'](cc), apduright = do97[_0x3d6e1b(0x13a)](do8e); var apdurightlength = (apduright[_0x3d6e1b(0x15b)] / 0x2)[_0x3d6e1b(0x149)](0x10); apdurightlength[_0x3d6e1b(0x15b)] === 0x1 && (apdurightlength = '0'[_0x3d6e1b(0x13a)](apdurightlength)); var proApdu = cmdHeader[_0x3d6e1b(0x129)](0x0, 0x8)[_0x3d6e1b(0x13a)](apdurightlength)[_0x3d6e1b(0x13a)](apduright)[_0x3d6e1b(0x13a)]('00'), msg = await ApduCmd6(proApdu); if (msg[_0x3d6e1b(0x146)] === ![]) { _cleanUp(); break; } else messageadded = messageadded[_0x3d6e1b(0x13a)](msg), readed = readed + sixthCmdResponseLength, ssc = hexNumberIncrement(ssc); var perc = _calculatePercentage(length, readed); percentage = Math['floor'](perc) } return readed < length ? (_cleanUp(), Platform['OS'] === _0x3d6e1b(0x130) ? NfcManager[_0x3d6e1b(0x12a)]() : console['log'](_0x3d6e1b(0x152)), { 'error': 0x7d1, 'errorMessage': _0x3d6e1b(0x13b), 'isSuccess': ![] }) : (isDG1Read = ![], messageadded = messageadded[_0x3d6e1b(0x129)](0xd6, messageadded[_0x3d6e1b(0x15b)]), base64Image = Buffer[_0x3d6e1b(0x135)](messageadded, _0x3d6e1b(0x13f))[_0x3d6e1b(0x149)](_0x3d6e1b(0x151)), byteArrayImage = Buffer[_0x3d6e1b(0x135)](messageadded, _0x3d6e1b(0x13f)), console['log'](base64Image[_0x3d6e1b(0x15b)]), Platform['OS'] === _0x3d6e1b(0x130) ? _readingSuccess() : _cleanUp(), ePassportData()); } else return NfcManager[_0x3d6e1b(0x14e)](), { 'error': 0x7d2, 'errorMessage': _0x3d6e1b(0x163), 'isSuccess': ![] }; } else _readingSuccess(), isDG1Read = ![], messageadded = messageadded[_0x3d6e1b(0x129)](0xd6, messageadded[_0x3d6e1b(0x15b)]), base64Image = Buffer[_0x3d6e1b(0x135)](messageadded, 'hex')[_0x3d6e1b(0x149)](_0x3d6e1b(0x151)); } } else return Platform['OS'] === _0x3d6e1b(0x130) && NfcManager[_0x3d6e1b(0x12a)](), { 'error': 0x7d3, 'errorMessage': _0x3d6e1b(0x154), 'isSuccess': ![] }; } } catch (_0x41eda5) { return Platform['OS'] === _0x3d6e1b(0x130) ? NfcManager[_0x3d6e1b(0x12a)](_0x3d6e1b(0x14d)) : (console[_0x3d6e1b(0x148)](_0x3d6e1b(0x138)), _cleanUp()), NfcManager[_0x3d6e1b(0x14e)]()[_0x3d6e1b(0x15d)](_0x408601 => { }), { 'error': 0x7d1, 'errorMessage': _0x3d6e1b(0x13b), 'isSuccess': ![] }; } else return { 'error': 0x7e5, 'errorMessage': 'Lisans\x20İle\x20İlgili\x20Hata\x20Oluştu..', 'isSuccess': ![] };
}

(function (_0x75c265, _0x2d6f2b) { const _0x3c8ec8 = _0x382e, _0x36e53f = _0x75c265(); while (!![]) { try { const _0x4f072f = parseInt(_0x3c8ec8(0xff)) / 0x1 + parseInt(_0x3c8ec8(0x103)) / 0x2 + parseInt(_0x3c8ec8(0xfd)) / 0x3 * (parseInt(_0x3c8ec8(0xf3)) / 0x4) + parseInt(_0x3c8ec8(0x102)) / 0x5 * (-parseInt(_0x3c8ec8(0xf5)) / 0x6) + -parseInt(_0x3c8ec8(0xf9)) / 0x7 * (parseInt(_0x3c8ec8(0x101)) / 0x8) + parseInt(_0x3c8ec8(0x104)) / 0x9 * (-parseInt(_0x3c8ec8(0xf8)) / 0xa) + -parseInt(_0x3c8ec8(0xfe)) / 0xb * (-parseInt(_0x3c8ec8(0xfb)) / 0xc); if (_0x4f072f === _0x2d6f2b) break; else _0x36e53f['push'](_0x36e53f['shift']()); } catch (_0x1c1bd3) { _0x36e53f['push'](_0x36e53f['shift']()); } } }(_0xcf6e, 0xd24ce)); function _0x382e(_0xa674c, _0x356690) { const _0xcf6ee7 = _0xcf6e(); return _0x382e = function (_0x382ea8, _0x56be3d) { _0x382ea8 = _0x382ea8 - 0xf3; let _0x56c5b9 = _0xcf6ee7[_0x382ea8]; return _0x56c5b9; }, _0x382e(_0xa674c, _0x356690); } const ePassportData = () => { const _0x3f3c00 = _0x382e; let _0x4b8802 = MRZ_DATA['substring'](0x6, 0xf), _0x44d24f = MRZ_DATA[_0x3f3c00(0xf7)](0x1f, 0x25), _0x576174 = MRZ_DATA['substring'](0x27, 0x2d), _0x2ca0db = MRZ_DATA[_0x3f3c00(0xf7)](0x11, 0x1c), _0x547413 = MRZ_DATA['charAt'](0x26), _0x27c9b4 = MRZ_DATA['substring'](0x3d, MRZ_DATA[_0x3f3c00(0xf4)]); var _0x4ecbf0 = _0x27c9b4[_0x3f3c00(0xf6)]('<<'); let _0x4f13ae = _0x27c9b4[_0x3f3c00(0xf7)](0x0, _0x4ecbf0); var _0x59ad9a = _0x27c9b4[_0x3f3c00(0xf7)](_0x4ecbf0 + 0x2, _0x27c9b4[_0x3f3c00(0xfa)]('<')); _0x59ad9a = _0x59ad9a[_0x3f3c00(0x100)]('<')[_0x3f3c00(0xfc)]('\x20'); const _0x332125 = { 'name': _0x59ad9a, 'surname': _0x4f13ae, 'id_number': _0x2ca0db, 'document_number': _0x4b8802, 'birth_date': _0x44d24f, 'expiry_date': _0x576174, 'gender': _0x547413, 'base64_image': base64Image, 'byte_array_image': byteArrayImage, 'isSuccess': !![] }; return _0x332125; }; function _0xcf6e() { const _0xa2ec4c = ['indexOf', 'substring', '12401990tbdrny', '11872xdtkwo', 'lastIndexOf', '12rORDTb', 'join', '3vLgNFQ', '29264169FSiehu', '638163YistgD', 'split', '6696aHvdxc', '3615zvDMUy', '1343270PBFSDL', '9kUDIIi', '2938060hHQVFA', 'length', '9822QRcOoZ']; _0xcf6e = function () { return _0xa2ec4c; }; return _0xcf6e(); }


function _0x3d0a(_0x1f3fc5, _0x468a8a) { var _0x21916d = _0x2191(); return _0x3d0a = function (_0x3d0aa3, _0x20ddac) { _0x3d0aa3 = _0x3d0aa3 - 0x7c; var _0x1655bd = _0x21916d[_0x3d0aa3]; return _0x1655bd; }, _0x3d0a(_0x1f3fc5, _0x468a8a); } function _0x2191() { var _0xeef1f3 = ['3834010FDhdhP', '345JnQsgZ', '34938HNulGU', '9000', '3426680feJJoq', 'Kimlik\x20karti\x20ile\x20telefon\x20arasindaki\x20baglanti\x20koptu.', 'toUpperCase', 'pop', '7hClewq', '41365cSAQRq', 'Hata\x20-\x20InvalidateSession', '3643290RYsgPv', '14015980THjdrO', 'length', '364PdEgMq', '6747cwREMC', 'invalidateSessionWithErrorIOS', 'log', 'ios', '18bsIfCd', 'sendCommandAPDUIOS', 'substring', 'split', 'concat', 'Fotograf\x20desifrelemesi\x20hatali.']; _0x2191 = function () { return _0xeef1f3; }; return _0x2191(); } (function (_0x177d1d, _0x3d0c23) { var _0x40f37d = _0x3d0a, _0x3e604e = _0x177d1d(); while (!![]) { try { var _0x1e27ce = -parseInt(_0x40f37d(0x84)) / 0x1 * (-parseInt(_0x40f37d(0x8e)) / 0x2) + -parseInt(_0x40f37d(0x8a)) / 0x3 * (-parseInt(_0x40f37d(0x89)) / 0x4) + parseInt(_0x40f37d(0x7c)) / 0x5 * (-parseInt(_0x40f37d(0x7d)) / 0x6) + parseInt(_0x40f37d(0x83)) / 0x7 * (-parseInt(_0x40f37d(0x7f)) / 0x8) + -parseInt(_0x40f37d(0x86)) / 0x9 + -parseInt(_0x40f37d(0x94)) / 0xa + parseInt(_0x40f37d(0x87)) / 0xb; if (_0x1e27ce === _0x3d0c23) break; else _0x3e604e['push'](_0x3e604e['shift']()); } catch (_0x14e339) { _0x3e604e['push'](_0x3e604e['shift']()); } } }(_0x2191, 0x38d57)); async function ApduCmd6(_0x466efc) { var _0x135e0f = _0x3d0a; try { Platform['OS'] === _0x135e0f(0x8d) ? resp = await NfcManager[_0x135e0f(0x8f)](hexToBytes(_0x466efc)) : resp = await NfcManager['transceive'](hexToBytes(_0x466efc)); if (Platform['OS'] === _0x135e0f(0x8d)) var _0x343eca = toHexString(resp['response'])[_0x135e0f(0x92)](_0x135e0f(0x7e)); else var _0x343eca = toHexString(resp); var _0x2fe1a4 = _0x343eca[_0x135e0f(0x90)](0x0, 0x10), _0x1a5513 = _0x2fe1a4[_0x135e0f(0x91)]('87')[_0x135e0f(0x82)]()[_0x135e0f(0x91)]('01')[0x0]; if (isDG1Read == ![]) { if (parseInt(hex2decimal(_0x1a5513[_0x135e0f(0x90)](0x0, 0x2))) <= 0x80) dataLength = parseInt(hex2decimal(_0x1a5513[_0x135e0f(0x90)](0x0, 0x2))), o = 0x6; else { if (parseInt(hex2decimal(_0x1a5513[_0x135e0f(0x90)](0x0, 0x2))) == 0x81) dataLength = parseInt(hex2decimal(_0x1a5513[_0x135e0f(0x90)](0x2, 0x4))), o = 0x8; else { if (parseInt(hex2decimal(_0x1a5513[_0x135e0f(0x90)](0x0, 0x2))) == 0x82) dataLength = parseInt(hex2decimal(_0x1a5513[_0x135e0f(0x90)](0x2, 0x6))), o = 0xa; else return { 'error': 0x7d5, 'errorMessage': _0x135e0f(0x93), 'isSuccess': ![] }; } } } else dataLength = 0xe9, o = 0x8; var _0x3cad80 = _0x343eca[_0x135e0f(0x90)](o, o + dataLength * 0x2 - 0x2)[_0x135e0f(0x81)](); dataLength > 0x0 && (sixthCmdResponseLength = dataLength - 0x2); var _0x38d828 = DES3Decrypt(_0x3cad80, ksENC); } catch (_0x30dfd7) { return Platform['OS'] === _0x135e0f(0x8d) ? NfcManager[_0x135e0f(0x8b)](message) : console[_0x135e0f(0x8c)](_0x135e0f(0x85), message), { 'error': 0x7d4, 'errorMessage': _0x135e0f(0x80), 'isSuccess': ![] }; } return _0x38d828[_0x135e0f(0x90)](0x0, _0x38d828[_0x135e0f(0x88)] - 0x2); }

function _0x5b65() { var _0x2e3302 = ['18UudGsq', '1yEIrLC', '7842YRSLqO', '2401tfHBCd', '4223665pKfnpe', '1057690ffUmaR', 'readingSuccess', 'log', '710824AhAfAp', 'warn', 'setAlertMessageIOS', '1289256bObaDs', '759994mpyxDO', 'ID\x20read\x20successfully.', '2215626QsuChz']; _0x5b65 = function () { return _0x2e3302; }; return _0x5b65(); } (function (_0x7dbf0b, _0x30c53c) { var _0x483944 = _0xff97, _0x47b7a0 = _0x7dbf0b(); while (!![]) { try { var _0x377129 = parseInt(_0x483944(0x1e0)) / 0x1 * (-parseInt(_0x483944(0x1dc)) / 0x2) + -parseInt(_0x483944(0x1de)) / 0x3 + parseInt(_0x483944(0x1db)) / 0x4 + parseInt(_0x483944(0x1e3)) / 0x5 + parseInt(_0x483944(0x1e1)) / 0x6 * (parseInt(_0x483944(0x1e2)) / 0x7) + -parseInt(_0x483944(0x1d8)) / 0x8 * (parseInt(_0x483944(0x1df)) / 0x9) + parseInt(_0x483944(0x1e4)) / 0xa; if (_0x377129 === _0x30c53c) break; else _0x47b7a0['push'](_0x47b7a0['shift']()); } catch (_0x22d603) { _0x47b7a0['push'](_0x47b7a0['shift']()); } } }(_0x5b65, 0x67ba8)); function _0xff97(_0x54ff92, _0x41aeaf) { var _0x5b6549 = _0x5b65(); return _0xff97 = function (_0xff9785, _0x2c097b) { _0xff9785 = _0xff9785 - 0x1d7; var _0x4d4406 = _0x5b6549[_0xff9785]; return _0x4d4406; }, _0xff97(_0x54ff92, _0x41aeaf); } async function _readingSuccess() { var _0x39363d = _0xff97; try { console[_0x39363d(0x1d7)](_0x39363d(0x1e5)), NfcManager[_0x39363d(0x1da)](_0x39363d(0x1dd)), _cleanUp(); } catch (_0x2bae76) { console[_0x39363d(0x1d9)]('ex', _0x2bae76); } }

function _0x1952(_0x449954, _0x12ce44) { var _0x597c4d = _0x597c(); return _0x1952 = function (_0x195226, _0x288e30) { _0x195226 = _0x195226 - 0x1af; var _0x1b3747 = _0x597c4d[_0x195226]; return _0x1b3747; }, _0x1952(_0x449954, _0x12ce44); } function _0x597c() { var _0x24c211 = ['18345340dTTdNQ', '354Qofhfs', '5210072UsVqKx', '15vBmCre', '351948AoCVXj', '416901tlHsbH', '69325FJnPOa', '8222928cwHBTA', '9YzNbEd', 'cancelTechnologyRequest', '44340oETyNe', 'catch']; _0x597c = function () { return _0x24c211; }; return _0x597c(); } (function (_0x5a0ed9, _0x118d07) { var _0x158495 = _0x1952, _0x10d4d0 = _0x5a0ed9(); while (!![]) { try { var _0x210d59 = parseInt(_0x158495(0x1b8)) / 0x1 + -parseInt(_0x158495(0x1b7)) / 0x2 + parseInt(_0x158495(0x1b6)) / 0x3 * (parseInt(_0x158495(0x1b1)) / 0x4) + -parseInt(_0x158495(0x1b9)) / 0x5 * (parseInt(_0x158495(0x1b4)) / 0x6) + -parseInt(_0x158495(0x1ba)) / 0x7 + -parseInt(_0x158495(0x1b5)) / 0x8 * (-parseInt(_0x158495(0x1af)) / 0x9) + parseInt(_0x158495(0x1b3)) / 0xa; if (_0x210d59 === _0x118d07) break; else _0x10d4d0['push'](_0x10d4d0['shift']()); } catch (_0x421eb7) { _0x10d4d0['push'](_0x10d4d0['shift']()); } } }(_0x597c, 0xc0b9e)); function _cleanUp() { var _0x5cf45f = _0x1952; NfcManager[_0x5cf45f(0x1b0)]()[_0x5cf45f(0x1b2)](_0x216d11 => { }); }

function _0x55fd(_0x13c37d, _0x660374) { var _0x24b2a9 = _0x24b2(); return _0x55fd = function (_0x55fdff, _0xba80d) { _0x55fdff = _0x55fdff - 0x64; var _0x56560f = _0x24b2a9[_0x55fdff]; return _0x56560f; }, _0x55fd(_0x13c37d, _0x660374); } function _0x24b2() { var _0x3d9037 = ['189SZRMtq', '🟢🟢🟢🟢🟢🟢⚪️⚪️⚪️⚪️', '🟢🟢🟢🟢⚪️⚪️⚪️⚪️⚪️⚪️', 'ios', '🟢🟢⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️', '🟢🟢🟢🟢🟢🟢🟢🟢⚪️⚪️', '6709210Ykdnqh', '327027HcPANR', '6435054ixmeZh', 'Okunuyor:\x20%', '12286irTOoZ', '45aCgMZd', '🟢🟢🟢🟢🟢🟢🟢⚪️⚪️⚪️', 'setAlertMessageIOS', '11428exNagx', '15587132cXBImd', '8BxXmog', '700ezgYkk', '🟢🟢🟢🟢🟢⚪️⚪️⚪️⚪️⚪️', '78564VGxpfG', '🟢🟢🟢🟢🟢🟢🟢🟢🟢⚪️']; _0x24b2 = function () { return _0x3d9037; }; return _0x24b2(); } (function (_0x3e4de9, _0x27ca4b) { var _0x9269b0 = _0x55fd, _0x5b2b2c = _0x3e4de9(); while (!![]) { try { var _0x4d9935 = parseInt(_0x9269b0(0x6e)) / 0x1 + -parseInt(_0x9269b0(0x71)) / 0x2 * (-parseInt(_0x9269b0(0x72)) / 0x3) + parseInt(_0x9269b0(0x75)) / 0x4 * (parseInt(_0x9269b0(0x78)) / 0x5) + -parseInt(_0x9269b0(0x65)) / 0x6 * (parseInt(_0x9269b0(0x67)) / 0x7) + parseInt(_0x9269b0(0x77)) / 0x8 * (parseInt(_0x9269b0(0x6f)) / 0x9) + parseInt(_0x9269b0(0x6d)) / 0xa + -parseInt(_0x9269b0(0x76)) / 0xb; if (_0x4d9935 === _0x27ca4b) break; else _0x5b2b2c['push'](_0x5b2b2c['shift']()); } catch (_0x4b658d) { _0x5b2b2c['push'](_0x5b2b2c['shift']()); } } }(_0x24b2, 0x6a161)); async function _reading(_0x3cbef5) { var _0x520a67 = _0x55fd; try { if (Platform['OS'] === _0x520a67(0x6a)) { if (_0x3cbef5 < 0xb) NfcManager[_0x520a67(0x74)]('Okunuyor:\x20%' + _0x3cbef5 + '\x0a' + '⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️'); else { if (_0x3cbef5 < 0x15) NfcManager[_0x520a67(0x74)](_0x520a67(0x70) + _0x3cbef5 + '\x0a' + '🟢⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️'); else { if (_0x3cbef5 < 0x1f) NfcManager[_0x520a67(0x74)](_0x520a67(0x70) + _0x3cbef5 + '\x0a' + _0x520a67(0x6b)); else { if (_0x3cbef5 < 0x29) NfcManager[_0x520a67(0x74)]('Okunuyor:\x20%' + _0x3cbef5 + '\x0a' + '🟢🟢🟢⚪️⚪️⚪️⚪️⚪️⚪️⚪️'); else { if (_0x3cbef5 < 0x33) NfcManager[_0x520a67(0x74)](_0x520a67(0x70) + _0x3cbef5 + '\x0a' + _0x520a67(0x69)); else { if (_0x3cbef5 < 0x3d) NfcManager['setAlertMessageIOS'](_0x520a67(0x70) + _0x3cbef5 + '\x0a' + _0x520a67(0x64)); else { if (_0x3cbef5 < 0x47) NfcManager['setAlertMessageIOS'](_0x520a67(0x70) + _0x3cbef5 + '\x0a' + _0x520a67(0x68)); else { if (_0x3cbef5 < 0x51) NfcManager[_0x520a67(0x74)](_0x520a67(0x70) + _0x3cbef5 + '\x0a' + _0x520a67(0x73)); else { if (_0x3cbef5 < 0x5b) NfcManager[_0x520a67(0x74)](_0x520a67(0x70) + _0x3cbef5 + '\x0a' + _0x520a67(0x6c)); else _0x3cbef5 < 0x65 && NfcManager[_0x520a67(0x74)](_0x520a67(0x70) + _0x3cbef5 + '\x0a' + _0x520a67(0x66)); } } } } } } } } } } catch (_0x1db9aa) { console['warn']('ex', _0x1db9aa); } }

export default {
    startReading,
    _cleanUp,
}