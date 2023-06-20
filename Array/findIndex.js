
// 找出数组下标的
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const index = arr.findIndex((el, i, arr)=> el === 1)

console.log(index); 


Array.prototype.myFindIndex = function(cb){
    const array = this
    for (let index = 0; index < array.length; index++) {
        const res = cb(array[index], index, array)
        if(res) return index
    }

    return -1
}

const index1 = arr.myFindIndex((el, i, arr)=> el === 1)

console.log(index1); 
