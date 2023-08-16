
const arr = [2,3,6,1,3]

arr.sort((a , b)=>{
    console.log(a , b)
    return a - b
})
console.log(arr.sort((a,b)=> a - b))

