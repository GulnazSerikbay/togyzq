import './Home.css';
import { Outlet, Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
//import ProgressButton from 'react-progress-button'
import { useContext, useState, useCallback } from 'react';
import ReactiveButton from 'reactive-button';
import ornament from './assets/images/ornament.png';


import Loading from "./Loading.js";

//modal
import Modal from "./components/Modal";
import styles from "./components/Modal/nested.css";


import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoom } from './functions/index';
import { GlobalContext } from './context/GlobalContext';

//backend
import { io } from 'socket.io-client'

const { firebase } = window;
console.log(firebase)

// to listening port
//const socket = io.connect("http://localhost:3000");




function Home () {
   //if(board.full) return<Modal winner={player} freeze />
   const [state, setState] = useState('idle');
   const [loading, setLoading] = useState(false);

   const onClickHandler = () => {
     setState('loading');
     setTimeout(() => {
       setState('success');
     }, 2000);
   };

  const openGame = async () => {
    setLoading(true);
    try {
      await setTimeout(() => {
        console.log("entering")
      }, 3000);
      history(`/gameoff`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

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
     textcolor: 'white',
     navbar: '#f3d2c1',
     boardcolor:  '#f582ae',
     containercolor: '#f3d2c1',
     ballcolor: '#8bd3dd',
     tuzdyqcolor: '#fffffe', 
     bordercolor: '#7c6c63'
   }}

   const [theme, setTheme] = useState( JSON.parse(window.localStorage.getItem('data-theme')));
   

  const switchTheme = (newTheme) => {
    console.log('theme', theme);

    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme)
    window.localStorage.setItem('data-theme', JSON.stringify(newTheme));
  }
   /* Modal things */
   const [isOpen, setIsOpen] = useState(false);
   const [isOpen2, setIsOpen2] = useState(false);
 
   const handleOpen = useCallback(() => setIsOpen(true), []);
   const handleOpen2 = useCallback(() => setIsOpen2(true), []);
 
   const handleClose = useCallback(() => setIsOpen(false), []);
   const handleClose2 = useCallback(() => setIsOpen2(false), []);

   // socket things
   /*const [username, setUsername] = useState("");
   const [room, setRoom] = useState("");
   const [showChat, setShowChat] = useState(false);
 
   const joinRoom = () => {
     if (username !== "" && room !== "") {
       //socket.emit("join_room", room);
       setShowChat(true);
     }
   };
/*
   //creates a new game room
function createGame() {
  const newGame = {
    p1_token: Utils.token(),
    p2_token: Utils.token()
  };

  const game = firebase.database().ref("games").push();

  game
    .set(newGame)
    .then(() => {
      window.location.hash = `#/${newGame.p1_token}`;
    }, (err) => {
      throw err;
    });
} */
 

    //adding firebase things
    const history = useNavigate();
    const { setUsername } = useContext(GlobalContext);
   // const { setId } = useContext(GlobalContext);

    //const { setUserId } = useContext(GlobalContext);

    const onCreateRoomClick = async () => {
      //let name = prompt('What is your name?') || '';
      if (userinput.trim() === '') return;
      const initBoard = [
        { playerId: 0, id: 9, text: 'I', count: 9, hover: false },
        { playerId: 0, id: 8, text: 'H', count: 9, hover: false },
        { playerId: 0, id: 7, text: 'G', count: 9, hover: false },
        { playerId: 0, id: 6, text: 'F', count: 9, hover: false },
        { playerId: 0, id: 5, text: 'E', count: 9, hover: false },
        { playerId: 0, id: 4, text: 'D', count: 9, hover: false },
        { playerId: 0, id: 3, text: 'C', count: 9, hover: false },
        { playerId: 0, id: 2, text: 'B', count: 9, hover: false },
        { playerId: 0, id: 1, text: 'A', count: 9, hover: false },
        { playerId: 1, id: 1, text: 'A', count: 9, hover: false },
        { playerId: 1, id: 2, text: 'B', count: 9, hover: false },
        { playerId: 1, id: 3, text: 'C', count: 9, hover: false },
        { playerId: 1, id: 4, text: 'D', count: 9, hover: false },
        { playerId: 1, id: 5, text: 'E', count: 9, hover: false },
        { playerId: 1, id: 6, text: 'F', count: 9, hover: false },
        { playerId: 1, id: 7, text: 'G', count: 9, hover: false },
        { playerId: 1, id: 8, text: 'H', count: 9, hover: false },
        { playerId: 1, id: 9, text: 'I', count: 9, hover: false },
      ]
      const lastState = {
        state: initBoard, 
        qazan1: 0, qazan2: 0, 
        player: 1, 
        opponent: 0,
        tuzdyq1: 0, tuzdyq2: 0
      }

      const initGame = {
        qazan1: 0,
        qazan2: 0,
        tuzdyq1: 0,
        tuzdyq2: 0,
        currPlayer: 1,
        opponent: 0,
        winner: 0,
        counts: [81, 81],
        lastState: lastState,
        containers: initBoard,
        PLAYER_ONE: null,
        PLAYER_TWO: null
      }

      let gameObj = JSON.parse(JSON.stringify(initGame));
      //gameObj.currPlayer = userinput;
      console.log(gameObj)
      
      setLoading(true);
      try {
        console.log("username", userinput);
        let { roomID } = await createRoom({
          ...gameObj,
          PLAYER_ONE: userinput,
        });
        await setUsername(userinput);
        //await setId(0);
        history(`/game/${roomID}`);
        
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };


    
    const onJoinRoomClick = async () => {
      let roomID = idpass;
      let name = userinput;

      console.log(idpass, "and", userinput);
  
      if (roomID.trim() === '' || name.trim() === '') return;
  
      setLoading(true);
      try {
        let response = await joinRoom(roomID, name);
        await setUsername(name);
        //(1);
        history(`/game/${response.roomID}`);
      } catch (error) {
        console.log(error);
        alert('No such room! Please enter a valid Room ID');
      }
      setLoading(false);
      
    };

    const [userinput, setUserinput] = useState('')

    const handleInputChange = (event) => {
      setUserinput(event.target.value );
    };

    const [idpass, setIdpass] = useState('')

    const handleIDChange = (event) => {
      setIdpass(event.target.value );
    };

    const [user1, setUser1] = useState('')

    const handleU1Change = (event) => {
      setUser1(event.target.value );
    };
    const [user2, setUser2] = useState('')

    const handleU2Change = (event) => {
      setUser2(event.target.value );
    };

    return (

        <div className = "homepage text-light bg-transparent row">
            <div className="banner svelte-1v7r4ll col-12">
              <div className="logo svelte-1v7r4ll" ><Link to="/"><img src={ornament} alt="logo" style={{objectFit: 'cover', width: '10%'}}></img>TOGYZQ</Link></div> 
              
              <div className="menu svelte-1v7r4ll">
              <div className="item blue svelte-1v7r4ll"><Link to="/gameoff">OINAU: BETA</Link></div> 
              
              <div className="separator svelte-1v7r4ll"></div> 
              <div className="item svelte-1v7r4ll"><Link to="/rules">RULES</Link>
              </div> 
              <div className="item svelte-1v7r4ll">HELP
			          <div className="sub svelte-1v7r4ll">
                  <a href="/" className="item svelte-1v7r4ll">WIKI</a> 
                  <a href="/" className="item svelte-1v7r4ll">DISCORD</a> 
                  <a href="/" className="item svelte-1v7r4ll">REDDIT</a> 
                  <a href="/" className="item svelte-1v7r4ll">TWITCH</a>
                </div>
              </div> 
              <div className="separator svelte-1v7r4ll"></div> 
              
              <div className="item svelte-1v7r4ll" onClick = {handleOpen}>THEME 

              </div>
            </div>
            </div>
           

     
        <div className='joinContainer row'>
        <div className="joinChatContainer col-6">
          <h3>PLAY TOGYZQ: CLASSIC</h3>
              <input
                type="text"
                placeholder="User1..."
                onChange={handleU1Change}
              />
              <input
                type="text"
                placeholder="User2..."
                onChange={handleU2Change}
              />
              <button onClick = {openGame}>PLAY</button>
         
            </div>
        <div className="joinChatContainer col-6">
             <h3>PLAY TOGYZQ: ONLINE</h3>
              <input
                type="text"
                placeholder="Username..."
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="roomID..."
                onChange={handleIDChange}
              />
              <button onClick={onCreateRoomClick}>Create room</button>
              <button onClick={onJoinRoomClick} lol='Oıynǵa kіrý'>Join room</button>
         
            </div>
        </div>
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
          <Loading visible={loading} />
        </div>
      );
  }
  
  export default Home;







            /* {   !showChat ? (

            ) : (
              null//<Chat1  username={username} room={room} />
            )} */



/*
            <Link to="/game">
      
            <ReactiveButton 
                buttonState={state}
                onClick={onClickHandler}
                color={'primary'}
                idleText={'Play: Normal'}
                loadingText={'Loading'}
                successText={'Success'}
                errorText={'Error'}
                type={'button'}
                className={'class1 class2'}
                style={{ borderRadius: '5px' }}
                outline={false}
                shadow={false}
                rounded={false}
                size={'large'}
                block={false}
                messageDuration={1000}
                disabled={false}
                buttonRef={null}
                width={'100%'}
                height={null}
                animation={false}
            />
            </Link>
            
                        <ReactiveButton
                buttonState={state}
                onClick={onCreateRoomClick}
                color={'yellow'}
                idleText={'Create Room'}
                loadingText={'Loading'}
                successText={'Success'}
                errorText={'Error'}
                type={'button'}
                className={'class1 class2 '}
                style={{ borderRadius: '5px' }}
                outline={false}
                shadow={false}
                rounded={false}
                size={'large'}
                block={false}
                messageDuration={1000}
                disabled={false}
                buttonRef={null}
                width={'100%'}
                height={null}
                animation={false}
            />
            */