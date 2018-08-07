import React, { Component } from 'react'

export default class Loss extends Component {
  constructor () {
    super()
    this.state = {
      staticDot: {
        x: 39,
        y: 42
      },
      dynamicDot: {}
    }
  }

  render () {
    const style = {
      position: 'absolute',
      left: this.state.staticDot.x,
      top: this.state.staticDot.y
    }

    return (
      <div id="field">
        <div id="staticDot" style={style}></div>
      </div>
    )
  }
}