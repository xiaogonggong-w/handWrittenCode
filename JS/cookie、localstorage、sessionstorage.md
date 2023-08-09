# cookie、lcoalStorage、sessionStorage、session区别

### cookie
 - 可以设置过期时间，4k左右
 - 每次都会携带http头中，如果使用cookie过多数据会带来性能消耗
 - 需要程序员自己封装，原生的不太好

### lcoalStorage
 - 永久保存， 5M
 - 仅在客户端保存，不参与服务器通信
 - 原生接口还可以，可以再次封装对object和array有更好的支持


### sessionStorage
 - 仅在当前会话有效，关闭页面或者浏览器自动清除，5M
 - 仅在客户端保存，不参与服务器通信
 - 原生接口还可以，可以再次封装对object和array有更好的支持

