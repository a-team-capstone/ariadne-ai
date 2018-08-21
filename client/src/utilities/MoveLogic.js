	// function to check if a move is blocked
	export const blocked = (x,y, sprite, mazeGrid, moveSize) => {
		let desiredX = Math.round(x/moveSize)
		let desiredY = Math.round(y/moveSize)
		let underZero = x < 0 || y < 0
		let overGridLength = (
			desiredX > (mazeGrid[0].length)-1 || desiredY > (mazeGrid.length)-1
		)
		let isBlocked
		if (!underZero && !overGridLength){
			isBlocked = mazeGrid[desiredY][desiredX]
		}
		return underZero || overGridLength || isBlocked

	}

export const right = (sprite, mazeGrid, moveSize) => {
	let desiredX, desiredY
	desiredX = sprite.x+moveSize
	desiredY = sprite.y
	if (!blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)) sprite.x+=moveSize
	return !blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)
}
export const left = (sprite, mazeGrid, moveSize) => {
	let desiredX, desiredY
	desiredX = sprite.x-moveSize
	desiredY = sprite.y
	if (!blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)) sprite.x-=moveSize
	return !blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)

}
export const up = (sprite, mazeGrid, moveSize) => {
	let desiredX, desiredY
	desiredX = sprite.x
	desiredY = sprite.y-moveSize
	if (!blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)) sprite.y-=moveSize
	return !blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)

}
export const down = (sprite, mazeGrid, moveSize) => {
	let desiredX, desiredY
	desiredX = sprite.x
	desiredY = sprite.y+moveSize
	if (!blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)) sprite.y+=moveSize
	return !blocked(desiredX, desiredY, sprite, mazeGrid, moveSize)

}

	// check if a sprite has reached a certain target
export const overlapping = (sprite, target, tileSize, closeness = 2) => {
		let targetX, targetY
		if (target.row && target.col) {
			targetY = target.row * tileSize// - tileSize
			targetX = target.col * tileSize// - tileSize
		} else {
			targetY = target.y
			targetX = target.x
		}
		const proximityX = Math.abs(sprite.x - targetX)
		const proximityY = Math.abs(sprite.y - targetY)
		const proximityRequirement = tileSize * closeness
		const areOverlapping = (proximityX < proximityRequirement) && (proximityY <= proximityRequirement)

		return areOverlapping
	}
