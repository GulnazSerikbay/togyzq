import React, { Component } from 'react'
//import assert from 'assert'
import PopUp from "./Popup";
//import { FaTheRedYeti } from 'react-icons/fa';
import './Board.css'
import { Otau, Qazan } from './Otau.js'
//import Game from "./Game.js"
import { useEffect, useContext, useState  } from 'react'
import { useDebugValue } from 'react'
import Form from 'react-bootstrap/Form';



import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


import { GameBoard } from '../lib/game';
import { GlobalContext } from '../context/GlobalContext';
import { database } from '../.firebase';
import { leaveRoom, sendData, updateData } from '../functions';
import { render } from '@testing-library/react';

// write the logic for tuzdyq in map for onlyOne and oneMove (el.id===tuzdyq1)
// player 0 owns tuzdyq2!!



function Board(props) {

  const { state } = useContext(GlobalContext);
  const [remoteData, setRemoteData] = useState(null);
  //const [wins, setWins] = useState({ me: 0, other: 0 });
  const [players, setPlayers] = useState([null, null]);
  const history = useNavigate();
  
  useEffect(() => {
    console.log("id in gamejs", props.id)
    
    // get live data from remote server and update it in state
    database.ref(props.id).on('value', (snap) => {
      setRemoteData(snap.val());
      console.log("remoteData", snap.val());
      setGame(snap.val())
      setPlayers([snap.val().PLAYER_ONE, snap.val().PLAYER_TWO]);
      console.log(players);
    });

  }, [props.id]);


  //not sure if i need it
  /*
  useEffect(() => {
    if (remoteData?.winner) {
      if (remoteData.winner === state.username)
      //  setWins({ ...wins, me: wins.me + 1 });
      //else setWins({ ...wins, other: wins.other + 1 });
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
                : remoteData.winner === 'Tie' ? 'You lost. Try better next time!'
            }`
          ),
        1000
      );

    if (remoteData?.draw) {
      setTimeout(() => {
        alert('It is a draw! You gave opponent a tough time!');
      }, 1000);
    }
  }, [remoteData?.winner, state.username]);
*/





  //undo for use in parent element <Game/>
  useEffect(() => {
    props.childFunc.current = undo
  })





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
  const [winner, setWinner] = useState(null)

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

  const [containers, setContainers] = useState(initBoard)
  


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
    PLAYER_ONE: remoteData?.PLAYER_ONE,
    PLAYER_TWO: remoteData?.PLAYER_TWO
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
    const curr = currPlayer
    setGame((prev) => {
        return { ...prev, 
          currPlayer: prev.currPlayer === 0 ? 1 : 0,
          opponent: prev.currPlayer === 0 ? 0 : 1
        }
      }
    )
    setCurrPlayer((prevPlayer)=>prevPlayer===0 ? 1 : 0)
    setOpponent(curr)

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
          counts: prev.containers.reduce(
            ([c1,c2], {count, playerId}) => [playerId===0? c1+count:c1, playerId===1? c2+count:c2],
            [0,0]
          )
        }
      }
    )
    return newcount

  }

  const update = async (sending) => {

    const data =  JSON.parse(JSON.stringify(sending ));

    try {
      console.log("data being sent", game);
      await updateData(props.id, data);
    } catch (error) {
      console.log(error);
    }
  }

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
      alert("Game finished!");
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

  setGame((prev) =>(
    {
        ...prev,
      PLAYER_ONE: remoteData?.PLAYER_ONE,
      PLAYER_TWO: remoteData?.PLAYER_TWO
  })
  )
    
   update(game);

  }, [game.containers, props.id])

  const winMessage = () => {
    console.log("winner",game.winner)
    if (game.winner) {
      alert("Game finished!")
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
            

            const success = getTuzdyq(lastId, playerId)
            if (success) {
              console.log('Tuzdyq! Moving to qazan.')
              moveToQazan(game.opponent, newcount+1, lastId) 
            }
        }
        /*if (lastId === tuzdyq1 && playerId !== ) {

        }*/
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
            
            const success = getTuzdyq(lastId, playerId)
            if (success) {
              console.log('Tuzdyq! Moving to qazan.')
              moveToQazan(game.opponent, newcount+1, lastId) 
            }
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
      
      if (count > 0 && playerId === currPlayer) {
        if (count === 1) {
          const lastId = id === 9 ? 1 : id+1
          const rounds = id === 9 ? 2 : 1 //how many board sides balls travel
          const lastPlayerId = (rounds % 2 === 0) ? opponent : currPlayer
          
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
        alert("tuzdyq")
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
        alert("tuzdyq")
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

        // take all balls from otau
        /*setContainers((prevContainer) => {
          const newcontainer = prevContainer.map((el) => {
            if (el.id === id && el.playerId === playerId) {
                console.log("Taking", count, "balls from id:", id, "Player", playerId)
                return { ...el, count: 0 } 
            } else return el
          })
          return newcontainer
        })*/

        setGame((prev) => {
          const newcontainer = prev.containers.map((el) => {
              if (el.id === id && el.playerId === playerId) {
                  console.log("Taking", count, "balls from id:", id, "Player", playerId)
                  return { ...el, count: 0 } 
              } else return el
            })
            return { ...prev, 
              containers: newcontainer
            }
          }
        )

        if (playerId  === 0) {
            /*setQazan2((prevcount) => {
              console.log("qazan2 lol: ", prevcount+count)
              return prevcount+count
            });*/
            setGame((prev) => {
                return { ...prev, 
                  qazan2: prev.qazan2+count
                }
              }
            )
            
        }
        if (playerId  === 1) {
            /*setQazan1((prevcount) => {
              console.log("qazan1 lol: ", prevcount+count)
              return prevcount+count
            } 
            );*/
            setGame((prev) => {
                return { ...prev, 
                  qazan1: prev.qazan1+count
                }
              }
            )
            
            //console.log("qazan2: " + qazan2)
        }
    } 

  /* Helper: edge case, when only 1 qumalak in a container */
  const onlyOne = (playerId, id) => {
    /*setLastState({
      state: containers, 
      player: currPlayer, opponent: opponent,
      qazan1: qazan1, qazan2: qazan2,
      tuzdyq1: tuzdyq1, tuzdyq2: tuzdyq2
    });
*/
    setGame((prev) => {
        return { ...prev, 
          lastState: {
            state: prev.containers, 
            player: prev.currPlayer, opponent: prev.opponent,
            qazan1: prev.qazan1, qazan2: prev.qazan2,
            tuzdyq1: prev.tuzdyq1, tuzdyq2: prev.tuzdyq2
          }
        }
      }
    )
    
    if (id === 9) {
      /*setContainers((prevContainer) =>{
        const newcontainer = prevContainer.map((el) => {
          if (el.id === 1 && el.playerId !== playerId) {
            return { ...el, count: el.count + 1 }
          } else if (el.id === 9 && el.playerId === playerId){
            return { ...el, count: 0 }
          } else return el
        })
        checkTuzdyq(newcontainer)
        return newcontainer
      }
    )*/

    setGame((prev) => {
        const newcontainer = prev.containers.map((el) => {
          if (el.id === 1 && el.playerId !== playerId) {
            return { ...el, count: el.count + 1 }
          } else if (el.id === 9 && el.playerId === playerId){
            return { ...el, count: 0 }
          } else return el
        })
        return { ...prev, 
          containers: newcontainer
        }
      }
    )
    } else {
      /*setContainers((prevContainer) => {
        const newcontainer = prevContainer.map((el) => {
          if (el.id === id + 1 && el.playerId === playerId) {
            return { ...el, count: el.count + 1 }
          } else if (el.id === id && el.playerId === playerId) {
            return { ...el, count: 0 }
          } else return el
        })
        checkTuzdyq(newcontainer)
        return newcontainer
      }
      )
*/
      setGame((prev) => {
          const newcontainer = prev.containers.map((el) => {
            if (el.id === id + 1 && el.playerId === playerId) {
              return { ...el, count: el.count + 1 }
            } else if (el.id === id && el.playerId === playerId) {
              return { ...el, count: 0 }
            } else return el
          })
          return { ...prev, 
            containers: newcontainer
          }
        }
      )
    }
  }

  const oneMove = (playerId, id, count) => {
    const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9
    console.log('lastId: ' + lastId)
    //const lastPlayerId = (Math.floor((count + (id-1))/9)%2+player)%2 //ball landing playerid
    const rounds = Math.ceil((count + (id - 1)) / 9) //how many board sides balls travel
    console.log('rounds: ' + rounds)
    /*setLastState({
      state: containers, 
      player: currPlayer, opponent: opponent,
      qazan1: qazan1, qazan2: qazan2,
      tuzdyq1: tuzdyq1, tuzdyq2: tuzdyq2
    });*/

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
      }
    )

   /* setContainers((prevContainer) =>{
      
      const newcontainer = prevContainer.map((el) => {
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
      console.log("newcontainer: ", newcontainer)
      checkTuzdyq(newcontainer)
      return newcontainer
    }
    )*/
  
  }

  const undo = async () => {

    await setGame(remoteData);
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
      /*setContainers(game.lastState.state);
      setQazan1(game.lastState.qazan1);
      setQazan2(game.lastState.qazan2); 
      setTuzdyq1(game.lastState.tuzdyq1); 
      setTuzdyq2(game.lastState.tuzdyq2); 
      setCurrPlayer(game.lastState.player); 
      setOpponent(game.lastState.opponent); */
      console.log("Player ", game.currPlayer, "undoed: ", game.lastState);
   
      update(game);
    }
    else {
      console.log("Can't undo, chance expired");
    }
  }


  const checkTuzdyq = (list) => {
    if (game.tuzdyq1 !== 0) { // player has tuzdyq
      const tcount1 = getCount(game.tuzdyq1, 0, list);
      console.log("There's ", tcount1, "balls in t", game.tuzdyq1, "of 0");
      moveToQazan(0, tcount1, game.tuzdyq1) // from 0th player
    }
    else {
      console.log("No tuzdyq for Player 0")
    }
    if (game.tuzdyq2 !== 0) {
      const tcount2 = getCount(game.tuzdyq2, 1, list);
      console.log("There's ", tcount2, "balls in t", game.tuzdyq2, "of 1");
      moveToQazan(1, tcount2, game.tuzdyq2) // from 1st player
    }
    else {
      console.log("No tuzdyq for Player 1")
    }
  }

  const makeMove = async (playerId, id, count) => {
    const thisPlayer = remoteData?.PLAYER_ONE === state.username ? 0 : 1
    console.log("thisPlayer, ", thisPlayer);
    
    //if (game.currPlayer !== thisPlayer) {
      
    if (remoteData.currPlayer !== playerId) {// || remoteData.currPlayer !== thisPlayer) {
      console.log('It is not your turn');
      return;
    }
    if (remoteData.winner) {
      console.log('Game finished');
      return;
    }

    await setGame(remoteData);
    
    // player can't move on other's side
    if (!remoteData.winner) {
      if (playerId === remoteData.currPlayer ) {// && thisPlayer=== remoteData.currPlayer) {
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

          update(game);
        }
        // count > 1
        else {
          oneMove(playerId, id, count)
          const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9

          // check for parity and win state
          isEven(playerId, id, count)
          //checkTuzdyq();
          /* if (tuzdyq1 !== 0) {
            const tcount1 = getCount(tuzdyq1, 0);
            console.log("There's ", tcount1, "balls in t", tuzdyq1, "of 1");

            moveToQazan(0, tcount1+1, tuzdyq1) // from 0th player
          }
          
          if (tuzdyq2 !== 0) {
            const tcount2 = getCount(tuzdyq2, 1);
            console.log("There's ", tcount2, "balls in t", tuzdyq2, "of 1");

            moveToQazan(1, tcount2+1, tuzdyq2) // from 1st player
          } */
          // check for parity and win state
          //isEven(playerId, id, count)
          switchPlayer()
          update(game);

          
        }
      } else {
        console.log('Invalid move, Opponent is playing now')
      }
    }
    else {
      console.log("Game finished, can't make move!");
    }
  }

  /*
    const makeMove =(playerId, id) => {
        // console.log(playerId, currPlayer)
        let newContainers = [...containers];
        if (playerId === currPlayer) {
            if (containers[id-1].count===0){
                console.log("Invalid move, not enough balls")
                return;
            }
            else if (containers[id-1].count===1){
                console.log('only 1 qumalak')
                if (id===18){
                    // newContainers[0].count = newContainers[0].count+1;
                    // newContainers[id-1].count = 0; 
                    setContainers((prevContainer)=>prevContainer.map((el,idx)=>{ 
                        if(el.id===1){
                            return {...el,count:el.count+1};
                        }
                        if(el.id===18){
                            return {...el,count:0};
                        }          
                        else return el;
                    }));
                    // if conditions 
                    //isEven()
                    switchPlayer()
                    
                    if (hasFinished()) {
                        console.log("game finished")
                        return;
                    }

                }
                else {
                    // newContainers[id].count = newContainers[id].count+1;
                    // newContainers[id-1].count = 0;
                    setContainers((prevContainer)=>prevContainer.map((el,idx)=>{
                        if(el.id===id+1){
                            return {...el,count: el.count+1};
                        }
                        else if(el.id===id){
                            return {...el,count:0}
                        }else return el;
                    }));
                    //isEven()
                    switchPlayer()
                    if (hasFinished()) {
                        console.log("game finished")
                        return;
                    }

                }
            }
            else {
                oneMove(id, containers[id-1].count)
                //isEven()
                switchPlayer()
                if (hasFinished()) {
                    console.log("game finished")
                    return;
                }
            }
        }
        else {
            console.log("Invalid move, Opponent is playing now");
        }
    }*/
  //console.log("containers", game.containers)
  const list = [
    {
        id: "1",
        name: "classic"
    },
    {
        id: "2",
        name: "dark"
    },
    {
        id: "3",
        name: "soft"
    },
    {
        id: "4",
        name: "indie"
    },
    {
      id: "5",
      name: "brown"
    },
    {
      id: "6",
      name: "bw"
    },
    {
      id: "7",
      name: "lol"
    },
    {
      id: "8",
      name: "lol"
    },

]


  return (
    <>
      <div className="board">

        <div className="board-side">
          {game.containers.map((item) => {
            if (item.playerId === 0) {
              return (
                <Otau
                  onMouseEnter = {() => showHint(item.playerId, item.id, item.count)}
                  onMouseLeave = {() => hideHint(item.playerId, item.id, item.count)}
                  hoverHint = {item.hover}
                  id={item.id}
                  color = {game.tuzdyq1 === item.id ? 'aliceblue' : bgColor}
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
                onMouseLeave = {() => hideHint(item.playerId, item.id, item.count)}              hoverHint = {item.hover}
                id = {item.id}
                color = {game.tuzdyq2 === item.id ? 'white' : bgColor}
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
      {visibility ? <PopUp toggle={togglePop} /> : null}
     
      
 
   
    </>
  )
}
export default Board;
// <button onClick={togglePop}>Toggl



/* 
      const options  = list.map((item) => item.name)
      const [selected, setSelected] = useState(-1); 

      const handleSelect = (e) => {
        setSelected(e.target.value)
        console.log("val:", e.target.value)
      } 
        <Form.Select className = " col" id = "dropdown-basic" aria-label="Default select example"
            onChange={handleSelect}>
            <option>Open this select menu</option>
            {options.map((option, id) =>
              <option value = {id+1}>{option}</option>
            )}
        </Form.Select>

        */


        