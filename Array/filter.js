

const arr = [1,2,3,4,5];


Array.prototype.myFilter = function(func){

    const array = this || []

    const result = []
    for (let index = 0; index < array.length; index++) {
        const res = func(array[index], index, array)
        res && result.push(array[index])
    }

    return result
}

const arr1 = arr.filter(item=> item % 2 === 0)

console.log(arr1)

const arr2 = arr.myFilter(item=> item % 2 === 0)
 
console.log(arr2)