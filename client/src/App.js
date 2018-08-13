import React, { Component } from 'react'
// import logo from './logo.svg';
// import Loss from './components/Loss';
// import axios from 'axios';
// import Board from './components/Board'
// import UploadImage from './components/UploadImage'

import Routes from './routes'

class App extends Component {
	render() {
		return (
			<div className="container-fluid">
				{/* <div className="row"> */}
				{/* <Loss /> */}
				{/* <Board />
					<UploadImage /> */}
				{/* <Home /> */}
				<Routes />
				{/* </div> */}
			</div>
		)
	}
}

export default App
