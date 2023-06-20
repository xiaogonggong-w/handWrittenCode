
const arr = [1,2,3]

console.log(arr.every(item=> item < 4))

Array.prototype.myEvery = function(cb){
     
    const array = this

    for (let index = 0; index < array.length; index++) {
        const res = cb(array[index], index, array)
        if(!res) return false
    }

    return true
}

console.log(arr.myEvery(item=> item < 4))