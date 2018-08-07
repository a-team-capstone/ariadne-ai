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
    const dynamicX = this.state.dynamicDot.x,
    dynamicY = this.state.dynamicDot.y,
    staticX = this.state.staticDot.x,
    staticY = this.state.staticDot.y,
    lineDisplay = (staticX < 0) ? "none" : "block"

    // lineDisplay isn't working



    return (
      <svg height="500" width="500" id="field" onClick={this.handleClick}>
        <rect height="500" width="500" fill="green" />
        <circle cx={dynamicX} cy={dynamicY} r="10" fill="white" />
        <circle cx={staticX} cy={staticY} r="10" fill="white" />
        <line display={lineDisplay} id="lossLine" x1={staticX} y1={staticY} x2={dynamicX} y2={dynamicY} stroke="white" strokeWidth="2" />
        <text x="350" y="450" fill="white">Total Loss: {this.state.loss}</text>
      </svg>
    )
  }
}