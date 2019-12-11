import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

  }

  componentWillMount() {
    fetch('./posts/小程序/微信小程序笔记.md').then((res) => res.text()).then((text) => {
      console.log(text)
    })
  }

  render() {
    return (
      <div>hello world</div>
    )
  }
}

export default App;
