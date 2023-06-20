
const obj = {
    name:"1",
    age: '10'
}


console.log(Object.entries())

Object.prototype.myEntries = function(obj){
   const result = []
    if(obj instanceof Object){
       for (const key in obj) {
         if(obj.hasOwnProperty(key)){
            const arr = [key, obj[key]]
            result.push(arr)
         }
       }
    }else{
        throw new Error('obj必须是一个对象类型')
    }
    return result;
}
console.log(Object.myEntries())