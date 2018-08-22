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
				{content.image ? <img src={content.image} width={200} /> : null}
				<p>{content.text}</p>
				{pageNum > 0 ? (
					<button type="button" className="tutorial-btn" onClick={this.handleBack}>
						<wired-button id="tutorial-btn">Back</wired-button>
					</button>
				) : null}
				{pageNum < tutorialContent.length - 1 ? (
					<button type="button" className="tutorial-btn" onClick={this.handleNext}>
						<wired-button id="tutorial-btn">Next</wired-button>
					</button>
				) : null}
				{pageNum === tutorialContent.length - 1 ? (
					<Link to="/create-maze">
						<wired-button id="started-btn">Get Started</wired-button>
					</Link>
				) : null}
			</div>
		)
	}
}

export default TutorialPage
