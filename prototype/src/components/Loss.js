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
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (evt) {
    evt.preventDefault()
    // set dynamicDot x & y based on evt target location
    this.setState({
      dynamicDot: {
        x: evt.nativeEvent.clientX,
        y: evt.nativeEvent.clientY
      }
    })
  }

  render () {
    console.log('state after', this.state.dynamicDot)
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
      </div>
    )
  }
}