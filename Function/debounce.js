
/**
 * 防抖函数： 在一段时间之内点击第一次然后在delay时间内再次点击，需要将第一次清除，从第二次开始计时
 * @param {回调函数} fn 
 * @param {延迟时间} delay 
 */
function debounce(fn, delay) {
    let timer = null;

    return function (...args) {
        timer && clearTimeout(timer)

        timer = setTimeout(function () {
            fn.apply(this, args)
            clearTimeout(timer)
            timer = null
        }, delay)
    }
}

function foo(a, b, c) {
    console.log(a, b, c)
}


const debounceTest = debounce(foo, 3000)

debounceTest('第一次')


setTimeout(() => {
    debounceTest('第二次')
}, 2000)