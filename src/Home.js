import './Home.css';
import { Outlet, Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
//import ProgressButton from 'react-progress-button'
import { useContext, useState } from 'react';
import ReactiveButton from 'reactive-button';
import ornament from './assets/images/ornament.png';
import Utils from './utils';
import Chat1 from './Chat1.js'



import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoom } from './functions/index';
import { GameBoard } from './lib/game';
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

   const onClickHandler = () => {
     setState('loading');
     setTimeout(() => {
       setState('success');
     }, 2000);
   };


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

    const onCreateRoomClick = async () => {
      let name = prompt('What is your name?') || '';
      if (name.trim() === '') return;
  
      let gameObj = JSON.parse(JSON.stringify(new GameBoard(name, null)));
      gameObj._turn = name;
      console.log(gameObj)

      try {
        let { roomID } = await createRoom({
          ...gameObj,
          PLAYER_ONE: name,
        });
        await setUsername(name);
        history(`/game/${roomID}`);
        
      } catch (error) {
        console.log(error);
      }
    };


    
    const onJoinRoomClick = async () => {
      let roomID = prompt('Please enter Room ID') || '';
      let name = prompt('What is your name?') || '';
  
      if (roomID.trim() === '' || name.trim() === '') return;
  
      
      try {
        let response = await joinRoom(roomID, name);
        await setUsername(name);
        history(`/game/${response.roomID}`);
      } catch (error) {
        console.log(error);
        alert('No such room! Please eneter a valid Room ID');
      }
      
    };

    return (

        <div className = "homepage text-light bg-transparent row">
            <div className="banner svelte-1v7r4ll col-12">
              <div className="logo svelte-1v7r4ll" ><Link to="/"><img src={ornament} alt="logo" style={{objectFit: 'cover', width: '10%'}}></img>TOGYZQ</Link></div> 
              
              <div className="menu svelte-1v7r4ll">
              <div className="item blue svelte-1v7r4ll"><Link to="/game">OINAU</Link></div> 
              
              <div className="separator svelte-1v7r4ll"></div> 
              <div className="item svelte-1v7r4ll"><Link to="/rules">RULES</Link>
              </div> 
              <div className="item svelte-1v7r4ll">LOL
			          <div className="sub svelte-1v7r4ll">
                  <a href="/" className="item svelte-1v7r4ll">WIKI</a> 
                  <a href="/" className="item svelte-1v7r4ll">DISCORD</a> 
                  <a href="/" className="item svelte-1v7r4ll">REDDIT</a> 
                  <a href="/" className="item svelte-1v7r4ll">TWITCH</a>
                </div>
              </div> 
              <div className="separator svelte-1v7r4ll"></div> 
              
              <div className="item svelte-1v7r4ll">LOGIN

              </div>
            </div>
            </div>
           

            <div className='miras col-6'>
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
            </div>
              
        <div className='joinContainer col-6'>
        <div className="joinChatContainer">
              
              <input
                type="text"
                placeholder="Qiyal..."
               
               
              />
              <button onClick={onJoinRoomClick}>Oıynǵa kіrý</button>
            </div>
            </div>
           
        </div>
      );
  }
  
  export default Home;







            /* {   !showChat ? (

            ) : (
              null//<Chat1  username={username} room={room} />
            )} */