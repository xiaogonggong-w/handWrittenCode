
// 数组的forEach方法
Array.prototype.myForEach = function(func){
   
    const arr = this || []

    for (let index = 0; index < arr.length; index++) {
        func(arr[index], index, arr)
        
    }
}

const arr = [1,2,3,4,5];

arr.forEach((item, index, arr)=>{
    console.log(item, index, arr)
})

arr.myForEach((item, index, arr)=>{console.log(item, index, arr)})