import './App.css';
import Board from './components/Board.js';
import User from './components/User.js';
import Chat from './components/Chat.js';
import { Link } from "react-router-dom";
import ornament from './assets/images/ornament.png';

// adding multip
import { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


import { GameBoard } from './lib/game';
import { GlobalContext } from './context/GlobalContext';
import { database } from './.firebase';
import { leaveRoom, sendData } from './functions';

function Game(props) {
    
    const { id } = useParams();
    const roomID = id;
    console.log("received params: ", id)

    const { state } = useContext(GlobalContext);
    const [remoteData, setRemoteData] = useState(null);
    const [wins, setWins] = useState({ me: 0, other: 0 });

    const history = useNavigate();

    /* console.log("database",database);
    database.ref(roomID).on('value', (snap) => {
      console.log("remoteData", snap.val());
      setRemoteData(snap.val());
    }); */
   


    useEffect(() => {
      console.log("id in gamejs", id)
      
      // get live data from remote server and update it in state
      database.ref(roomID).on('value', (snap) => {
        setRemoteData(snap.val());
        console.log("remoteData", snap.val());
      });
    }, [id]);

    //not sure if i need it
    useEffect(() => {
      if (remoteData?.winner) {
        if (remoteData.winner === state.username)
          setWins({ ...wins, me: wins.me + 1 });
        else setWins({ ...wins, other: wins.other + 1 });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remoteData?.winner, state.username]);
  

    useEffect(() => {
      if (remoteData?.winner)
        setTimeout(
          () =>
            alert(
              `${
                remoteData.winner === state.username
                  ? 'You are doing good. Keep up the game, champ!'
                  : 'You lost. Try better next time!'
              }`
            ),
          1000
        );
  
      if (remoteData?.draw) {
        setTimeout(() => {
          alert('It is a draw! You gave opponent a tough time!');
        }, 1000);
      }
    }, [remoteData?.draw, remoteData?.winner, state.username]);
  

    const mark = async (index) => {
      if (remoteData._turn !== state.username) {
        console.log('It is not your turn');
        return;
      }
  
      const { PLAYER_ONE, PLAYER_TWO } = remoteData;
  
      let game = new GameBoard(PLAYER_ONE, PLAYER_TWO);
      game.board = remoteData.board;
      game._turn = remoteData._turn;
      game.winner = remoteData.winner ? remoteData.winner : null;
  
      game.mark(index);
  
      const data = JSON.parse(JSON.stringify(game));
      console.log(data);
      try {
        await sendData(roomID, data);
      } catch (error) {
        console.log(error);
      }
    };

    //here
    const leave = async () => {
      try {
        await leaveRoom(roomID, state.username);
        history('/');
      } catch (error) {
        console.log(error);
      }
    };

    //here
    useEffect(() => {
      if (remoteData?.winner)
        setTimeout(
          () =>
            alert(
              `${
                remoteData.winner === state.username
                  ? 'You are doing good. Keep up the game, champ!'
                  : 'You lost. Try better next time!'
              }`
            ),
          1000
        );
  
      if (remoteData?.draw) {
        setTimeout(() => {
          alert('It is a draw! You gave opponent a tough time!');
        }, 1000);
      }
    }, [remoteData?.draw, remoteData?.winner, state.username]);
  
    //here
    const restart = async () => {
      const data = {
        ...remoteData,
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        winner: null,
        draw: false,
      };
  
      try {
        await sendData(roomID, data);
      } catch (error) {
        console.log(error);
      }
    };

    //here
    const copyRoomID = () => {
      navigator.clipboard
        .writeText(roomID)
        .then((res) => alert('ID copied!'))
        .catch((e) => alert('Could not copy ID. Please copy it manually'));
    };


    //here
    useEffect(() => {
      window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
          e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
      };
    }, [])




    const childFunc = useRef(null)


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
        <div className='wrapper row'> 
          <div className="banner svelte-1v7r4ll col-12">
              <div className="logo svelte-1v7r4ll" ><Link to="/"><img src={ornament} alt="logo" style={{objectFit: 'cover', width: '10%'}}></img>TOGYZQ</Link></div> 
              
              <div className="menu svelte-1v7r4ll">
              {remoteData && remoteData.PLAYER_ONE && remoteData.PLAYER_TWO ? null : (
            <>
              <div className="item blue svelte-1v7r4ll">room ID is {roomID}</div> 
          
              <div className="item svelte-1v7r4ll" onClick={copyRoomID}>Copy Room ID
              </div> 
              </>
          )}
              <div className="separator svelte-1v7r4ll"></div>
              <div className="item svelte-1v7r4ll" onClick={leave}>LEAVE
			          <div className="sub svelte-1v7r4ll">
                  <a href="/" className="item svelte-1v7r4ll">WIKI</a> 
                  <a href="/" className="item svelte-1v7r4ll">DISCORD</a> 
                  <a href="/" className="item svelte-1v7r4ll">REDDIT</a> 
                  <a href="/" className="item svelte-1v7r4ll">TWITCH</a>
                </div>
              </div> 
              <div className="separator svelte-1v7r4ll"></div> 
              
              <div className="item svelte-1v7r4ll" onClick={() => childFunc.current()} >UNDO</div>
              <div className="separator svelte-1v7r4ll"></div>
              <div className="item svelte-1v7r4ll"  >Dark</div>

              
            </div>
            </div>
         

         {remoteData?.winner || remoteData?.draw ? (
          <button onClick={restart}>Restart</button>
        ) : null}


          <Board 
              childFunc={childFunc}
              roomId = {id}
              onChange1 = {handleQazan1} 
              onChange2 = {handleQazan2}
              handlePlayer = {handlePlayer}
          />
  
          <div className='rightside col'> 
            <User id="0" name={remoteData?.PLAYER_ONE} you={state.username===remoteData?.PLAYER_ONE ? true : false} score={board.qazan1} playing = {board.currPlayer===0 ? true: false}/>
            <Chat roomID={roomID} />
            <User id="1" name={remoteData?.PLAYER_TWO ? remoteData?.PLAYER_TWO : 'Waiting...'} you={state.username===remoteData?.PLAYER_ONE ? false : true} score={board.qazan2} playing = {board.currPlayer===1 ? true: false}/>
  
          </div>
        </div>);
}
export default Game;