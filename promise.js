
// promise有三种状态
// pending状态(初始化状态) fulfilled状态(成功状态) reject状态(失败状态)
// 状态准改

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {

    constructor(actuators) {
        this.status = PENDING; // 初始化时需要将状态设置为pending
        this.value = null;//保存外部resolve或者reject传进来的数据
        this.onFulfilledCallback = [];// 保存成功的回调
        this.onRejectedCallback = [];//保存失败的回调
        const resolve = value => {
            // 
            if (this.status === PENDING) {
                // 重置状态
                this.status = FULFILLED
                this.value = value
                // 在setTimeout的情况下,onFulfilledCallback可能不会空,需要执行
                while (this.onFulfilledCallback.length > 0) {
                    this.onFulfilledCallback.shift()(this.value)
                }
            }

        }

        const rejected = value => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.value = value
                // 在setTimeout的情况下,onRejectedCallback可能不会空,需要执行
                while (this.onRejectedCallback.length > 0) {
                    this.onRejectedCallback.shift()(this.value)
                }
            }
        }

        try {
            actuators(resolve, rejected)
        } catch (error) {
            rejected(error)
            
        }
    }

    /**
     * 
     * @param {成功的回调} onFulfilled 
     * @param {失败的回调} onRejected 
     * @returns 
     * 
     * - then的参数是onFulfilled和onRejected, 如果它们不是函数就需要将其忽略,但是还是依旧可以在下面的then中获取到之前返回的值
     * - then方法可以执行多次,每次执行完后返回一个新的promise
     * - 如果then的返回值是一个普通值,那么会把这个结果作为参数,传递给下一个then的成功的回调
     * - 如果then的返回值抛出了异常,那么就会把这个异常作为参数,传递给下一个then的失败的回调
     * - 如果返回的值是一个promise,那么就会等这个promise执行完,如果成功,就走下一个then的成功,如果失败就走下一个then失败的回调.
     */
    then(onFulfilled, onRejected) {
        // onFulfilled和onRejected可能是空的
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : v => { throw v }

        // then函数里面包含两个函数,状态为fulfilled状态时
        return new MyPromise((resolve, rejected) => {
            const resolvePromise = (cb) => {
                setTimeout(() => { // 用setTimeout模拟异步的任务,不阻塞同步的代码
                    try {
                        const result = cb(this.value); // cb有执行onReject函数会直接走catch

                        if (result instanceof MyPromise) {
                            result.then(resolve, rejected);
                        } else {
                            resolve(result)
                        }
                    } catch (error) {
                        rejected(error)
                        
                    }
                }, 0)

            }
            if (this.status === FULFILLED) {
                resolvePromise(onFulfilled)
            }

            // 如果状态为reject时
            if (this.status === REJECTED) {
                resolvePromise(onRejected)

            }



            // 定时器情况,就是在Promise的回调函数里面使用了setTimeout,这个时候的状态还没发生改变,但是已经调用了then方法,所以需要用数组保存起来,而且可能已经多次调用
            if (this.status === PENDING) {
                // 和上面一样,如果onFulfilled有返回值的值话岂不是不执行,所以这里面应该保存一个promise
                this.onFulfilledCallback.push(resolvePromise.bind(this, onFulfilled));
                this.onRejectedCallback.push(resolvePromise.bind(this, onRejected))
            }
        })

    }

    catch(error) {
        this.then(null, error)
    }

    /**
     * 
     * @param {Promise数组} promises 
     * 
     * all方法接收一个promise数组,数组中如果有非promise项,则此项当做成功
     * 如果所有的promise都成功,则返回成功结果数组
     * 如果有一个失败,则返回失败结果
     */
    static all(promises) {
        if (Array.isArray(promises)) {
            return new MyPromise((resolve, reject) => {
                let result = []
                let count = 0
                const allDone = (res, index) => {
                    result[index] = res
                    count += 1
                    if (count === promises.length) {
                        resolve(result)
                    }
                }
                promises.forEach((promise, index) => {
                    if (promise instanceof MyPromise) {
                        promise.then(res => {
                            allDone(res, index)
                        }, error => reject(error))
                    } else {
                        allDone(promise, index)
                    }

                })
            })
        } else {
            throw new Error('参数必须是数组')
        }
    }

    /**
     * 
     * @param {Promise数组} promises 
     * 接收一个Promise数组,数组中如果有非Promise项,则此项当做成功
     * 
     * 哪个Promise最快得到结果,就返回那个结果,无论成功还是失败
     */
    static race(promises) {
        if (Array.isArray(promises)) {
            return new MyPromise((resolve, rejected) => {
                promises.forEach(promise => {
                    if (promise instanceof MyPromise) {
                        promise.then(res => {
                            resolve(res)
                        }, error => {
                            rejected(error)
                        })
                    } else {
                        resolve(promise)
                    }

                })
            })
        } else {
            throw new Error('参数必须是数组')
        }
    }

    /**
     * 
     * @param {promise数组} promises 
     * any和all相反,如果有一个promise返回成功,则返回这个成功结果
     * 如果都失败,则报错
     */
    static any(promises) { 
        if (Array.isArray(promises)) {
            let count = 0
            return new MyPromise((resolve, rejected) => {
                promises.forEach(promise => {
                    if (promise instanceof MyPromise) {
                        promise.then(res => {
                            resolve(res)
                        }, error => {
                            count +=1 ;
                            if(count === promises.length){
                                rejected(new Error('任务失败'))
                            }
                        })
                    } else {
                        resolve(promise)
                    }

                })
            })
        } else {
            throw new Error('参数必须是数组')
        }
    }

    /**
     * 
     * @param {Promise数组} promises 
     * @returns 
     * 
     * 将Promise数组里面的状态改变后手动将每项的状态的值解析出来包装成一个数组作为自身的结果
     */
   static allSettled(promises){
    if (Array.isArray(promises)) {
        const result = []
        let count = 0
        
        return new MyPromise((resolve, rejected) => {
            const add = (index,value, status)=>{
                count+=1
                result[index] = {value, status}
                if(count === promises.length){
                    resolve(result)
                }
            }
            promises.forEach((promise, index) => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        add(index,res, 'fulfilled')
                    }, error => {
                        add(index, error, 'rejected' )
                    })
                } else {
                    add(index,promise, 'fulfilled')
                }

            })
        })
    } else {
        throw new Error('参数必须是数组')
    }
   }
}


// 测试本体promise
const p1 = new Promise((resolve, rejected) => {
    rejected('success')
})

p1.then(success => {
    console.log('success', success)
    return 'return'
}, error => {
    console.log('error', error)
    return error
}).then(res => {
    return new Promise(resolve => {
        resolve('以promise返回的值')
    })
}, error => {
    console.log('res', error)
}).then(res => {
    console.log('以promise返回的值', res)
    return res
}).then().then().then(success => {
    console.log('传了几个空值', success)
    return new Promise((resolve, rejected) => {
        rejected('直接catch')
    })
}, error => {
    console.log('传了几个空值', error)
}).catch(error => {
    console.log('promise1直接catch', error)
    return new Promise((resolve, rejected) => {
        rejected(';')
    })
}).then(res => {
    console.log('.......')
}, error => {
    console.log('.................')
})
console.log(p1)

// 测试promise的all方法
console.log('测试promise得all方法')
const promise1 = new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject(2), 2000));
const promise3 = new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000));
const promise4 = '不是promise'
Promise.all([promise1, promise2, promise3, promise4])
    .then(values => console.log(values)) // [1, 2, 3]
    .catch(reason => console.log(reason));

const promise9 = new Promise(resolve => {
    setTimeout(() => {
        resolve('promise1 resolved')
    }, 3000)
})

const promise10 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('promise2 rejected'))
    }, 2000)
})

Promise.race([promise9, promise10]).then(res => {
    console.log('something resolved', res)
}).catch(error => {
    console.log('something rejected', error)
})


const promise13 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('promise1 resolved')
    }, 1000)
  })
  
  const promise14 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('promise2 rejected'))
    }, 2000)
  })
  
  Promise.any([promise13, promise14]).then(res => {
    console.log('any', res)
  }).catch(error => {
    console.log('any', error)
  })
  
  const promise18 = new Promise(resolve => {
    setTimeout(() => {
      resolve('promise1 resolved')
    }, 1000)
  })
  
  const promise19 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('promise2 rejected'))
    }, 2000)
  })
  
  Promise.allSettled([promise18, promise19]).then(res => {
    console.log('all settled', res)
  })
  


const p2 = new MyPromise((resolve, rejected) => {
    setTimeout(() => {
        rejected('success')
    }, 4000)
})

p2.then(success => {
    console.log(success, 'success')
    return success
}, error => {
    console.log(error, 'error')
    return error
}).then(res => {
    console.log('上一个then传的值', res)
    return res
}, error => {
    console.log('上一个then传的值', error)
    return error
}).then().then().then(success => {
    console.log('传了几个空值', success)
    return new MyPromise((resolve, rejected) => {
        rejected('直接的catch方法')
    })
}, error => {
    console.log('传了几个空值', error)
}).catch(error => {
    console.log('直接的catch方法', error)
})

// 测试自己的promise的all方法
console.log('测试自己的promise的all方法')
const promise5 = new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 1000));
const promise6 = new MyPromise((resolve, reject) => setTimeout(() => resolve(2), 2000));
const promise7 = new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 3000));
const promise8 = '不是promise'
MyPromise.all([promise5, promise6, promise7, promise8])
    .then(values => console.log(values)) // [1, 2, 3]
    .catch(reason => console.log(reason));

const promise11 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('failure')
    }, 3000)
})
const promise12 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 4000)
})

MyPromise.race([promise11, promise12]).then(res => {
    console.log('something resolved', res)
}).catch(error => {
    console.log('something rejected', error)
})


const promise15 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise5 resolved')
    }, 1000)
  })
  
  const promise16 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('promise2 rejected'))
    }, 2000)
  })
  const promise17 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise17 resolved')
    }, 2000)
  })
  MyPromise.any([promise15, promise16, promise17]).then(res => {
    console.log('any', res)
  }).catch(error => {
    console.log('any', error)
  })
  
  const promise20 = new MyPromise(resolve => {
    setTimeout(() => {
      resolve('promise20 resolved')
    }, 1000)
  })
  
  const promise21 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('promise21 rejected'))
    }, 2000)
  })
  
  MyPromise.allSettled([promise20, promise21]).then(res => {
    console.log('all settled', res)
  })
console.log(p2)


