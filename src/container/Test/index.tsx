
import React from "react";
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 0
    }
  }
  componentDidMount() {
    // setState传入对象会合并，后面覆盖前面的Object.assign({})
    // this.setState({ val: this.state.val + 1 }) // 添加到queue队列中，等待处理 
    // console.log(this.state.val)
    // // 第 1 次 log
    // this.setState({ val: this.state.val + 1 }) // 添加到queue队列中，等待处理
    // console.log(this.state.val)
    // // 第 2 次 log
    // setTimeout(() => {
    //   // 到这里this.state.val结果等于1了
    //   // 在原生事件和setTimeout中（isBatchingUpdate=false），setState同步更新，可以马上获取更新后的值
    //   this.setState({ val: this.state.val + 1 }) // 同步更新
    //   console.log(this.state.val)
    //   // 第 3 次 log
    //   this.setState({ val: this.state.val + 1 }) // 同步更新
    //   console.log(this.state.val)
    //   // 第 4 次 log
    // }, 0)
    this.setState((prevState,props)=>{
      return {val: prevState.val + 1}
    })
    console.log(this.state.val) // 0
    // 第 1 次 log
    this.setState((prevState,props)=>{ // 传入函数，不会合并覆盖前面的
      return {val: prevState.val + 1}
    })
    console.log(this.state.val) // 0
    // 第 2 次 log
    setTimeout(() => {
      // setTimeout中setState同步执行
      // 到这里this.state.val结果等于2了
      this.setState({ val: this.state.val + 1 }) 
      console.log(this.state.val) // 3
      // 第 3 次 log
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 4
      // 第 4 次 log
      }, 0)
  }
  render() {
    return <>{this.state.val}</>
  }
}
export default Test;