
const arr = [1, [2, [4, [5], [1, [6]]]]]

arr.flat()

console.log(arr.flat(Infinity))

Array.prototype.myFlat = function (num) {
    const result = []
    let count = num

    const cb = (arr, countNumber)=>{
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (Array.isArray(element) && (--countNumber >= 0 || num === Infinity)) {
                cb(element, countNumber)
            } else {
                result.push(element)
            }

        }
    }

    cb(this, count)
    return result
}

console.log(arr.myFlat(Infinity))