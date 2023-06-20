
/**
 * 
 * call 的概念:
 * call是改变函数改变this指向的函数,第一个参数为需要把谁当做是执行上下文,参数以a1,a2,a3...传递
 */
// 例如:
const obj = {
    a: 1
}

function func(value1, value2){
    console.log(value1, value2)
    console.log(this)
}

func.call(obj, 'value1', 'value2')
// 得到的结果:
// value1 value2
// { a: 1 }

// 思路:
// 把需要把obj修改为执行上下文其实将func当做是obj的一个属性,然后执行
/**
 * 
 * @param {执行上下文this} context 
 * @param { 需要传递的数据参数 } args
 */
Function.prototype.myCall = function (context, ...args) {
   const args1 = args || [] ;// 传染进来的args经过解构变成数组 [1,2,3,4]

   const thisObj = context || window ;// 默认为window对象 如果context并没有传递数据将window改为执行上下文
   const func = this;
   const key = Symbol();// 唯一值,防止在context中包含了该属性

   thisObj[key] = func;
   const res =  thisObj[key](...args1) // 如果func有返回值
   delete thisObj[key];
   return res

}

// 测试

func.myCall(obj, 'value1', 'value2')
// 看看obj是否和以前一致
console.log(obj)