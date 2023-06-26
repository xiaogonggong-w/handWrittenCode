import { Dep, createDep } from "./dep";
type KeyToDepMap = Map<any, Dep>
/**
 * 当前的effect
 */
export let activeEffect: ReactiveEffect | undefined;


/**
 * 收集获取依赖的WeakMap实例
 * 1. key:响应式对象
 * 2. value为map对象
 *  keyToDepMap: 1.key为响应式对象的指定属性
 *               2. val为指定对象的指定属性的执行函数
 */
const targetMap = new WeakMap<any, KeyToDepMap>()


/**
 * 用于收集依赖的方法, 在getter执行时会被触发
 * @param target weakmap的key
 * @param key 代理对象的key, 当依赖被触发时,需要根据该key获取
 */
export function track(target: object, key: unknown) {
    console.log("track")
    // 如果当前不存在执行函数, 则直接return
    if (!activeEffect) return

    // 尝试从depsMa中根据target获取map
    let depsMap = targetMap.get(target);
    // 如果获取到的map不存在,则生成新的map对象,并把该对象赋值给对应的value
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key);

    // 如果dep不存在,则生成一个新的dep,并放入到desMap中
    if (!dep) {
        depsMap.set(key, (dep = createDep()))
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
    trackEffects(dep)
}

export function trackEffects(dep: Dep) {
    dep.add(activeEffect!)
}
/**
 * 用于触发依赖的方法,在setter执行时会被触发
 * @param target weakmap的kay
 * @param key 代理对象的key值,当依赖被触发时,需要根据该key值获取
 * @param val 指定key的最新值
 */
export function trigger(target: object, key: unknown, val: unknown) {
    console.log('trigger')
    // 依据target获取存储的map实例
    const depsMap = targetMap.get(target);

    // 如果map不存在, 则直接返回return
    if (!depsMap) return

    // // 根据key从depsMap中取出value, 该value值是一个reactiveEffect类型的数据

    // const effect = depsMap.get(key)!;

    // // 如果effect不存在,则直接return
    // if (!effect) {
    //     return
    // }

    // 依据指定的key,获取dep实例
    let deps: Dep | undefined = depsMap.get(key);

    // 如果没有直接返回
    if (!deps) {
        return
    }
    // 触发deps
    triggerEffects(deps)
}

/**
 * 依次触发dep中保存的依赖
 * @param dep 存放Dep中保存的函数
 */
export function triggerEffects(dep: Dep) {

    // 将dep这个set转成数组
    const effects = Array.isArray(dep) ? dep : [...dep]
    // 依次触发
    for (const effect of effects) {
        triggerEffect(effect)
    }
}


// 触发指定的依赖
export function triggerEffect(effect: ReactiveEffect) {
    effect.run()
}

/**
 * 响应式触发依赖时的执行类
 */
export class ReactiveEffect<T = any>{

    constructor(public fn: () => T) {

    }

    run() {
        // 将activeEffect 赋值为this
        activeEffect = this;
        return this.fn();
    }
}
/**
 * 
 * @param fn 执行的方法
 * @returns 以ReactiveEffect 实例为this的执行函数
 */
export function effect<T = any>(fn: () => T) {
    // 生成ReactiveEffect 实例
    const _effect = new ReactiveEffect(fn)
    _effect.run()
}