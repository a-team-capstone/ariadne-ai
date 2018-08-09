import React, { PureComponent } from 'react';
import { Group } from 'react-art';
import Tile from './Tile';
import _ from 'lodash';
import floodFill from '../utilities/floodFill'
import dummyGrid from '../utilities/dummyGrid'

// var SIZE_TO_PACKED_WIDTH = 1.7320508075688772;
// var SIZE_TO_PACKED_HEIGHT = 1.5;
var SIZE_TO_PACKED_WIDTH = 2;
var SIZE_TO_PACKED_HEIGHT = 2;

// function optimalSize(widthPixels, heightPixels, countHorizontal, countVertical) {
//   var packedhexWidth = widthPixels / parseInt(countHorizontal, 10);
//   var adjustedGridHeight = (heightPixels * SIZE_TO_PACKED_HEIGHT) / parseInt(countVertical, 10);
//   var packedHexHeight = adjustedGridHeight / SIZE_TO_PACKED_HEIGHT;

//   let size;

//   if (packedhexWidth / SIZE_TO_PACKED_WIDTH < packedHexHeight / SIZE_TO_PACKED_HEIGHT) {
//     size = packedhexWidth / SIZE_TO_PACKED_WIDTH;
//   } else {
//     size = packedHexHeight / SIZE_TO_PACKED_HEIGHT;
//   }

//   return size.toFixed(5);
// }



// function calculatePixelCoordinates(baseVector, hexSize, axialXCoord, axialYCoord) {
//   console.log('base', baseVector, 'size', hexSize, 'axialX', axialXCoord, 'axialY', axialYCoord)
//   return {
//     x: ((50 * 3) / 2) * axialXCoord,
//     y: ((50 * 3) / 2) * axialYCoord,
//   };
// }

// function setuppositionsRadial(widthPixels, heightPixels, countHorizontal, countVertical) {
//   let size = 15;
//   console.log(widthPixels, heightPixels)
//   var centreVector = {
//     x: Math.floor(widthPixels / 2),
//     y: Math.floor(heightPixels / 2),
//   };
//   console.log('center vector here', centreVector);

//   var rows = [];
//   _.times(countVertical, function(axialYCoord) {
//     // var axialYCoord = indexVertical - gridRadiusVertical;
//     var row = [];

//     _.times(countHorizontal, function(axialXCoord) {

//       row.push({
//         keyName: 'cell_' + axialXCoord + '_' + axialYCoord,
//         axialCoordinates: {
//           x: axialXCoord,
//           y: axialYCoord,
//         },
//         pixelCoordinates: calculatePixelCoordinates(
//           centreVector,
//           size,
//           axialXCoord,
//           axialYCoord
//         ),
//       });
//     });

//     rows.push(row);
//   });

//   return rows;
// }

class Grid extends PureComponent {
  render() {

    var positions = dummyGrid(5, 5, 50); // positions = array (25) of arrays (25), or our board matrix
    // console.log('positions', positions)

    var hexGrid = _.map(positions, function(hexRow, index) {
      var rowElements = _.map(hexRow, function(hexData) {
        var hexKey = hexData.keyName;
        console.log('center', hexData.pixelCoordinates)
        console.log('isReachable', hexData.isReachable)
        return (
          <Tile
            key={hexKey}
            size={25}
            centre={hexData.pixelCoordinates}
            isReachable={hexData.isReachable}
            isSelected={hexData.isSelected}
          />
        );
      });

      return <Group key={'row_' + index}>{rowElements}</Group>;
    });

    return <Group>{hexGrid}</Group>;
  }
}

export default Grid;
