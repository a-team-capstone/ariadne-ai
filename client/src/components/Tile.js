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
    x = centre.x + size + 35 * Math.cos(angle);
    y = centre.y + size + 35 * Math.sin(angle);

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
    let color = this.props.isSelected ? '#5b5b5b' : ( this.props.isReachable ? '#aff3ff' : '#eaf1f2');
    // TODO - this could be optimised, don't need to calculate coords for every hex, just one and then offset.
    const path = makeCell(this.state.size, this.props.centre);
    return (
      <Shape d={path} fill={color} onClick={this.handleClick} opacity='0.5' />
    );
  }
}

export default Tile;
