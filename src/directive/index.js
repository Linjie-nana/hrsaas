export const imageerror = {
  inserted(dom, options) {
    // 额外添加逻辑处理 src 为空的状况
    dom.src = dom.src || options.value
    // dom获取到的是指定的dom数据
    // 里面的v - 自定义名字, 数值在options.value
    dom.onerror = function() {
      // 如果出错, 就修改默认地址, 但是如果不想每个地方的默认地址都一样
      // 可以在调用指令的时候传值
      dom.src = options.value
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
