import React, { Component } from 'react'
//import assert from 'assert'
import PopUp from "./Popup";
//import { FaTheRedYeti } from 'react-icons/fa';
import './Board.css'
import { Otau, Qazan } from './Otau.js'
//import Game from "./Game.js"
import { useState, useEffect } from 'react'
import { useDebugValue } from 'react'

// write the logic for tuzdyq in map for onlyOne and oneMove (el.id===tuzdyq1)
// player 0 owns tuzdyq2!!



function Board(props) {
  const bgColor = '#ffdab9'
  const [visibility, setVisibility] = useState(false);

  const ocount = 4;
  const qcount = 9;

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

  const texts = ['I','H','G','F','E', 'D', 'C','B','A']
  const initBoard  = []
    for(var i = 0; i < ocount; i++) {
        initBoard.push({playerId: 0, id: ocount-i, text:texts[i], count: qcount, hover: false});
    }
    for(var j = 0; j < ocount; j++) {
        initBoard.push({playerId: 1, id: j+1, text:texts[-j-1], count: qcount, hover: false});
    }
    console.log("Board new: ", initBoard)
  /* 
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
  */

  const [lastState, setLastState] = useState ({
          state: initBoard, 
          qazan1: 0, qazan2: 0, 
          player: 1, 
          opponent: 0,
          tuzdyq1: tuzdyq1, tuzdyq2: tuzdyq2})




  const [containers, setContainers] = useState(initBoard)

  //switches the current player
  const switchPlayer = () => {
    const curr = currPlayer
    setCurrPlayer((prevPlayer)=> prevPlayer===0 ? 1 : 0)
    setOpponent(curr)
    console.log('Player changed from: ' + currPlayer)
  }

  // recalculates how many qumalaks each side has
  const recalculate = () => {
    const newcount = containers.reduce(
      ([c1,c2], {count, playerId}) => [playerId===0? c1+count:c1, playerId===1? c2+count:c2],
      [0,0]
    )
    setCounts(newcount)
    return newcount

  }

  useEffect(() => {
    console.log(containers)
    console.log("qazan1: " + qazan1)
    console.log("qazan2: " + qazan2);
    props.onChange1(qazan1)  
    props.onChange2(qazan2)  

    const newcount = recalculate()
    if (counts[0]===0) {
      atsyrau(0)
      
    }
    if (counts[1]===0) {
      atsyrau(1)
    }
    props.handlePlayer(currPlayer)
    if (hasFinished()) {
      console.log("Game finished");
    }
    console.log("counts", counts)
    console.log("newcounts", newcount)

    console.assert(newcount[0]+newcount[1]+qazan1+qazan2 === ocount*qcount*2, newcount[0]+newcount[1]+qazan1+qazan2);

  }, [containers, qazan1, qazan2])

  const winMessage = () => {
    if (winner) {
      alert("Game finished!")
      console.log(`winner is ${winner}`)
    }
  }

  const hasFinished = () => {
    if (qazan1 > ocount*qcount) {
      setWinner('Player1')
      winMessage()
      return true;
    }
    if (qazan2 > ocount*qcount) {
      setWinner('Player2')
      winMessage()
      return true;
    }
    if (qazan1 === ocount*qcount && qazan2 === ocount*qcount) {
      setWinner('Tie!')
      winMessage()
      return true;
    }
    return false;
  }

  const getCount = (id, playerId, list) => {
    return list.filter(el => el.id === id && el.playerId === playerId)[0].count
   
  }

  

  const isEven = (playerId, id, count, container ) => {
    console.log("container sent: ", container)
    const tuzdyq = playerId ? tuzdyq1 : tuzdyq2; 
    console.log("Tuzdyq", playerId, tuzdyq);
    /* if last qumalak landed on other player's container    *
     *  and there's even, then move to Qazan                 */

    // Control Tuzdyq Otaus for both players


    if (count > 1) {
        const lastId = (id + count - 1) % ocount === 0 ? ocount : (id + count - 1) % ocount
        const rounds = Math.ceil((count + (id - 1)) / ocount) //how many board sides balls travel
        const newcount = getCount(lastId, opponent, container)
        console.log("count in the lastId", newcount);

        if (rounds % 2 === 0 &&  newcount % 2 !== 0) {
            
            console.log('Even! Moving to qazan.')
            moveToQazan(opponent, newcount + 1, lastId)
            
        }
        else if (tuzdyq === 0 && rounds % 2 === 0 && newcount === 2) {
            

            const success = getTuzdyq(lastId, playerId)
            if (success) {
              console.log('Tuzdyq! Moving to qazan.')
              moveToQazan(opponent, newcount+1, lastId) 
            }
        }
        /*if (lastId === tuzdyq1 && playerId !== ) {

        }*/
    }  
    else {//for count === 1 calculation must be different
        const lastId = id === ocount ? 1 : id+1
        const rounds = id === ocount ? 2 : 1 //how many board sides balls travel
        const newcount = getCount(lastId, opponent, container) 
        //using opponent, cause if the lastId is not in opponen't side, condition will fail
        console.log("count in the lastId", newcount);
        if (rounds % 2 === 0 &&  newcount % 2 !== 0) {
            
            console.log('Even! Moving to qazan.')
            moveToQazan(opponent, newcount+1, lastId)

        }
        else if (tuzdyq === 0  && rounds % 2 === 0 && newcount === 2){
            
            const success = getTuzdyq(lastId, playerId)
            if (success) {
              console.log('Tuzdyq! Moving to qazan.')
              moveToQazan(opponent, newcount+1, lastId) 
            }
        }
    }
  }


 

    const hideHint = (playerId, id, count) => {
        console.log("hiding");
        setContainers((prevContainer) => 
          prevContainer.map((el) => ({ ...el, hover: false} )));
    }

    const showHint = (playerId, id, count) => {
      
      if (count > 0 && playerId === currPlayer) {
        if (count === 1) {
          const lastId = id === ocount ? 1 : id+1
          const rounds = id === ocount ? 2 : 1 //how many board sides balls travel
          const lastPlayerId = (rounds % 2 === 0) ? opponent : currPlayer
          
          setContainers((prevContainer) => 
            prevContainer.map((el) => {
              if (el.id === lastId && el.playerId === lastPlayerId) {
                  return { ...el, hover: true} 
              } else return el

          }));
        }
        else { // count > 1
          
          const lastId = (id + count - 1) % ocount === 0 ? ocount : (id + count - 1) % ocount
          const rounds = Math.ceil((count + (id - 1)) / ocount) //how many board sides balls travel
          const lastPlayerId = (rounds % 2 === 0) ? opponent : currPlayer
          console.log("hovered: ", lastId, lastPlayerId)
          
          setContainers((prevContainer) => 
            prevContainer.map((el) => {
              if (el.id === lastId && el.playerId === lastPlayerId) {
                  return { ...el, hover: true} 
              } else return el

          }));
        }
       
      }
    }

    // when player can't move cos of 0 qumalaks 
    const atsyrau = (playerId) => {
      setWinner(playerId===0 ? 'Player2' : 'Player1')
      winMessage()
      alert("Atsyrau for Player", playerId);
      console.log("Atsyrau!");
      // request qumalak or not
      // then another player will accept or deny 
    }

    const getTuzdyq = (id, playerId) => {
      // request for tuzdyq or not
      
      if (id === ocount) {
        console.log("can't get tuzdyq");
        return false;
      }
      else if (playerId === 0) {
        alert("tuzdyq")
        console.log("player 1 getting tuzdyq", id);
        setTuzdyq2(id);
        return true;
      }
      else if (playerId === 1) {
        alert("tuzdyq")
        console.log("player 2 getting tuzdyq", id);
        setTuzdyq1(id);
        return true;
      }
      else return false;
    }

    const moveToQazan = (playerId, count, id) =>{
        // take all balls from otau
        setContainers((prevContainer) => {
        
          const newcontainer = prevContainer.map((el) => {
            if (el.id === id && el.playerId === playerId) {
                console.log("Taking", count, "balls from id:", id, "Player", playerId)
                return { ...el, count: 0 } 
            } else return el
          })
          return newcontainer
        }
        )
        if (playerId  === 0) {
            setQazan2((prevcount) => prevcount+ count);
            //console.log("qazan1: " + qazan1)
        }
        if (playerId  === 1) {
            setQazan1((prevcount) => prevcount+ count);
            //console.log("qazan2: " + qazan2)
        }
    } 

  /* Helper: edge case, when only 1 qumalak in a container */
  const onlyOne = (playerId, id) => {
    setLastState({
      state: containers, 
      player: currPlayer, opponent: opponent,
      qazan1: qazan1, qazan2: qazan2,
      tuzdyq1: tuzdyq1, tuzdyq2: tuzdyq2
    });
    let newcontainer;

    if (id === ocount) {
      setContainers((prevContainer) =>{
        newcontainer = prevContainer.map((el) => {
          if (el.id === 1 && el.playerId !== playerId) {
            return { ...el, count: el.count + 1 }
          } else if (el.id === ocount && el.playerId === playerId){
            return { ...el, count: 0 }
          } else return el
        })
        checkTuzdyq(newcontainer)
        return newcontainer
      }
      )
      console.log(newcontainer)
    } else {
      setContainers((prevContainer) => {
        newcontainer = prevContainer.map((el) => {
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
      console.log(newcontainer)
    }
    return newcontainer
  }

  const oneMove = (playerId, id, count) => {
    const lastId = (id + count - 1) % ocount === 0 ? ocount : (id + count - 1) % ocount
    console.log('lastId: ' + lastId)
    //const lastPlayerId = (Math.floor((count + (id-1))/9)%2+player)%2 //ball landing playerid
    const rounds = Math.ceil((count + (id - 1)) / ocount) //how many board sides balls travel
    console.log('rounds: ' + rounds)
    setLastState({
      state: containers, 
      player: currPlayer, opponent: opponent,
      qazan1: qazan1, qazan2: qazan2,
      tuzdyq1: tuzdyq1, tuzdyq2: tuzdyq2
    });
    let lcount;
    setContainers((prevContainer) =>{
      
    const newcontainer = prevContainer.map((el) => {
        if (el.id === id && el.playerId === playerId) {
          return { ...el, count: Math.ceil(rounds / 2) } //incorrect
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
      lcount = getCount(lastId, opponent, newcontainer)
      return newcontainer
    }
    )
    return lcount
  }

  const undo = () => {
    // while the other player haven't made move yet
    if (currPlayer !== lastState.player && (!winner)) {
      setContainers(lastState.state);
      setQazan1(lastState.qazan1);
      setQazan2(lastState.qazan2);
      setTuzdyq1(lastState.tuzdyq1);
      setTuzdyq2(lastState.tuzdyq2);
      setCurrPlayer(lastState.player);
      setOpponent(lastState.opponent);
      console.log("Player ", currPlayer, "undoed: ", lastState);
    }
    else {
      console.log("Can't undo, chance expired");
    }
  }


  const checkTuzdyq = (list) => {
    if (tuzdyq1 !== 0) { // player has tuzdyq
      const tcount1 = getCount(tuzdyq1, 0, list);
      console.log("There's ", tcount1, "balls in t", tuzdyq1, "of 0");
      moveToQazan(0, tcount1, tuzdyq1) // from 0th player
    }
    
    if (tuzdyq2 !== 0) {
      const tcount2 = getCount(tuzdyq2, 1, list);
      console.log("There's ", tcount2, "balls in t", tuzdyq2, "of 1");
      moveToQazan(1, tcount2, tuzdyq2) // from 1st player
    }
    else {
      console.log("No tuzdyq")
    }
  }

  const makeMove = (playerId, id, count) => {
    // player can't move on other's side
    if (!winner) {
      if (playerId === currPlayer) {
        // if player can't make move cos of count
        /* if (counts[playerId] === 0){
          atsyrau(playerId)
        }*/
        if (count === 0) {
          console.log('Invalid move, not enough balls')
          return
        } else if (count === 1) {
          const newcontainer = onlyOne(playerId, id)
          
          // check for parity and win state
          isEven(playerId, id, count, newcontainer)
          //checkTuzdyq();

          switchPlayer()

          
        }
        // count > 1
        else {
          const newcontainer = oneMove(playerId, id, count)
            console.log(newcontainer)
          // check for parity and win state
          isEven(playerId, id, count, newcontainer)
          //checkTuzdyq();
  
          switchPlayer()

          
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
  console.log("containers",containers)
  return (
    <>
      <div className="board">
        <div className="board-side">
          {containers.map((item) => {
            if (item.playerId === 0) {
              return (
                <Otau
                  onMouseEnter = {() => showHint(item.playerId, item.id, item.count)}
                  onMouseLeave = {() => hideHint(item.playerId, item.id, item.count)}
                  hoverHint = {item.hover}
                  id={item.id}
                  color = {tuzdyq1 === item.id ? 'aliceblue' : bgColor}
                  text = {item.text}
                  count = {item.count}
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
                onMouseEnter = {() => showHint(item.playerId, item.id, item.count)}
                onMouseLeave = {() => hideHint(item.playerId, item.id, item.count)}              hoverHint = {item.hover}
                id = {item.id}
                color = {tuzdyq2 === item.id ? 'white' : bgColor}
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
      <button className='undo' onClick={undo}>Undo</button> 
      
 
   
    </>
  )
}
export default Board
// <button onClick={togglePop}>Toggle Popup</button> 