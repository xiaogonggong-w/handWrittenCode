
const arr = [1,2,3]

const result = arr.reduce((prev, curr, index ,arr)=>{
     return prev+curr
},1)

console.log(result)

Array.prototype.myReduce = function(cb, initVal){
    
    let result = initVal || this.shift()
    for (let index = 0; index < this.length; index++) {
        result = cb(result, this[index], index, arr)
    }

    return result
}

const result1 = arr.myReduce((prev, curr, index ,arr)=>{
    return prev+curr
},2)

console.log(result1)