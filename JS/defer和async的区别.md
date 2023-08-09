# defer和async的区别

- 不设置async和defer属性，那么脚本会同步执行下载并执行，阻塞后续dom的渲染
- 设置了defer属性，脚本会延迟到dom渲染完毕后执行，加载完成后，在触发domContentLoaded事件前执行
- 设置了async属性，脚本会异步下载并执行，下载完成后，立刻执行，并阻塞后续dom渲染。不影响domContentLoaded事件的触发

