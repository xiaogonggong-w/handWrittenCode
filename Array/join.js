

const arr = [1,2,3,4,5];


Array.prototype.myJoin = function(str){

    const array = this || []

    let result;
    for (let index = 0; index < array.length; index++) {
       if(index === 0){
        result = array[index]
       }else{
        result  += str + array[index]
       }
    }

    return result
}

const arr1 = arr.join('------')

console.log(arr1)

const arr2 = arr.myJoin('------')
 
console.log(arr2)