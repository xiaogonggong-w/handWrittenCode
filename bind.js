
function func(a, b, c, d) {
    console.log(a, b, c, d, this)
}

const obj = {
    name: 'obj'
}

func.bind(obj, 1, 2)(3, 4)
// bind不仅不会返回一个新的对象，同时还能达到函数柯里化

Function.prototype.myBind = function () {
    // 将传进来的参数进行数组化
    const argumentList = Array.from(arguments)
    // 第一个参数就是要被当做this的
    const thisObj = argumentList.shift() || window;

    // 同时还要获取一下this
    const thisFun = this

    // bind会返回一个新的对象，还可能会传递新的参数
    return function (...args) {
        // args是返回出去的函数传递的参数
        thisFun.call(thisObj, ...argumentList, ...args)
    }
}

function myFunc(a, b, c, d) {
    console.log(a, b, c, d, this)
}

const myObj = {
    name: 'myObj'
}
myFunc.myBind(myObj, 1, 2)(3, 4)