import './App.css';
import Board from './components/Board.js';
import User from './components/User.js';
import Chat from './components/Chat.js';

import { useState } from 'react';



// <Chat></Chat>

function App() {
  const [player, setPlayer] = useState(
    'string'
  ); 
  const winner = ''

  const [board, setBoard] = useState({
    qazan1: 0,
    qazan2: 0,
    
    container1: [9,9,9,9,9,9,9,9,9],
    container2: [9,9,9,9,9,9,9,9,9],

    tuzdyq1:1,
    tuzdyq2:1

  });


  //if(board.full) return<Modal winner={player} freeze />
      

  return (
      <div className='wrapper'> 
        <Board 
            tuzdyq1 = {board.tuzdyq1} 
            tuzdyq2 = {board.tuzdyq2} 
            balls1={board.container1}
            balls2= {board.container2}/>

        <div className='rightside col'> 
          <User id="0" score={board.qazan1}/>
          <Chat/>
          <User id="1" score={board.qazan2}/>

        </div>
      </div>);
}

export default App;
