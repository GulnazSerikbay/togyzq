import React, { Component } from 'react'
//import { FaTheRedYeti } from 'react-icons/fa';
import './Board.css'
import { Container, Qazan } from './Container.js'
//import Game from "./Game.js"
import { useState, useEffect } from 'react'
import { useDebugValue } from 'react'

function Board(props) {
  const bgColor = '#ffdab9'

  const [qazan1, setQazan1] = useState(props.qazan1)
  const [qazan2, setQazan2] = useState(props.qazan2)

  const [currPlayer, setCurrPlayer] = useState(0) // change to string probs
  const [opponent, setOpponent] = useState(1) // change to string probs
  const [winner, setWinner] = useState('')

  const initBoard = [
    { playerId: 0, id: 1, text: 'A', count: 9 },
    { playerId: 0, id: 2, text: 'B', count: 9 },
    { playerId: 0, id: 3, text: 'C', count: 9 },
    { playerId: 0, id: 4, text: 'D', count: 9 },
    { playerId: 0, id: 5, text: 'E', count: 9 },
    { playerId: 0, id: 6, text: 'F', count: 9 },
    { playerId: 0, id: 7, text: 'G', count: 9 },
    { playerId: 0, id: 8, text: 'H', count: 9 },
    { playerId: 0, id: 9, text: 'I', count: 9 },
    { playerId: 1, id: 9, text: 'I', count: 9 },
    { playerId: 1, id: 8, text: 'H', count: 9 },
    { playerId: 1, id: 7, text: 'G', count: 9 },
    { playerId: 1, id: 6, text: 'F', count: 9 },
    { playerId: 1, id: 5, text: 'E', count: 9 },
    { playerId: 1, id: 4, text: 'D', count: 9 },
    { playerId: 1, id: 3, text: 'C', count: 9 },
    { playerId: 1, id: 2, text: 'B', count: 9 },
    { playerId: 1, id: 1, text: 'A', count: 9 },
  ]

  const [containers, setContainers] = useState(initBoard)

  const switchPlayer = () => {
    const curr = currPlayer
    setCurrPlayer((prevPlayer)=>prevPlayer===0?1:0)
    setOpponent(curr)
    console.log('Now player is: ' + currPlayer)
  }

  useEffect(() => {
    console.log(containers)
  }, [containers])

  const winMessage = () => {
    if (winner !== '') {
      console.log(`winner is ${winner}`)
    }
  }

  const hasFinished = () => {
    if (props.qazan1 > 81) {
      setWinner('Player1')
      winMessage()
      return true
    }
    if (props.qazan2 > 81) {
      setWinner('Player2')
      winMessage()
      return true
    }
    if (props.qazan1 === 81 && props.qazan2 === 81) {
      setWinner('Tie!')
      winMessage()
      return true
    }
    return false
  }

  const isEven = (player, count, id) => {
    /* if last qumalak landed on other player's container    *
     *  and there's even, then move to Qazan                 */
    if (player !== currPlayer && count % 2 === 0) {
      console.log('Even! Moving to qazan.')
      //moveToQazan(currPlayer, count, id)
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

  /*
    const moveToQazan = (playerId, count, id) =>{
        let newContainers = [...containers];
        newContainers[id-1].count = 0;
        setContainers([...newContainers]);

        if (playerId  === 0) {
            setQazan1(count);
            console.log("qazan1: " + qazan1)
        }
        if (playerId  === 1) {
            setQazan2(count);
            console.log("qazan2: " + qazan2)

        }
    } */
  /* Helper: edge case, when only 1 qumalak in a container */
  const onlyOne = (playerId, id) => {
    if (id === 9) {
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

  const makeMove = (playerId, id, count) => {
    // player can't move on other's side
    if (playerId === currPlayer) {
      if (count === 0) {
        console.log('Invalid move, not enough balls')
        return
      } else if (count === 1) {
        onlyOne(playerId, id)

        // check for parity and win state
        //isEven()
        switchPlayer()

        if (hasFinished()) {
          console.log('Game finished')
          return
        }
      }
      // count > 1
      else {
        oneMove(playerId, id, count)

        // check for parity and win state
        //isEven()
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
              <Container
                id={item.id}
                color={props.tuzdyq1 === item.id ? 'white' : bgColor}
                text={item.text}
                count={item.count}
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
            <Container
              id={item.id}
              color={props.tuzdyq2 === item.id ? 'white' : bgColor}
              text={item.text}
              count={item.count}
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
