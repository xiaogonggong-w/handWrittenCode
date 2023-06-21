
function Foo(age,name){
    this.age = age
    this.name = name;
}

const foo = new Foo('1', '2')

console.log(foo instanceof Foo)


// 递归
function myInstanceof(child, father){
    if(!child) return false

    if(child && child.__proto__ === father.prototype){
        return true
    }
    return myInstanceof(child.__proto__, father)

}

console.log(myInstanceof(foo, Foo))

// 循环
function myInstanceof2(child, father){
    if(typeof father !== 'function' || typeof child !== 'object' || father === null){
        throw  new Error('右边必须是对象')
    }
    while(child.__proto__){
        if(child.__proto__ === father.prototype){
            return true
        }

        child.__proto__ = child.__proto__.__proto__
    }
    return false
}
console.log(myInstanceof2(foo, Foo))