import React, { PureComponent } from 'react';
import { Path, Shape } from 'react-art';

function makeHexPath(size, centre) {
  var path = new Path();
  var point = 0;
  var angle = null;
  var x = null;
  var y = null;

  while (point < 4) {
    // angle = ((2 * Math.PI) / 4) * (point + 0.5);
    // x = centre.x + size * Math.cos(angle);
    // y = centre.y + size * Math.sin(angle);

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

class Tile extends PureComponent {
  constructor() {
    super();
    this.state = {
      isSelected: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isSelected: !this.state.isSelected,
    });
  }

  render() {
    let color = this.state.isSelected ? '#888' : '#111';
    // TODO - this could be optimised, don't need to calculate coords for every hex, just one and then offset.
    const path = makeHexPath(this.props.size, this.props.centre);
    return (
      <Shape d={path} fill={color} opacity="0.5" onClick={this.handleClick} />
    );
  }
}

export default Tile;
