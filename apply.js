/**
 * apply也是改变函数的this执行的,但是它的第二个参数是以数组的形式传递
 */

const obj = {
    a: 1
}
function func(value1, value2){
    console.log(this)
    console.log(value1, value2)
}

func.apply(obj, ['value1', 'value2'])

Function.prototype.myApply = function(context, args){

    const thisObj = context || window
    const key = Symbol()
    thisObj[key] = this

    const res = thisObj[key](...args)

    delete thisObj[key]
    return res
}

// 测试
func.myApply(obj, ['value1', 'value2'])