const tutorialContent = [
  {
    header: 'Build Your Own Maze',
    text: 'Draw a maze with power-ups and play it virtually, right away!'
  },
  {
    header: 'Maze Format',
    subhead: 'Drawing should be 4 x 3 proportionately.',
    text: 'Use straight or curvy lines, or build a maze from objects around you!',
    image: 'tutorialImg/dimensions.jpg'
  },
  {
    header: 'Basic Gameplay',
    subhead: 'Navigate from start to finish.',
    text: 'You can use the built-in navigation panel, or arrow keys if on a computer.',
    image: 'tutorialImg/startEnd.jpg'
  },
  {
    header: 'Timer',
    subhead: 'Beat your maze in the shortest time possible!',
    text:  'Draw an integer within your maze photo and the timer will count down from that number. Default time is 30 seconds.',
    image: 'tutorialImg/time.jpg'
  },
  {
    header: 'Power-Ups',
    subhead: 'Power-ups increase maze complexity, and fun!',
    text: 'Draw them within your maze boundaries. Use each power-up only once per maze.'
  },
  {
    header: 'STA',
    subhead: 'STA is start!',
    text: 'Draw STA in your maze wherever you would like your character to start in the maze. Default is the top-left corner.',
    image: 'tutorialImg/STA.jpg'
  },
  {
    header: 'END',
    subhead: 'END is the end!',
    text: 'Navigate to wherever you draw END to solve the maze! Default ending point is the bottom-right corner.',
    image: 'tutorialImg/END.jpg'
  },
  {
    header: 'XTM',
    subhead: 'XTM is extra time!',
    text: 'Navigate to an XT to add 10 seconds to the timer (if you need more time to solve)!',
    image: 'tutorialImg/XTM.jpg'
  },
  {
    header: 'BMB',
    subhead: 'BMB is bomb!',
    text: 'Draw BMB in your maze to add an additional challenge. If a player hits a bomb, they are sent back to start.',
    image: 'tutorialImg/BMB.jpg'
  },
  {
    header: 'FRZ',
    subhead: 'FRZ is freeze!',
    text: 'Whenever a player hits a freeze, they will be paused in place for 5 seconds... but the timer will still be counting down!',
    image: 'tutorialImg/FRZ.jpg'
  },
  {
    header: 'TEL / PRT',
    subhead: 'TEL and PRT together make teleport!',
    text: 'Transport your character back and forth across the maze by hitting TL or PT respectively. They must both be present in a maze to function correctly!',
    image: 'tutorialImg/TELPRT.jpg'
  },
  {
    header: 'Solvability',
    subhead: 'Our algorithm will let you know if your maze is solvable.',
    text: `Keep in mind, your power-ups may make it solvable (or not) depending on where you place them, so this isn't the end-all, be-all of solvability.`
  },
  {
    header: 'Save and Send',
    text: 'If you like the maze you created, save it, then send the maze to your friends to challenge them!',
    image: ''
  },
  {
    header: `Now You're Ready`,
    text: 'Start drawing or building your first maze now!',
    image: ''
  }
]

export default tutorialContent
