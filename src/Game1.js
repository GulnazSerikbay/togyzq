import './App.css';
import Board1 from './components/Boardcopy.js';
import User from './components/User.js';
import Chat from './components/Chat.js';

import { useState } from 'react';

function Game1(props) {
    
    const [board, setBoard] = useState({
      qazan1: 0,
      qazan2: 0,
      
      container1: [9,9,9,9,9,9,9,9,9],
      container2: [9,9,9,9,9,9,9,9,9],

      currPlayer: null
    
    });

    const handleQazan1 = (val) => {
      setBoard(prev => {
        return {
          qazan1: val,
          qazan2: prev.qazan2,
          
          container1: prev.container1,
          container2: prev.container2
      }
    });
   }

    const handleQazan2 = (val) => {
      setBoard(prev => {
        return {
          qazan1: prev.qazan1,
          qazan2: val,
          
          container1: prev.container1,
          container2: prev.container2 
        }
      });
    }
    const handlePlayer = (player) => {
      setBoard(prev => {
        return {
          qazan1: prev.qazan1,
          qazan2: prev.qazan2,
          
          container1: prev.container1,
          container2: prev.container2,

          currPlayer: player
        }
      });
    }
    //if(board.full) return<Modal winner={player} freeze />
        
  
    return (
        <div className='wrapper'> 
          <Board1 
              onChange1 = {handleQazan1} 
              onChange2 = {handleQazan2}
              handlePlayer = {handlePlayer}
          />
  
          <div className='rightside col'> 
            <User id="0" score={board.qazan1} playing = {board.currPlayer===0 ? true: false}/>
            <Chat/>
            <User id="1" score={board.qazan2} playing = {board.currPlayer===1 ? true: false}/>
  
          </div>
        </div>);
}
export default Game1;