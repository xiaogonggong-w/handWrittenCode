
const obj = new Set([ [ 'name', '1' ], [ 'age', '10' ] ]) 

console.log(Object.fromEntries(obj))

Object.prototype.myEntries = function(array){
   const result = {}

   if(array && typeof array !== null && typeof array !== undefined && typeof obj[Symbol.iterator] === 'function'){
       array = [...array] // 数组化
       for (let index = 0; index < array.length; index++) {
        result[array[index][0]] =  array[index][1]
        
       }
    }else{
        throw new Error('array必须是一个可迭代的对象')
    }
    return result;
}
console.log(Object.myEntries(obj))