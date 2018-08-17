	// function to check if a move is blocked
	export const blocked = (x,y, sprite, mazeGrid, moveSize) => {
		var desiredX, desiredY
		var underZero = x < 0 || y < 0
		var overGridLength = (
			x > (mazeGrid[0].length*moveSize)-1 || y > (mazeGrid.length*moveSize)-1
		)
		if (!underZero && !overGridLength){
			var isBlocked = mazeGrid[(y/moveSize)][(x/moveSize)]
		}
		return underZero || overGridLength || isBlocked

	}

export const right = (sprite, mazeGrid, moveSize) => {
	var desiredX, desiredY
	desiredX = sprite.x+moveSize
	desiredY = sprite.y
	if (!blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)) sprite.x+=moveSize
	return !blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)
}
export const left = (sprite, mazeGrid, moveSize) => {
	var desiredX, desiredY
	desiredX = sprite.x-moveSize
	desiredY = sprite.y
	if (!blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)) sprite.x-=moveSize
	return !blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)

}
export const up = (sprite, mazeGrid, moveSize) => {
	var desiredX, desiredY
	desiredX = sprite.x
	desiredY = sprite.y-moveSize
	if (!blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)) sprite.y-=moveSize
	return !blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)

}
export const down = (sprite, mazeGrid, moveSize) => {
	var desiredX, desiredY
	desiredX = sprite.x
	desiredY = sprite.y+moveSize
	if (!blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)) sprite.y+=moveSize
	return !blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)

}
