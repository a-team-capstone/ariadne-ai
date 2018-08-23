window.downHandlers = []
window.upHandlers = []


const keyboardTracker = function(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
	};


  //The `upHandler`
  key.upHandler = event => {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
	};

	let down = key.downHandler.bind(key)
	let up = key.upHandler.bind(key)

	window.downHandlers.push(down)
	window.upHandlers.push(up)

  //Attach event listeners
  window.addEventListener(
    "keydown", down, false
  );
  window.addEventListener(
    "keyup", up, false
  );
  return key;
}

export default keyboardTracker
