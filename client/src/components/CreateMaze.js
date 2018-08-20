import React, { Component, Fragment } from 'react'
import Upload from './Upload'
import 'wired-elements'

class CreateMaze extends Component {
  constructor () {
    super()
    this.state = {
      upload: false
    }
    this.showCropper = this.showCropper.bind(this)
  }

  showCropper(e) {
    e.preventDefault()
    this.setState({
      upload: true
    })
  }

  render () {
    const { upload } = this.state

    return (
      <div className="create-maze">
        <h3>Get Creative</h3>
        {
          upload ?
          <Fragment>
            <Upload />
          </Fragment> :
          <Fragment>
            <img src='/key.jpg' width={250} />
            <button type="button" onClick={this.showCropper}>
							<wired-button id="ready">I'm Ready</wired-button>
						</button>
          </Fragment>
        } 
      </div>
    )
  }
}

export default CreateMaze
