import React, { Component } from 'react'
//import { FaTheRedYeti } from 'react-icons/fa';
import './Board.css'
import { Otau, Qazan } from './Otau.js'
//import Game from "./Game.js"
import { useState, useEffect } from 'react'
import { useDebugValue } from 'react'




function Board(props) {
  const bgColor = '#ffdab9'

  const [qazan1, setQazan1] = useState(0)
  const [qazan2, setQazan2] = useState(0)

  const [tuzdyq1, setTuzdyq1] = useState(0)
  const [tuzdyq2, setTuzdyq2] = useState(0)

  const [lastState, setLastState] = useState ({})

  const [currPlayer, setCurrPlayer] = useState(1) // change to string probs
  const [opponent, setOpponent] = useState(0) // change to string probs
  const [winner, setWinner] = useState('')

  const [counts, setCounts] = useState([81, 81])

  const initBoard = [
    { playerId: 0, id: 9, text: 'I', count: 9 },
    { playerId: 0, id: 8, text: 'H', count: 9 },
    { playerId: 0, id: 7, text: 'G', count: 9 },
    { playerId: 0, id: 6, text: 'F', count: 9 },
    { playerId: 0, id: 5, text: 'E', count: 9 },
    { playerId: 0, id: 4, text: 'D', count: 9 },
    { playerId: 0, id: 3, text: 'C', count: 9 },
    { playerId: 0, id: 2, text: 'B', count: 9 },
    { playerId: 0, id: 1, text: 'A', count: 9 },
    { playerId: 1, id: 1, text: 'A', count: 9 },
    { playerId: 1, id: 2, text: 'B', count: 9 },
    { playerId: 1, id: 3, text: 'C', count: 9 },
    { playerId: 1, id: 4, text: 'D', count: 9 },
    { playerId: 1, id: 5, text: 'E', count: 9 },
    { playerId: 1, id: 6, text: 'F', count: 9 },
    { playerId: 1, id: 7, text: 'G', count: 9 },
    { playerId: 1, id: 8, text: 'H', count: 9 },
    { playerId: 1, id: 9, text: 'I', count: 9 },
  ]
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

  const switchPlayer = () => {
    const curr = currPlayer
    setCurrPlayer((prevPlayer)=>prevPlayer===0?1:0)
    setOpponent(curr)
    console.log('Player was: ' + currPlayer)
  }

  const recalculate = () => {
    setCounts(
      containers.reduce(
        ([c1,c2], {count, playerId}) => [playerId===0? c1+count:c1, playerId===1? c2+count:c2],
        [0,0]
      )
    )
    /*if (playerId===0 && counts[0]+count===0) {
      atsyrau(playerId)
    }
    else if (playerId===1 && counts[1]+count===0) {
      atsyrau(playerId)
    } */
  }

  useEffect(() => {
    console.log(containers)
    console.log("qazan1: " + qazan1)
    console.log("qazan2: " + qazan2);
    recalculate()
    if (counts[0]===0) {
      atsyrau(0)
    }
    if (counts[0]===1) {
      atsyrau(1)
    }
    console.log("prevcounts: " + counts);
    props.handlePlayer(currPlayer)



  }, [containers, qazan1, qazan2])

  const winMessage = () => {
    if (winner !== '') {
      console.log(`winner is ${winner}`)
    }
  }

  const hasFinished = () => {
    if (qazan1 > 81) {
      setWinner('Player1')
      winMessage()
      return true
    }
    if (qazan2 > 81) {
      setWinner('Player2')
      winMessage()
      return true
    }
    if (qazan1 === 81 && qazan2 === 81) {
      setWinner('Tie!')
      winMessage()
      return true
    }
    return false
  }

  const getCount = (id, playerId) => {
    return containers.filter(el => el.id === id && el.playerId === playerId)[0].count
   
  }

  

  const isEven = (playerId, id, count) => {
    const tuzdyq = playerId ? tuzdyq1 : tuzdyq2; 
    console.log("Tuzdyq", playerId, tuzdyq);
    /* if last qumalak landed on other player's container    *
     *  and there's even, then move to Qazan                 */

    // Control Tuzdyq Otaus for both players


    if (count > 1) {
        const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9
        const rounds = Math.ceil((count + (id - 1)) / 9) //how many board sides balls travel
        const newcount = getCount(lastId, opponent)
        console.log("count in the lastId", newcount);

        if (rounds % 2 === 0 &&  newcount % 2 !== 0) {
            
            console.log('Even! Moving to qazan.')
            moveToQazan(opponent, newcount + 1, lastId)
            
        }
        else if (tuzdyq === 0 && rounds % 2 === 0 && newcount === 2) {
          console.log('Tuzdyq! Moving to qazan.')

            getTuzdyq(lastId, playerId)
            moveToQazan(opponent, newcount+1, lastId) 
        }
        /*if (lastId === tuzdyq1 && playerId !== ) {

        }*/
    }  
    else {//for count === 1 calculation must be different
        const lastId = id === 9 ? 1 : id+1
        const rounds = id === 9 ? 2 : 1 //how many board sides balls travel
        const newcount = getCount(lastId, opponent) 
        //using opponent, cause if the lastId is not in opponen't side, condition will fail
        console.log("count in the lastId", newcount);
        if (rounds % 2 === 0 &&  newcount % 2 !== 0) {
            
            console.log('Even! Moving to qazan.')
            moveToQazan(opponent, newcount+1, lastId)

        }
        else if (tuzdyq === 0  && rounds % 2 === 0 && newcount === 2){
            console.log('Tuzdyq! Moving to qazan.')
            getTuzdyq(lastId, playerId)
            moveToQazan(opponent, newcount+1, lastId) 
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

    const overflowOtau = () => {

    }

    // when player can't move cos of 0 qumalaks 
    const atsyrau = (playerId) => {
      alert("Atsyrau for Player", playerId);
      console.log("Atsyrau!");
      // request qumalak or not
      // then another player will accept or deny 
    }

    const getTuzdyq = (id, playerId) => {
      // request for tuzdyq or not
      alert("tuzdyq")
      if (id === 9) {
        console.log("can't get tuzdyq");
      }
      else if (playerId === 0) {
        console.log("player 1 getting tuzdyq", id);
        setTuzdyq2(id);
      }
      else if (playerId === 1) {
        console.log("player 2 getting tuzdyq", id);
        setTuzdyq1(id);
      }
    }

    const moveToQazan = (playerId, count, id) =>{
        // take all balls from otau
        setContainers((prevContainer) =>
        prevContainer.map((el) => {
          if (el.id === id && el.playerId === playerId) {
              console.log("Taking", count, "balls from id:", id, "Player", playerId)
              return { ...el, count: 0 } 
          } else return el
        }),
        )
        if (playerId  === 0) {
            props.onChange2(qazan2+count)  
            setQazan2((prevcount) => prevcount+ count);
            //console.log("qazan1: " + qazan1)
        }
        if (playerId  === 1) {
            props.onChange1(qazan1+count)  
            setQazan1((prevcount) => prevcount+ count);
            //console.log("qazan2: " + qazan2)
        }
    } 

  /* Helper: edge case, when only 1 qumalak in a container */
  const onlyOne = (playerId, id) => {
    if (id === 9) {
      setLastState({state: containers, player: currPlayer})
      setContainers((prevContainer) =>
        prevContainer.map((el) => {
          if (el.id === 1 && el.playerId !== playerId) {
            return { ...el, count: el.count + 1 }
          } else if (el.id === 9 && el.playerId === playerId) {
            return { ...el, count: 0 }
          } else return el
        }),
      )
    } else {
      setContainers((prevContainer) =>
        prevContainer.map((el) => {
          if (el.id === id + 1 && el.playerId === playerId) {
            return { ...el, count: el.count + 1 }
          } else if (el.id === id && el.playerId === playerId) {
            return { ...el, count: 0 }
          } else return el
        }),
      )
    }
  }

  const oneMove = (playerId, id, count) => {
    const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9
    console.log('lastId: ' + lastId)
    //const lastPlayerId = (Math.floor((count + (id-1))/9)%2+player)%2 //ball landing playerid
    const rounds = Math.ceil((count + (id - 1)) / 9) //how many board sides balls travel
    console.log('rounds: ' + rounds)
    setLastState({state: containers, player: currPlayer})
    setContainers((prevContainer) =>
      
      prevContainer.map((el) => {
        if (el.id === id && el.playerId === playerId) {
          return { ...el, count: 1 }
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
        } else {
          //lands on this player's side
          if (el.playerId === playerId && el.id >= id && el.id <= lastId) {
            return { ...el, count: el.count + Math.ceil(rounds / 2) }
          }
          if (el.playerId === playerId && (el.id < id || el.id > lastId)) {
            return { ...el, count: el.count + Math.floor(rounds / 2) }
          }
          if (el.playerId !== playerId) {
            return { ...el, count: el.count + Math.floor(rounds / 2) }
          }
        }
      }),
    )
  }

  const undo = () => {
    // while the other player haven't made move yet
    if (currPlayer !== lastState.player) {
      setContainers(lastState.state);
      switchPlayer()
      console.log("Player ", currPlayer, "undoed: ", lastState);
    }
    else {
      console.log("Can't undo, chance expired");
    }
  }

  const makeMove = (playerId, id, count) => {
    // player can't move on other's side
    if (playerId === currPlayer) {
      // if player can't make move cos of count
      if (counts[playerId] === 0){
        atsyrau(playerId)
      }
      if (count === 0) {
        console.log('Invalid move, not enough balls')
        return
      } else if (count === 1) {
        onlyOne(playerId, id)
        
        // check for parity and win state
        isEven(playerId, id, count)
        if (tuzdyq1 !== 0) {
          
          const tcount1 = getCount(tuzdyq1, 1);
          console.log("There's ", tcount1, "balls in t", tuzdyq1, "of 1");
          moveToQazan(1, tcount1, tuzdyq1) // from 0th player
        }
        
        if (tuzdyq2 !== 0) {
          const tcount2 = getCount(tuzdyq2, 0);
          moveToQazan(0, tcount2, tuzdyq2) // from 1st player
        }

        switchPlayer()

        if (hasFinished()) {
          console.log('Game finished')
          return
        }
      }
      // count > 1
      else {
        oneMove(playerId, id, count)
        const lastId = (id + count - 1) % 9 === 0 ? 9 : (id + count - 1) % 9

        // check for parity and win state
        isEven(playerId, id, count)
        if (tuzdyq1 !== 0) {
          const tcount1 = getCount(tuzdyq1, 1);
          moveToQazan(0, tcount1, tuzdyq1) // from 0th player
        }
        
        if (tuzdyq2 !== 0) {
          const tcount2 = getCount(tuzdyq2, 0);
          moveToQazan(1, tcount2, tuzdyq2) // from 1st player
        }
        // check for parity and win state
        //isEven(playerId, id, count)
        switchPlayer()

        if (hasFinished()) {
          console.log('Game finished')
          return
        }
      }
    } else {
      console.log('Invalid move, Opponent is playing now')
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
  console.log("containers",containers)
  return (
    <div className="board">
      <div className="board-side">
        {containers.map((item) => {
          if (item.playerId === 0) {
            return (
              <Otau
                id={item.id}
                color = {tuzdyq1 === item.id ? 'white' : bgColor}
                text = {item.text}
                count = {item.count}
                /*{containers.find(obj => {
        return obj.id === item.id && obj.playerId === item.playerId
      })}*/
                onClick={() => makeMove(item.playerId, item.id, item.count)}
              />
            )
          } else return <></>
        })}
      </div>
      <Qazan playerId={1} count={qazan2} />
      <Qazan playerId={0} count={qazan1} />

      <div className="board-side">
        {containers.map((item) =>
          item.playerId === 1 ? (
            <Otau
              id = {item.id}
              color = {tuzdyq2 === item.id ? 'white' : bgColor}
              text = {item.text}
              count = {item.count}
              /*{containers.find(obj => {
                            return obj.id === item.id && obj.playerId === item.playerId
                          })}*/
              onClick={() => makeMove(item.playerId, item.id, item.count)}
            />
          ) : (
            <></>
          ),
        )}
      </div>
    </div>
  )
}
export default Board
