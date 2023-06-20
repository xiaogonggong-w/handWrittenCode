
const arr = new Array(9)

console.log(arr.fill(1))

Array.prototype.myFill = function(num){

    let result = []

    for (let index = 0; index < this.length; index++) {
       result[index] = num
    }

    return result
}

console.log(arr.myFill(1))