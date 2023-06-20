
const arr = [1,2,3]

console.log(arr.some(item=> item < 1))

Array.prototype.mySome = function(cb){
     
    const array = this

    for (let index = 0; index < array.length; index++) {
        const res = cb(array[index], index, array)
        if(res) return true
    }

    return false
}

console.log(arr.mySome(item=> item < 1))