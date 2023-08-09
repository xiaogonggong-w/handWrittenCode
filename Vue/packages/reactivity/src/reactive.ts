
import { isObject } from "@vue/shared";
import { mutableHandler } from "./baseHandlers";

/**
 * 创建响应式的map缓存对象
 * key: target
 * val: proxy
 */
export const reactiveMap = new WeakMap<object, any>()


export function reactive(target: object) {
    return createReactiveObject(target, mutableHandler, reactiveMap)
}


/**
 * 创建响应式对象
 * @param target 被代理的对象
 * @param baseHandlers  handlers
 * @param proxyMap 缓存响应式对象的weakmap 
 */
function createReactiveObject(target: object, baseHandlers: ProxyHandler<any>, proxyMap: WeakMap<object, any>) {
    // 如果该实例被代理,就直接从缓存中拿
    const targetProxy = proxyMap.get(target)
    if (targetProxy) {
        return targetProxy
    }

    // 未被代理的需要生成proxy实例
    const proxy = new Proxy(target, baseHandlers)

    // 缓存起来
    proxyMap.set(target, proxy)
    return proxy

}

export const toReactive = <T extends unknown>(value: T): T =>
    isObject(value) ? reactive(value) : value