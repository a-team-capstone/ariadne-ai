import React, { Component } from 'react'
import Navbar from './Navbar'

class WithNavBar extends Component {
  render() {
		return (
			<div>
				<Navbar />
				<div>
        {/* Mount child routes */}
        {this.props.children}
				</div>
			</div>
		)
	}
}

export default WithNavBar
