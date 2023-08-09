/**
 * 1.ref函数是如何进行的
 * 2.ref函数是如何构建简单数据类型的
 * 3.为什么ref类型的数据，必须要通过.value访问
 */

import { createDep, Dep } from "./dep";
import { activeEffect, trackEffects } from "./effect";
import { toReactive } from "./reactive";

export interface Ref<T = any>{
    value: T
}

/**
 * ref函数
 * @param value unknown
 * @returns 
 */
export function ref(value?:unknown){
    return createRef(value, false)
}

/**
 * 
 * @param rawValue 原始数据
 * @param shallow boolean数据，表示浅层响应式，只有.value是响应式的
 */
function createRef(rawValue: unknown, shallow: boolean){
    if(isRef(rawValue)){
        return rawValue
    }
    return new RefImpl(rawValue, shallow)
}

class RefImpl<T>{
    private _value: T

    public dep?: Dep = undefined
}

export function isRef(r: any): r is Ref{
    return !!(r && r._v_isRef === true)
}