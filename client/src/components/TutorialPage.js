import React, { Component, Fragment } from 'react'
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
			<div className="main">
				<h3>{content.header}</h3>
				<p>{content.text}</p>
				{pageNum > 0 ? <button onClick={this.handleBack}>Back</button> : null}
				{pageNum < tutorialContent.length - 1 ? (
					<button onClick={this.handleNext}>Next</button>
				) : null}
				{pageNum === tutorialContent.length - 1 ? (
					<button>
						<Link to="/create-maze">Get Started</Link>
					</button>
				) : null}
			</div>
		)
	}
}

export default TutorialPage
