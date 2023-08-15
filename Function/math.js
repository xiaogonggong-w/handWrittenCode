
// function F() {

// 补全代码

// }

// F(20).add(4).mul(2).sub(3).div(3)  // => 15

function F(initValue) {
    return {
        initValue : initValue,
        add : function (value) {
            this.initValue += value
            return this
        },
        mul : function (value) {
            this.initValue *=value
            return this
        },
        sub : function (value) {
            this.initValue -= value
            return this
        },
        div : function (value) {
            this.initValue /= value
            return this.initValue
        }
    }
}


console.log(F(20).add(4).mul(2).sub(3).div(3)) // 15