

const arr = [1,2,3,4,5];


Array.prototype.myMap = function(func){

    const array = this || []

    const result = []
l
    for (let index = 0; index < array.length; index++) {
        const res = func(array[index], index, array)
        result[index] = res || undefined
    }

    return result
}

const arr1 = arr.map(item=> {
   const a= item * 2
})

console.log(arr1)

const arr2 = arr.map(item=> item * 2)
 
console.log(arr2)