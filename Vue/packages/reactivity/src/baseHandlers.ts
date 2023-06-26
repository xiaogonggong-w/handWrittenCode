import { track, trigger } from "./effect"
/**
 * getter回调函数
 */
const get = createGetter()

/**
 * setter回调函数
 */
const set = createSetter()


function createGetter() {
  return function get(target: object, key: string | symbol, receiver: object){
    // 使用反射得到返回值,好处是会返回一个布尔值   
    const res = Reflect.get(target, key, receiver)

    // 收集依赖
    track(target, key)
    return res
  }
}

function createSetter(){
    return function set(target: object, key: string| symbol , val: unknown, receiver: object){
        // 使用反射设置一个新值
        const result = Reflect.set(target, key, val, receiver)

        // 触发依赖
        trigger(target, key, val)
        return result
    }
}


// 创建响应式的handler
export const mutableHandler: ProxyHandler<object> = {
    get, set
}
