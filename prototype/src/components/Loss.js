import React, { Component } from 'react'

export default class Loss extends Component {
  constructor () {
    super()
    this.state = {
      staticDot: {
        x: 39,
        y: 42
      },
      dynamicDot: {
        x: -15,
        y: -15
      },
      loss: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (evt) {
    evt.preventDefault()
    const dynamicX = evt.nativeEvent.clientX,
    dynamicY = evt.nativeEvent.clientY,
    staticX = this.state.staticDot.x,
    staticY = this.state.staticDot.y

    let a = dynamicX - staticX,
    b = dynamicY - staticY

    this.setState({
      dynamicDot: {
        x: dynamicX,
        y: dynamicY
      },
      loss: Math.floor(Math.sqrt( a*a + b*b ))
    })
  }

  render () {
    const staticStyle = {
      position: 'absolute',
      left: this.state.staticDot.x,
      top: this.state.staticDot.y
    },
    dynamicStyle = {
      position: 'absolute',
      left: this.state.dynamicDot.x,
      top: this.state.dynamicDot.y
    }

    return (
      <div id="field" onClick={this.handleClick}>
        <div id="staticDot" style={staticStyle}></div>
        <div id="dynamicDot" style={dynamicStyle}></div>
        <div id="totalLoss">Total loss: {this.state.loss}</div>
      </div>
    )
  }
}