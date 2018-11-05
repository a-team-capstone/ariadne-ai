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
			<div className="tutorial">
				<h3>{content.header}</h3>
				{content.subhead ? <h5>{content.subhead}</h5> : null}
				{content.image ? <img src={content.image} alt={'tutorial'} width={200} /> : null}
				<p>{content.text}</p>
				{pageNum > 0 ? (
					<button type="button" className="reg-btn tutorial-btn" onClick={this.handleBack}>
						Back
					</button>
				) : null}
				{pageNum < tutorialContent.length - 1 ? (
					<button type="button" className="reg-btn tutorial-btn" onClick={this.handleNext}>
						Next
					</button>
				) : null}
				{pageNum === tutorialContent.length - 1 ? (
          <button className="reg-btn">
            <Link to="/create-maze">
              Get Started
            </Link>
          </button>
				) : null}
			</div>
		)
	}
}

export default TutorialPage
