var Vue = (function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var createDep = function (effects) {
        var dep = new Set(effects);
        return dep;
    };

    /**
     * 当前的effect
     */
    var activeEffect;
    /**
     * 收集获取依赖的WeakMap实例
     * 1. key:响应式对象
     * 2. value为map对象
     *  keyToDepMap: 1.key为响应式对象的指定属性
     *               2. val为指定对象的指定属性的执行函数
     */
    var targetMap = new WeakMap();
    /**
     * 用于收集依赖的方法, 在getter执行时会被触发
     * @param target weakmap的key
     * @param key 代理对象的key, 当依赖被触发时,需要根据该key获取
     */
    function track(target, key) {
        console.log("track");
        // 如果当前不存在执行函数, 则直接return
        if (!activeEffect)
            return;
        // 尝试从depsMa中根据target获取map
        var depsMap = targetMap.get(target);
        // 如果获取到的map不存在,则生成新的map对象,并把该对象赋值给对应的value
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        var dep = depsMap.get(key);
        // 如果dep不存在,则生成一个新的dep,并放入到desMap中
        if (!dep) {
            depsMap.set(key, (dep = createDep()));
        }
        // 现在的targetMap大概是这样:
        /**
         *  targetMap是通过map:
         *    key为target,
         *    value: 是一个depsMap
         *       depsMap: 是一个map
         *          key: 为响应式对象触发getter函数的key值
         *          value: 为存放多个effect触发的函数数组
         */
        // 为指定的map,指定key,设置回调函数
        trackEffects(dep);
    }
    function trackEffects(dep) {
        dep.add(activeEffect);
    }
    /**
     * 用于触发依赖的方法,在setter执行时会被触发
     * @param target weakmap的kay
     * @param key 代理对象的key值,当依赖被触发时,需要根据该key值获取
     * @param val 指定key的最新值
     */
    function trigger(target, key, val) {
        console.log('trigger');
        // 依据target获取存储的map实例
        var depsMap = targetMap.get(target);
        // 如果map不存在, 则直接返回return
        if (!depsMap)
            return;
        // // 根据key从depsMap中取出value, 该value值是一个reactiveEffect类型的数据
        // const effect = depsMap.get(key)!;
        // // 如果effect不存在,则直接return
        // if (!effect) {
        //     return
        // }
        // 依据指定的key,获取dep实例
        var deps = depsMap.get(key);
        // 如果没有直接返回
        if (!deps) {
            return;
        }
        // 触发deps
        triggerEffects(deps);
    }
    /**
     * 依次触发dep中保存的依赖
     * @param dep 存放Dep中保存的函数
     */
    function triggerEffects(dep) {
        var e_1, _a;
        // 将dep这个set转成数组
        var effects = Array.isArray(dep) ? dep : __spreadArray([], __read(dep), false);
        try {
            // 依次触发
            for (var effects_1 = __values(effects), effects_1_1 = effects_1.next(); !effects_1_1.done; effects_1_1 = effects_1.next()) {
                var effect_1 = effects_1_1.value;
                triggerEffect(effect_1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (effects_1_1 && !effects_1_1.done && (_a = effects_1.return)) _a.call(effects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    // 触发指定的依赖
    function triggerEffect(effect) {
        effect.run();
    }
    /**
     * 响应式触发依赖时的执行类
     */
    var ReactiveEffect = /** @class */ (function () {
        function ReactiveEffect(fn) {
            this.fn = fn;
        }
        ReactiveEffect.prototype.run = function () {
            // 将activeEffect 赋值为this
            activeEffect = this;
            return this.fn();
        };
        return ReactiveEffect;
    }());
    /**
     *
     * @param fn 执行的方法
     * @returns 以ReactiveEffect 实例为this的执行函数
     */
    function effect(fn) {
        // 生成ReactiveEffect 实例
        var _effect = new ReactiveEffect(fn);
        _effect.run();
    }

    /**
     * getter回调函数
     */
    var get = createGetter();
    /**
     * setter回调函数
     */
    var set = createSetter();
    function createGetter() {
        return function get(target, key, receiver) {
            // 使用反射得到返回值,好处是会返回一个布尔值   
            var res = Reflect.get(target, key, receiver);
            // 收集依赖
            track(target, key);
            return res;
        };
    }
    function createSetter() {
        return function set(target, key, val, receiver) {
            // 使用反射设置一个新值
            var result = Reflect.set(target, key, val, receiver);
            // 触发依赖
            trigger(target, key);
            return result;
        };
    }
    // 创建响应式的handler
    var mutableHandler = {
        get: get,
        set: set
    };

    /**
     * 创建响应式的map缓存对象
     * key: target
     * val: proxy
     */
    var reactiveMap = new WeakMap();
    function reactive(target) {
        return createReactiveObject(target, mutableHandler, reactiveMap);
    }
    /**
     * 创建响应式对象
     * @param target 被代理的对象
     * @param baseHandlers  handlers
     * @param proxyMap 缓存响应式对象的weakmap
     */
    function createReactiveObject(target, baseHandlers, proxyMap) {
        // 如果该实例被代理,就直接从缓存中拿
        var targetProxy = proxyMap.get(target);
        if (targetProxy) {
            return targetProxy;
        }
        // 未被代理的需要生成proxy实例
        var proxy = new Proxy(target, baseHandlers);
        // 缓存起来
        proxyMap.set(target, proxy);
        return proxy;
    }

    exports.effect = effect;
    exports.reactive = reactive;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=vue.js.map
