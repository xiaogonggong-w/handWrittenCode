
const obj = {
    name:"1",
    age: '10'
}


console.log(Object.keys(obj))

Object.prototype.myKeys = function(obj){
   const result = []
    if(obj instanceof Object){
       for (const key in obj) {
         if(obj.hasOwnProperty(key)){
            result.push(key)
         }
       }
    }else{
        throw new Error('obj必须是一个对象类型')
    }
    return result;
}
console.log(Object.myKeys(obj))