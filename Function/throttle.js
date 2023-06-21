
/**
 * 节流函数： 在一段时间内的点击只按照第一次计算，每个时间周期都是这样
 * @param {回调函数} fn 
 * @param {延时时间} delay 
 */
function throttle(fn, delay){
  let timer = null
  return function(...args){
    if(timer === null){
        timer = setTimeout(function(){
             fn.apply(this, args)
             clearTimeout(timer)
             timer = null
        }, delay)
    }
  }
}


function foo(a, b, c) {
    console.log(a, b, c)
}


const throttleTest = throttle(foo, 3000)

throttleTest('第一次')


setTimeout(() => {
    throttleTest('第二次')
}, 2000)