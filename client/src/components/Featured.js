import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { loadFeatured } from '../store/featuredMazes'

class FeaturedMazes extends Component {
  componentDidMount () {
    this.props.loadFeatured()
  }

  render () {
    const { featured } = this.props
    return (
      <Fragment>
      <h4>Featured Mazes</h4>
      {
        featured.map(maze => {
          return (
            <Fragment>
              <h6>Maze Name</h6>
              <p>Leader: Shelby</p>
              <p>Time: 35 seconds</p>
              <button>Play</button>
            </Fragment>
          )
        })
      }
      </Fragment>
    )
  }
}

const mapState = state => ({
  featured: state.featured
})

const mapDispatch = dispatch => ({
  loadFeatured: () => dispatch(loadFeatured())
})

export default connect(mapState, mapDispatch)(FeaturedMazes)