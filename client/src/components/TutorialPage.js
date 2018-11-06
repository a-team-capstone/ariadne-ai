import React, { Component } from 'react'
import tutorialContent from '../utilities/tutorialContent'
import { Link } from 'react-router-dom'

class TutorialPage extends Component {
	constructor() {
		super()
		this.state = {
			pageNum: 0
		}
		this.handleNext = this.handleNext.bind(this)
		this.handleBack = this.handleBack.bind(this)
	}

	handleNext(evt) {
		evt.preventDefault()
		this.setState({
			pageNum: this.state.pageNum + 1
		})
	}

	handleBack(evt) {
		evt.preventDefault()
		this.setState({
			pageNum: this.state.pageNum - 1
		})
  }

	render() {
		const { pageNum } = this.state
		const content = tutorialContent[pageNum]

		return (
			<div className="content tutorial">
				<h3>{content.header}</h3>
				{content.subhead ? <h5>{content.subhead}</h5> : null}
        {content.image ? <img src={content.image} alt={'tutorial'} width={200} /> : null}

        <div className="tutorial-buttons">
        <div id="tutorial-text">
          <p>{content.text}</p>
        </div>
          {pageNum > 0 ? (
            <button type="button" id="back-btn" className="reg-btn" onClick={this.handleBack}>
              Back
            </button>
          ) : null}

          {pageNum < tutorialContent.length - 1 ? (
            <button type="button" id="next-btn" className="reg-btn" onClick={this.handleNext}>
              Next
            </button>
          ) : null}

          {pageNum === tutorialContent.length - 1 ? (
            <Link to="/create-maze">
              <button id="started-btn" className="reg-btn no-underline">
                Go!
              </button>
            </Link>
          ) : null}
        </div>
			</div>
		)
	}
}

export default TutorialPage
