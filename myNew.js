function Foo(){
    this.a = 1;
    return {
        a:4,
        b:5,
    }
}


Foo.prototype.a = 6
Foo.prototype.b = 7
Foo.prototype.c = 8
var foo = new Foo();

console.log(Foo.prototype, foo, foo.__proto__ == Foo.prototype, foo.__proto__.prototype)
console.log(foo.a)
console.log(foo.b)
console.log(foo.c)


// 创建一个空对象
// 

const myNew = (foo, ...args)=>{
    const obj = Object.create(foo.prototype);

    const instance = foo.apply(obj, args);

    return typeof instance == 'object' ? instance : obj;
}

const foo1 = myNew(Foo)

console.log(foo1.a)
console.log(foo1.b)
console.log(foo1.c)
