
import React from 'react'
//import assert from 'assert'
import PopUp from "./Popup";
//import { FaTheRedYeti } from 'react-icons/fa';
import './Board.css'
import { Otau, Qazan } from './Otau.js'
//import Game from "./Game.js"
import { useEffect, useContext, useState, useCallback  } from 'react'
import { useDebugValue } from 'react'
import Form from 'react-bootstrap/Form';

//modal
import Modal from "./Modal";
import styles from "./Modal/nested.css";

import { useNavigate } from 'react-router-dom';
//import { useParams } from 'react-router-dom';


/*import { GameBoard } from '../lib/game';
import { GlobalContext } from '../context/GlobalContext';
import { database } from '../.firebase';
import { leaveRoom, sendData, updateData } from '../functions';
import { render } from '@testing-library/react';

// write the logic for tuzdyq in map for onlyOne and oneMove (el.id===tuzdyq1)
// player 0 owns tuzdyq2!!
*/


function BoardOff(props) {

  //const { state } = useContext(GlobalContext);
  //const [remoteData, setRemoteData] = useState(props.remoteData);
  //const [wins, setWins] = useState({ me: 0, other: 0 });
  const [players, setPlayers] = useState([null, null]);

  








  //undo for use in parent element <Game/>
  

  
  const bgColor = '#ffdab9'
  const [visibility, setVisibility] = useState(false);

  const togglePop = () => {
    console.log(visibility)
    setVisibility((state) => !state);
  };

  /*const popupCloseHandler = (e) => {
    setVisibility(e);
  };*/

  const [qazan1, setQazan1] = useState(0)
  const [qazan2, setQazan2] = useState(0)

  const [tuzdyq1, setTuzdyq1] = useState(0)
  const [tuzdyq2, setTuzdyq2] = useState(0)

  const [currPlayer, setCurrPlayer] = useState(1) // change to string probs
  const [opponent, setOpponent] = useState(0) // change to string probs
  const [winner, setWinner] = useState(1)

  const [counts, setCounts] = useState([81, 81])
  

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
  const [lastState, setLastState] = useState ({
          state: initBoard, 
          qazan1: 0, qazan2: 0, 
          player: 1, 
          opponent: 0,
          tuzdyq1: tuzdyq1, tuzdyq2: tuzdyq2}
  )


// for testing purposes
  const initBoard2 = [
    { playerId: 0, id: 9, text: 'I', count: 9 },
    { playerId: 0, id: 8, text: 'H', count: 9 },
    { playerId: 0, id: 7, text: 'G', count: 9 },
    { playerId: 0, id: 6, text: 'F', count: 9 },
    { playerId: 0, id: 5, text: 'E', count: 9 },
    { playerId: 0, id: 4, text: 'D', count: 9 },
    { playerId: 0, id: 3, text: 'C', count: 9 },
    { playerId: 0, id: 2, text: 'B', count: 9 },
    { playerId: 0, id: 1, text: 'A', count: 2 },
    { playerId: 1, id: 1, text: 'A', count: 0 },
    { playerId: 1, id: 2, text: 'B', count: 0 },
    { playerId: 1, id: 3, text: 'C', count: 0 },
    { playerId: 1, id: 4, text: 'D', count: 0 },
    { playerId: 1, id: 5, text: 'E', count: 0 },
    { playerId: 1, id: 6, text: 'F', count: 0 },
    { playerId: 1, id: 7, text: 'G', count: 0 },
    { playerId: 1, id: 8, text: 'H', count: 0 },
    { playerId: 1, id: 9, text: 'I', count: 1 },
  ]

 // const [containers, setContainers] = useState(initBoard)
  


  const initGame = {
    qazan1: qazan1,
    qazan2: qazan2,
    tuzdyq1: tuzdyq1,
    tuzdyq2: tuzdyq2,
    currPlayer: currPlayer,
    opponent: opponent,
    winner: 0,
    counts: counts,
    lastState: lastState,
    containers: initBoard,
    //PLAYER_ONE: remoteData?.PLAYER_ONE,
    //PLAYER_TWO: remoteData?.PLAYER_TWO
  }


  const [game, setGame] = useState(initGame)
  
  


  /*const handlePresses = (e) => {
    if (e.key === 'z') {
      undo()
    }
    switch( e.keyCode ) {
      case 'A':
          break;
      default: 
          break;
  }
  }*/

  //document.addEventListener("keydown", handlePresses);

  //switches the current player
  const switchPlayer = () => {
    //const curr = currPlayer
    setGame((prev) => {
        return { ...prev, 
          currPlayer: prev.currPlayer === 0 ? 1 : 0,
          opponent: prev.currPlayer === 0 ? 0 : 1
        }
      }
    )
    //setCurrPlayer((prevPlayer)=>prevPlayer===0 ? 1 : 0)
    //setOpponent(curr)

    console.log('Player changed from: ' + game.currPlayer)
  }

  // recalculates how many qumalaks each side has
  const recalculate = () => {
    const newcount = game.containers.reduce(
      ([c1,c2], {count, playerId}) => [playerId===0? c1+count:c1, playerId===1? c2+count:c2],
      [0,0]
    ) 
    //setCounts(newcount)
    setGame((prev) => {
        return { ...prev, 
          counts: prev?.containers.reduce(
            ([c1,c2], {count, playerId}) => [playerId===0? c1+count:c1, playerId===1? c2+count:c2],
            [0,0]
          )
        }
      }
    )
    return newcount

  }

  /* const update = async (sending) => {

    const data =  JSON.parse(JSON.stringify(sending ));

    try {
      console.log("data being sent", sending);
      await updateData(props.roomId, data);
    } catch (error) {
      console.log(error);
    }
  } */
  const [check, setCheck] = useState(false);

  useEffect(() => {
    //console.log(game.containers)
    console.log("qazan1: " + game.qazan1)
    console.log("qazan2: " + game.qazan2);
    props.onChange1(game.qazan1)  
    props.onChange2(game.qazan2)  

    const newcount = recalculate()
    if (game.counts[0]===0) {
      atsyrau(0)
    }
    if (game.counts[1]===0) {
      atsyrau(1)
    }

    props.handlePlayer(game.currPlayer)
    if (hasFinished()) {
      console.log("winner", game?.winner);
      console.log("Game finished");
      handleOpenWin();
    }
   
    console.log("counts", game.counts)
    console.log("newcounts", newcount)

    console.assert(newcount[0]+newcount[1]+game.qazan1+game.qazan2 === 162, newcount[0]+newcount[1]+game.qazan1+game.qazan2);
    /* setGame({
      qazan1: qazan1,
      qazan2: qazan2,
      tuzdyq1: tuzdyq1,
      tuzdyq2: tuzdyq2,
      currPlayer: currPlayer,
      opponent: opponent,
      winner: winner,
      counts: counts,
      lastState: lastState,
      containers: initBoard
    }
    ) */

    
   //update(game);
   if (check) {
    checkTuzdyq();
   }
  }, [game?.containers])
  
 

  const winMessage = () => {
    console.log("winner",game.winner)
    if (game.winner) {
      //alert("Game finished!")
      console.log(`winner is ${game.winner}`)
    }
  }

  const hasFinished = () => {
    if (game.qazan1 > 81) {
      setWinner('Player1')
      setGame((prev) => {
        return { ...prev, 
          winner: 'Player1'
        }
      }
    )
      winMessage()
      return true;
    }
    if (game.qazan2 > 81) {
      setWinner('Player2')
      setGame((prev) => {
        return { ...prev, 
          winner: 'Player2'
        }
      }
    )
      winMessage()
      return true;
    }
    if (game.qazan1 === 81 && game.qazan2 === 81) {
      setWinner('Tie!')
      setGame((prev) => {
        return { ...prev, 
          winner: 'Tie!'
        }
      }
    )
      winMessage()
      return true;
    }
    return false;
  }

  const getCount = (id, playerId, list) => {
    return list.filter(el => el.id === id && el.playerId === playerId)[0].count
  }

  

  const isEven = (playerId, id, count) => {
    const tuzdyq = playerId ? game.tuzdyq1 : game.tuzdyq2; 
    console.log("Tuzdyq", playerId, tuzdyq);
    /* if last qumalak landed on other player's container    *
     *  and there's even, then move to Qazan                 */

    // Control Tuzdyq Otaus for both players


    if (count > 1) {
        const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9
        const rounds = Math.ceil((count + (id - 1)) / 9) //how many board sides balls travel
        const newcount = getCount(lastId, game.opponent, game.containers)
        console.log("count in the lastId", newcount);

        if (rounds % 2 === 0 &&  newcount % 2 !== 0) {

            console.log('Even! Moving to qazan.')
            moveToQazan(game.opponent, newcount + 1, lastId)
            
        }
        else if (tuzdyq === 0 && rounds % 2 === 0 && newcount === 2) {
            
            handleOpenTuzdyq();
            const success = getTuzdyq(lastId, playerId)
            if (success) {
                console.log('Tuzdyq! Moving to qazan.')
                moveToQazan(game.opponent, newcount+1, lastId) 
            }
            
        /*if (lastId === tuzdyq1 && playerId !== ) {

        }*/
        }
    }  
    else {//for count === 1 calculation must be different
        const lastId = id === 9 ? 1 : id+1
        const rounds = id === 9 ? 2 : 1 //how many board sides balls travel
        const newcount = getCount(lastId, game.opponent, game.containers) 
        //using opponent, cause if the lastId is not in opponen't side, condition will fail
        console.log("count in the lastId", newcount);
        if (rounds % 2 === 0 &&  newcount % 2 !== 0) {
            
            console.log('Even! Moving to qazan.')
            moveToQazan(game.opponent, newcount+1, lastId)

        }
        else if (tuzdyq === 0  && rounds % 2 === 0 && newcount === 2){
            handleOpenTuzdyq();
           
            const success = getTuzdyq(lastId, playerId)
            if (success) {
                console.log('Tuzdyq! Moving to qazan.')
                moveToQazan(game.opponent, newcount+1, lastId) 
            }
            
           /* const success = getTuzdyq(lastId, playerId)
            if (success) {
              console.log('Tuzdyq! Moving to qazan.')
              moveToQazan(game.opponent, newcount+1, lastId) 
            }*/
        }
    }
  }
  //requires count > 1
  /* const oneMove = (id, count) => {
        //let currId = id;
        console.log('???');
        let balls = count;
        setContainers((prevContainer)=>prevContainer.map((el,idx)=>{ 
            if(el.id===id){
                console.log(el.count)
                return {...el,count:1};
            }
            if(el.id < (count+id)%18){
                console.log("id: " + el.id)
                console.log("added: " + (Math.ceil(count/18)))
                return {...el,count:el.count+(Math.ceil(count/18))};
            }   
            if (el.id >= (count+id-1)%18 && count>18){ 
                console.log("id: " + el.id)
                console.log("added: " + Math.ceil(count/18)) //(Math.ceil((el.id-id)/18)))
                return {...el,count:el.count+ Math.ceil(count/18)}//(Math.ceil((el.id-id)/count))};
            }     
            else return el;
        }));

    } 
    console.log({containers});*/

  

    const hideHint = (playerId, id, count) => {
        console.log("hiding");
        /* setContainers((prevContainer) => 
          prevContainer.map((el) => ({ ...el, hover: false} )));
        */
        setGame((prev) => {
            return { ...prev, 
              containers: prev.containers.map((el) => ({ ...el, hover: false} ))
            }
          }
        )
        }

    const showHint = (playerId, id, count) => {
      console.log("freeze ", props.freeze)
      if (count > 0 && playerId === game.currPlayer) {
        if (count === 1) {
          const lastId = id === 9 ? 1 : id+1
          const rounds = id === 9 ? 2 : 1 //how many board sides balls travel
          const lastPlayerId = (rounds % 2 === 0) ? game.opponent : game.currPlayer
          
          /*setContainers((prevContainer) => 
            prevContainer.map((el) => {
              if (el.id === lastId && el.playerId === lastPlayerId) {
                  return { ...el, hover: true} 
              } else return el

          }));*/

          setGame((prev) => {
            return { ...prev, 
              containers: prev.containers.map((el) => {
                if (el.id === lastId && el.playerId === lastPlayerId) {
                    return { ...el, hover: true} 
                } else return el
  
            })
            }
          }
        )
          
        }
        else { // count > 1
          
          const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9
          const rounds = Math.ceil((count + (id - 1)) / 9) //how many board sides balls travel
          const lastPlayerId = (rounds % 2 === 0) ? game.opponent : game.currPlayer
          console.log("hovered: ", lastId, lastPlayerId)
          
          /*setContainers((prevContainer) => 
            prevContainer.map((el) => {
              if (el.id === lastId && el.playerId === lastPlayerId) {
                  return { ...el, hover: true} 
              } else return el

          }));
*/
          setGame((prev) => {
              return { ...prev, 
                containers: prev.containers.map((el) => {
                  if (el.id === lastId && el.playerId === lastPlayerId) {
                      return { ...el, hover: true} 
                  } else return el
    
              })
              }
            }
          )

        }
       
      }
    }

    // when player can't move cos of 0 qumalaks 
    const atsyrau = (playerId) => {
      //setWinner(playerId===0 ? 'Player2' : 'Player1')
      setGame((prev) => {
          return { ...prev, 
            winner: playerId===0 ? 'Player2' : 'Player1'
          }
        }
      )
      winMessage()
      alert("Atsyrau for Player", playerId);
      console.log("Atsyrau!");
      // request qumalak or not
      // then another player will accept or deny 
    }

    const getTuzdyq = (id, playerId) => {
      // request for tuzdyq or not
      console.log("Entered Tuzdyq zone")
      if (id === 9) {
        console.log("can't get tuzdyq");
        return false;
      }
      else if (playerId === 0) {
        //handleOpenTuzdyq(playerId);
        //if (tuzdyqyes)
        console.log("player 1 getting tuzdyq", id);
        //setTuzdyq2(id);

        setGame((prev) => {
            return { ...prev, 
              tuzdyq2: id
            }
          }
        )
        return true;
      }
      else if (playerId === 1) {
        //alert("tuzdyq")
        //handleOpenTuzdyq();
        console.log("player 2 getting tuzdyq", id);
        //setTuzdyq1(id);
        setGame((prev) => {
            return { ...prev, 
              tuzdyq1: id
            }
          }
        )
        return true;
      }
      else return false;
    }



    const moveToQazan = (playerId, count, id) =>{

        setGame((prev) => {
          // take all balls from otau
          const newcontainer = prev.containers.map((el) => {
              if (el.id === id && el.playerId === playerId) {
                  console.log("Taking", count, "balls from id:", id, "Player", playerId)
                  return { ...el, count: 0 } 
              } else return el
            })
            return { ...prev, 
              containers: newcontainer,
              qazan2: playerId  === 0 ? prev.qazan2+count : prev.qazan2,
              qazan1: playerId  === 1 ? prev.qazan1+count : prev.qazan1,
            }
          }
        )
/*
        if (playerId  === 0) {

            setGame((prev) => {
                return { ...prev, 
                  qazan2: prev.qazan2+count
                }
              }
            )
            
        }
        if (playerId  === 1) {

            setGame((prev) => {
                return { ...prev, 
                  qazan1: prev.qazan1+count
                }
              }
            )
           
        }  */
    } 

  /* Helper: edge case, when only 1 qumalak in a container */
  const onlyOne = (playerId, id) => {
    setCheck(true);
    /*setGame((prev) => {
        return { ...prev, 
          lastState: {
            state: prev.containers, 
            player: prev.currPlayer, opponent: prev.opponent,
            qazan1: prev.qazan1, qazan2: prev.qazan2,
            tuzdyq1: prev.tuzdyq1, tuzdyq2: prev.tuzdyq2
          }
        }
      }
    ) */
    
    if (id === 9) {

    setGame((prev) => {
        const newcontainer = prev.containers.map((el) => {
          if (el.id === 1 && el.playerId !== playerId) {
            return { ...el, count: el.count + 1 }
          } else if (el.id === 9 && el.playerId === playerId){
            return { ...el, count: 0 }
          } else return el
        })
        return { ...prev, 
          containers: newcontainer,
          lastState: {
            state: prev.containers, 
            player: prev.currPlayer, opponent: prev.opponent,
            qazan1: prev.qazan1, qazan2: prev.qazan2,
            tuzdyq1: prev.tuzdyq1, tuzdyq2: prev.tuzdyq2
          }
        }
      }, () => {
        //checkTuzdyq();
     }
    )
    } else {

      setGame((prev) => {
          const newcontainer = prev.containers.map((el) => {
            if (el.id === id + 1 && el.playerId === playerId) {
              return { ...el, count: el.count + 1 }
            } else if (el.id === id && el.playerId === playerId) {
              return { ...el, count: 0 }
            } else return el
          })
          return { ...prev, 
            containers: newcontainer,
            lastState: {
                state: prev.containers, 
                player: prev.currPlayer, opponent: prev.opponent,
                qazan1: prev.qazan1, qazan2: prev.qazan2,
                tuzdyq1: prev.tuzdyq1, tuzdyq2: prev.tuzdyq2
              }
          }
        }, () => {
           // checkTuzdyq();
         }
      )
    }
 
  }

  const oneMove = (playerId, id, count) => {
    setCheck(true);
    const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9
    console.log('lastId: ' + lastId)
    //const lastPlayerId = (Math.floor((count + (id-1))/9)%2+player)%2 //ball landing playerid
    const rounds = Math.ceil((count + (id - 1)) / 9) //how many board sides balls travel
    console.log('rounds: ' + rounds)

    setGame((prev) => {
      const newcontainer = prev.containers.map((el) => {
        if (el.id === id && el.playerId === playerId && el.id <= lastId) {
          console.log("adding ", Math.ceil(rounds/2))
          return { ...el, count: Math.ceil(rounds/2) } //incorrect
        }
        if (el.id === id && el.playerId === playerId && el.id > lastId) {
          return { ...el, count: Math.floor(rounds/2) } //incorrect
        }
        if (rounds % 2 === 0) {
          //lands on the other side
          if (el.playerId === playerId && el.id >= id) {
            return { ...el, count: el.count + Math.ceil(rounds / 2) }
          }
          if (el.playerId === playerId && el.id < id) {
            return { ...el, count: el.count + rounds / 2 - 1 }
          }
          if (el.playerId !== playerId && el.id <= lastId) {
            return { ...el, count: el.count + rounds / 2 }
          }
          if (el.playerId !== playerId && el.id > lastId) {
            return { ...el, count: el.count + rounds / 2 - 1 }
          }
          else {
            return el
          }
        } else {
          //lands on this player's side
          if (el.playerId === playerId && el.id >= id && el.id <= lastId) {
            return { ...el, count: el.count + Math.ceil(rounds / 2) }
          }
          if (el.playerId === playerId && (el.id < id && el.id <= lastId)) {
            return { ...el, count: el.count + Math.floor(rounds / 2) }
          }
          if (el.playerId === playerId && (el.id >= id && el.id > lastId)) {
            return { ...el, count: el.count + Math.floor(rounds / 2) }
          }
          if (el.playerId !== playerId) {
            return { ...el, count: el.count + Math.floor(rounds / 2) }
          }
          else {
            return el
          }
        }
      })
        return { ...prev, 
          containers: newcontainer,
          lastState: {
            state: prev.containers, 
            player: prev.currPlayer, opponent: prev.opponent,
            qazan1: prev.qazan1, qazan2: prev.qazan2,
            tuzdyq1: prev.tuzdyq1, tuzdyq2: prev.tuzdyq2
          }
        }
      }, () => {
        //checkTuzdyq();
     }
    )

  
  }
  const restartGame = () => {
    handleOpenRestart();
  }


  const restart = () => {
    setGame(initGame);
    handleCloseRestart();
  }

  const undoF = () => {
    //await setGame(remoteData);
    // while the other player haven't made move yet
    if (game.currPlayer !== game.lastState.player && (!game.winner)) {
      setGame((prev) => {
          return { ...prev, 
            containers: prev.lastState.state,
            qazan1: prev.lastState.qazan1,
            qazan2: prev.lastState.qazan2,
            tuzdyq1: prev.lastState.tuzdyq1,
            tuzdyq2: prev.lastState.tuzdyq2,
            currPlayer: prev.lastState.player,
            opponent: prev.lastState.opponent
          }
        }
      )

      console.log("Player ", game.currPlayer, "undoed: ", game.lastState);
   
      //update(game);
    }
    else {
      console.log("Can't undo, chance expired");
    }
  }

  props.childFunc.current = undoF
  props.childFunc.restart = restartGame

  const checkTuzdyq = () => {
    setCheck(false);
    console.log("INSIDE TUZDYQ")
    if (game.tuzdyq1 !== 0) { // player has tuzdyq
      const tcount1 = getCount(game.tuzdyq1, 0, game.containers);
      console.log("There's ", tcount1, "balls in t", game.tuzdyq1, "of 0");
      moveToQazan(0, tcount1, game.tuzdyq1) // from 0th player
    }
    else {
      console.log("No tuzdyq for Player 0")
    }
    if (game.tuzdyq2 !== 0) {
      const tcount2 = getCount(game.tuzdyq2, 1, game.containers);
      console.log("There's ", tcount2, "balls in t", game.tuzdyq2, "of 1");
      moveToQazan(1, tcount2, game.tuzdyq2) // from 1st player
    }
    else {
      console.log("No tuzdyq for Player 1")
    }
  }

  const makeMove = async (playerId, id, count) => {
    
    //const thisPlayer = remoteData?.PLAYER_ONE === state.username ? 0 : 1
    //console.log("state, ", thisPlayer, state.username, remoteData );
    
    //if (game.currPlayer !== thisPlayer) {
    if (!props.freeze) {
    if (game.currPlayer !== playerId) {//|| remoteData.currPlayer !== thisPlayer) {
      console.log('currPlayer', game.currPlayer,);
      console.log('It is not your turn');
      return;
    }
    if (game.winner) {
      console.log('Game finished');
      return;
    }

    
    // player can't move on other's side
    if (!game.winner) {
      if (playerId === game.currPlayer) { // && thisPlayer=== remoteData.currPlayer) {
        // if player can't make move cos of count
        /* if (counts[playerId] === 0){
          atsyrau(playerId)
        }*/
        if (count === 0) {
          console.log('Invalid move, not enough balls')
          return
        } else if (count === 1) {
          onlyOne(playerId, id)
          
          // check for parity and win state
          isEven(playerId, id, count)
          //checkTuzdyq();

          switchPlayer()

          //update(game);
        }
        // count > 1
        else {
          oneMove(playerId, id, count)
          const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9

          // check for parity and win state
          isEven(playerId, id, count)
          //checkTuzdyq();

          switchPlayer()
          //update(game);

          
        }
      } else {
        console.log('Invalid move, Opponent is playing now')
      }
    }
    else {
      console.log("Game finished, can't make move!");
    }
  }
  }

   /* Modal things */
   const [isOpenWin, setIsOpenWin] = useState(false);
 
   const handleOpenWin = useCallback(() => setIsOpenWin(true), []);
 
   const handleCloseWin = useCallback(() => setIsOpenWin(false), []);

  const ModalWin = () => {
    return (
          <Modal
              className={styles.ModalOverlay}
              open={isOpenWin}
          >
            <Modal.Content className={styles.ModalContent}>
              <h2 style = {{justifySelf: 'center'}}>Game finished</h2>
              <p>{game.winner + " won!"} </p>
              <button onClick={restart}>Restart</button>
              <button onClick={handleCloseWin}>Close</button>
            </Modal.Content>
        </Modal>
    );
  }



  const [isOpenRestart, setIsOpenRestart] = useState(false);
 
  const handleOpenRestart = useCallback(() => setIsOpenRestart(true), []);

  const handleCloseRestart = useCallback(() => setIsOpenRestart(false), []);

 const ModalRestart = () => {
   return (
         <Modal
             className={styles.ModalOverlay}
             open={isOpenRestart}
         >
           <Modal.Content className={styles.ModalContent}>
             <h2 style = {{justifySelf: 'center'}}>Wanna Restart?</h2>
             <button onClick={restart}>Restart</button>
             <button onClick={handleCloseRestart}>Cancel</button>
           
           </Modal.Content>
       </Modal>
   );
 }

 const [isOpenTuzdyq, setIsOpenTuzdyq] = useState(false);

 const handleOpenTuzdyq = useCallback(() => {
    setIsOpenTuzdyq(true);
 }, []);

 const handleCloseTuzdyq = useCallback(() => setIsOpenTuzdyq(false), []);

const ModalTuzdyq = () => {
  return (
        <Modal
            className={styles.ModalOverlay}
            open={isOpenTuzdyq}
        >
          <Modal.Content className={styles.ModalContent}>
            <h2 style = {{justifySelf: 'center'}}>You got Tuzdyq</h2>
            <button onClick={handleCloseTuzdyq}>OK</button>
          </Modal.Content>
      </Modal>
  );
}

  return (
    <>
      <div className="board">
        <div className="board-side">
          {game.containers.map((item) => {
            if (item.playerId === 0) {
              return (
                <Otau
                  onMouseEnter = {() => (!props.freeze) ?  showHint(item.playerId, item.id, item.count) : console.log("frozen")}
                  onMouseLeave = {() => (!props.freeze) ? hideHint(item.playerId, item.id, item.count) : null}
                  hoverHint = {item.hover}
                  id={item.id}
                  color = {game.tuzdyq1 === item.id ? 'var(--tuzdyqcolor)' : 'var(--containercolor)'}
                  text = {item.text}
                  count = {item.count}
                  onClick={() => makeMove(item.playerId, item.id, item.count)}
                />
              )
            } else return <></>
          })}
        </div>
        <Qazan playerId={1} count={game.qazan2} />
        <Qazan playerId={0} count={game.qazan1} />

        <div className="board-side">
          {game.containers.map((item) =>
            item.playerId === 1 ? (
              <Otau
                onMouseEnter = {() => showHint(item.playerId, item.id, item.count)}
                onMouseLeave = {() => hideHint(item.playerId, item.id, item.count)}              
                hoverHint = {item.hover}
                id = {item.id}
                color = {game.tuzdyq2 === item.id ? 'var(--tuzdyqcolor)' : 'var(--containercolor)'}
                text = {item.text}
                count = {item.count}
                onClick={() => makeMove(item.playerId, item.id, item.count)}
              />
            ) : (
              <></>
            ),
          )} 
        </div>
      </div>
      <ModalRestart/>
      <ModalWin/>
      <ModalTuzdyq/>

      {visibility ? <PopUp toggle={togglePop} /> : null}
    </>
  )
}
export default BoardOff;

