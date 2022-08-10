import './App.css';
import Board from './components/Board.js';
import User from './components/User.js';
import Chat from './components/Chat.js';
import { Link } from "react-router-dom";
import useLocalStorage from 'use-local-storage';
import ornament from './assets/images/ornament.png';

//modal
import Modal from "./components/Modal";
import styles from "./components/Modal/nested.css";

// adding multip
import { useEffect, useContext, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


import { GameBoard } from './lib/game';
import { GlobalContext } from './context/GlobalContext';
import { database } from './.firebase';
import { leaveRoom, sendData } from './functions';

function Game(props) {
    //const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themes = ['light', 'dark', 'pinky', 'green']
    const themeProps = {
      light: {
        background: '#373041',
        textcolor: 'black',
        navbar: 'rgba(88, 103, 221, 0.554)',
        boardcolor: '#9a8572',
        containercolor: '#ffdab9',
        ballcolor: 'brown',
        tuzdyqcolor: 'lightblue',
        bordercolor: '#cca481'
    },
    
    dark: {
      background: 'black',
      textcolor: 'black',
      navbar: 'rgb(211, 211, 211)',
      boardcolor: 'grey',
      containercolor: 'rgb(206, 206, 206)',
      ballcolor: 'rgb(57, 57, 57)',
      tuzdyqcolor: 'rgb(251, 251, 251)',
      bordercolor: 'grey'
    },
    
    green: {
      background: '#abd1c6',
      textcolor: 'white',
      navbar: '#f9bc60',
      boardcolor: '#004643',
      containercolor: '#abd1c6',
      ballcolor: '#e16162',
      tuzdyqcolor: '#f9bc60' ,
      bordercolor: '#6a817b'
    },
    
    pinky: {
      background: '#fef6e4',
      textcolor: 'whitex',
      navbar: '#f3d2c1',
      boardcolor:  '#f582ae',
      containercolor: '#f3d2c1',
      ballcolor: '#8bd3dd',
      tuzdyqcolor: '#fffffe', 
      bordercolor: '#7c6c63'
    }}

    const [theme, setTheme] = useState( JSON.parse(window.localStorage.getItem('data-theme')));
    
    //useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    

    const switchTheme = (newTheme) => {
      console.log('theme', theme);

      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme)
      window.localStorage.setItem('data-theme', JSON.stringify(newTheme));
    }

    const { id } = useParams();
    const roomID = id;
    console.log("received params: ", id)

    const { state } = useContext(GlobalContext);
    const [remoteData, setRemoteData] = useState(null);
    const [wins, setWins] = useState({ me: 0, other: 0 });

    const history = useNavigate();

    
    /* Modal things */
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
  
    const handleOpen = useCallback(() => setIsOpen(true), []);
    const handleOpen2 = useCallback(() => setIsOpen2(true), []);
  
    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleClose2 = useCallback(() => setIsOpen2(false), []);

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
    }, [props.id]);

    /*
    //not sure if i need it
    useEffect(() => {
      if (remoteData?.winner) {
        if (remoteData.winner === state.username)
          setWins({ ...wins, me: wins.me + 1 });
        else setWins({ ...wins, other: wins.other + 1 });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remoteData?.winner, state.username]);
  */
/*
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
  */

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
/*
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
  */
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
        
    const [isOpenWin, setIsOpenWin] = useState(true);
 
    const handleOpenWin = useCallback(() => setIsOpenWin(true), []);
  
    const handleCloseWin = useCallback(() => setIsOpenWin(false), []);
 
   const ModalWin = () => {
     return (
           <Modal
               className={styles.ModalOverlay}
               open={isOpenWin}
           >
             <Modal.Content className={styles.ModalContent}>
               <h2 style = {{justifySelf: 'center'}}>! UNDER CONSTRUCTION !</h2>
               <button onClick={handleCloseWin}>OK, got it</button>
             </Modal.Content>
         </Modal>
     );
   }

    return (
      <>
      <div className="alternative"><h3>SWITCH TO PC!</h3></div>
        <div className='wrapper row'> 
          <div className="banner svelte-1v7r4ll col-12">
              <div className="logo svelte-1v7r4ll" ><Link to="/"><img src={ornament} alt="logo" style={{objectFit: 'cover', width: '10%'}}></img>TOGYZQ</Link></div> 
              
              <div className="menu svelte-1v7r4ll">
              {remoteData && remoteData.PLAYER_ONE && remoteData.PLAYER_TWO ? null : (
            <>
              <div className="item  svelte-1v7r4ll">room ID is {roomID}</div> 
          
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
              <div className="item svelte-1v7r4ll" onClick={handleOpen }>Theme</div> {/*onClick={switchTheme}*/}

              
            </div>
            </div>
         

         {remoteData?.winner || remoteData?.draw ? (
          <button onClick={restart}>Restart</button>
        ) : null}


          <Board 
              remoteData = {remoteData}
              freeze = {isOpen}
              player1 = {remoteData?.PLAYER_ONE}
              player2 = {remoteData?.PLAYER_TWO}
              childFunc={childFunc}
              roomId = {roomID}
              onChange1 = {handleQazan1} 
              onChange2 = {handleQazan2}
              handlePlayer = {handlePlayer}
          />
  
          <div className='rightside col'> 
            <User id="0" 
                name={remoteData?.PLAYER_ONE} 
                you={state.username===remoteData?.PLAYER_ONE ? true : false} 
                score={board.qazan1} 
                playing = {board.currPlayer===0 ? true: false}
                undo = {state.username === remoteData?.PLAYER_ONE ? childFunc.current() : null}
            />
            <Chat roomID={roomID} />
            <User id="1" 
                  name={remoteData?.PLAYER_TWO ? remoteData?.PLAYER_TWO : 'Waiting...'} 
                  you={state.username===remoteData?.PLAYER_ONE ? false : true} 
                  score={board.qazan2} 
                  playing = {board.currPlayer===1 ? true: false}
                  undo = {state.username === remoteData?.PLAYER_TWO ? childFunc.current() : null}
            />
            <Modal
              className={styles.ModalOverlay}
              open={isOpen}
              onDismiss={handleClose}
            >
            <Modal.Content className={styles.ModalContent}>
              <h2 style = {{justifySelf: 'center'}}>Change Theme</h2>
              <div className = "modalmain">
                {themes.map((theme) =>
                  <div className = {`themediv ${theme}`}
                    onClick = {() => switchTheme(theme)}
                      style = {{ background: themeProps[theme].background, 
                                  color: themeProps[theme].textcolor,
                                  border: `${themeProps[theme].bordercolor} solid 2px`,
                                  borderRadius:  '10px'}}
                  >
                    <div className = {`themeboard ${theme}`}
                          style = {{ background: themeProps[theme].boardcolor, 
                                          color: themeProps[theme].navbartext, 
                                          alignItems: 'center'}}>
                       {theme}
                    
                    <div className = {`themecontainer ${theme}`}
                          style = {{ background: themeProps[theme].containercolor, 
                          }}
                    >
                      <div className = {`themeball ${theme}`}
                            style = {{ background: themeProps[theme].ballcolor, 
                                  }}>
                                    <p></p>
                      </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={handleClose}>Close</button>
             
            </Modal.Content>
          </Modal>
          <ModalWin/>
          </div>
        </div>
        </>
        );
}
export default Game;

/*
<Modal
className={styles.ModalOverlay}
open={isOpen}
onDismiss={handleClose}
>
<Modal.Content className={styles.ModalContent}>
<h2>Change Theme</h2>
<button  onClick={handleOpen2}>
 Restart
</button>
<button onClick={handleClose}>Close</button>
<Modal
  className={styles.ModalOverlay2}
  open={isOpen2}
  onDismiss={handleClose2}
>
  <Modal.Content className={styles.ModalContent2}>
    <h3>I'm a fancy Nested Modal!</h3>
    <button onClick={handleClose2}>Close</button>
  </Modal.Content>
</Modal>
</Modal.Content>
</Modal>

*/