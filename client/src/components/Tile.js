import React, { PureComponent } from 'react';
import { Path, Shape } from 'react-art';

function makeCell(size, centre) {
  var path = new Path();
  var point = 0;
  var angle = null;
  var x = null;
  var y = null;

  while (point < 4) {
    angle = ((2 * Math.PI) / 4) * (point + 0.5);
    x = centre.x + size * Math.cos(angle);
    y = centre.y + size * Math.sin(angle);

    if (point === 0) {
      path.moveTo(x, y);
    } else {
      path.lineTo(x, y);
    }

    point = point + 1;
  }

  return path;
}

// const createRect (height, width) {
//   var path = new Path()
//   var point = 0

//   while (point < 4) {

//   }
// }

class Tile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      isReachable: this.props.isReachable,
      size: 35
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isSelected: !this.state.isSelected,
    });
  }

  render() {
    let color = this.props.isSelected ? '#000000' : ( this.props.isReachable ? 'blue' : '#a2a6ad');
    // TODO - this could be optimised, don't need to calculate coords for every hex, just one and then offset.
    const path = makeCell(this.state.size, this.props.centre);
    return (
      <Shape d={path} fill={color} opacity="0.5" onClick={this.handleClick} />
    );
  }
}

export default Tile;
