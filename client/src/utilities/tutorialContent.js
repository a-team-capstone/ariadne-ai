const tutorialContent = [
  {
    header: 'Build Your Own Maze',
    text: 'Draw a maze with power-ups and play it virtually, right away!'
  },
  {
    header: 'Maze Dimensions',
    text: 'You can use straight or curvy lines, just try to make your maze roughly 4 x 3 proportionately!',
    image: 'image/of/exampleDimensions'
  },
  {
    header: 'Basic Gameplay',
    text: 'The object of any maze is to navigate from START to END in the shortest amount of time! You may draw an integer within your maze photo to set the number of seconds a player has to solve. Without it, the default will be 30 seconds!',
    image: 'image/start/end/withTime'
  },
  {
    header: 'Power-Ups',
    text: 'There are certain power-ups you can draw in your maze to make them more fun and challenging to play. Learn about them on the next few pages.'
  },
  {
    header: 'ST',
    text: 'ST means start! Draw ST in your maze wherever you would like your character to start the game. If you do not draw ST, your character will automatically start at the top-left corner.',
    image: 'image/of/STpoint'
  },
  {
    header: 'END',
    text: 'END is the end. Navigate to wherever you draw END to solve the maze! If you do not draw END, you can beat your maze by navigating to the bottom-right corner.',
    image: 'image/of/ENDpoint'
  },
  {
    header: 'XT',
    text: 'XT means extra time! Draw an XT in your maze and give players the option to navigate to it for more time on the clock, in case they are running out!',
    image: 'image/of/XT'
  },
  {
    header: 'BM',
    text: 'BM stands for bomb!! Draw BM in your maze to add an extra tricky challenge. If a player hits a BM, they lose automatically!',
    image: 'image/of/BM'
  },
  {
    header: 'FZ',
    text: 'FZ stands for freeze... brrrr! Whenever a player hits a freeze, they will be paused in place for 10 seconds... but the timer will still be counting down!',
    image: 'image/of/FZ'
  },
  {
    header: 'TEL / PRT',
    text: 'These two go hand in hand... they stand for teleport! Transport your character back and forth across your maze quickly by hitting TEL or PRT respectively. They must both be present in a maze to function.',
    image: 'image/of/TELPRT'
  }
]

export default tutorialContent
