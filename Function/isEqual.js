
// 深比较

function isEqual(a, b){
    if(typeof a !== 'object' || typeof b !== 'object') return a === b

    if(a === b) return true

    const alen =  Object.keys(a)
    const blen = Object.keys(b)

    if(alen.length !== blen.length) return false

    for (const key in a) {
        const res = isEqual(a[key], b[key])

        if(!res) return false
    }
    return true
}

const a = {
    x: 100,
    y: 2,
    c:{
        x:400,
        y: 899
    }
}
const b = {
    x: 100,
    y: 2,
    c:{
        x:400,
        y: 899,
        d: 1
    }
}

console.log(isEqual(a,b))