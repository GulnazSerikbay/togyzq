
import React, { Component } from 'react';
//import { FaTheRedYeti } from 'react-icons/fa';
import './Board.css';
import {Container, Qazan } from "./Container.js";
//import Game from "./Game.js"
import { useState, useEffect } from 'react';
import { useDebugValue } from 'react';




function Board(props) {
    const bgColor = '#ffdab9'

    const [qazan1, setQazan1] = useState(props.qazan1);
    const [qazan2, setQazan2] = useState(props.qazan2);
    const [currPlayer, setCurrPlayer] = useState(0); // change to string probs 
    const [opponent, setOpponent] = useState(1); // change to string probs 
    const [winner, setWinner] = useState('');


    const initBoard = [        
        { playerId: 0, id: 1, text:"A", count: 9},
        { playerId: 0, id: 2, text:"B", count: 9},
        { playerId: 0, id: 3, text:"C", count: 9},
        { playerId: 0, id: 4, text:"D", count: 9},
        { playerId: 0, id: 5, text:"E", count: 9},
        { playerId: 0, id: 6, text:"F", count: 9},
        { playerId: 0, id: 7, text:"G", count: 9},
        { playerId: 0, id: 8, text:"H", count: 9},
        { playerId: 0, id: 9, text:"I", count: 9},
        { playerId: 1, id: 18, text:"I", count: 9},
        { playerId: 1, id: 17, text:"H", count: 9},
        { playerId: 1, id: 16, text:"G", count: 9},
        { playerId: 1, id: 15, text:"F", count: 9},
        { playerId: 1, id: 14, text:"E", count: 9},
        { playerId: 1, id: 13, text:"D", count: 9},
        { playerId: 1, id: 12, text:"C", count: 9},
        { playerId: 1, id: 11, text:"B", count: 9},
        { playerId: 1, id: 10, text:"A", count: 9}
    ]

    const [containers, setContainers] = useState(initBoard);

    const switchPlayer = () => {
        const curr = currPlayer;
        setCurrPlayer(opponent);
        setOpponent(curr);
        console.log("Now player is: "+ currPlayer);

    }

    useEffect(() => {
        console.log( containers)
    }, [containers])

    const winMessage = () => {
        if (winner !== ''){
            console.log(`winner is ${winner}`);
        }
    }

    const hasFinished = () => {
        if (props.qazan1 > 81){
            setWinner('Player1')
            winMessage()
            return true;
        }
        if (props.qazan2 > 81){
            setWinner('Player2')
            winMessage()
            return true;
        }
        if (props.qazan1 === 81 && props.qazan2 === 81){
            setWinner('Tie!')
            winMessage()
            return true;
        }
        return false;
    }

    const isEven = (player, count, id) => {
        if (player!==currPlayer && count%2===0){
            moveToQazan(currPlayer, count, id)
        }
    }
    //requires count > 1
    const oneMove = (id, count) => {
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
    console.log({containers});

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
    }

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
    }
    // console.log(containers)
    return (
        <div className="board">
            <div className="board-side">
                {containers.map (item=>(
                    (item.playerId === 0) ? 
                    <Container 
                        id={item.id} 
                        color={(props.tuzdyq1===item.id) ? "white" : bgColor}
                        text={item.text}
                        count={containers[item.id-1].count}
                        onClick={() => makeMove(item.playerId, item.id)}/>
                    : <></>
                ))}

            </div>
            <Qazan playerId = {1}
                   count= {qazan2} />
            <Qazan playerId = {0}
                   count= {qazan1}/>

            <div className="board-side">
            {containers.map (item=>(
                (item.playerId === 1) ? 
                    <Container 
                        id={item.id-9} 
                        color={(props.tuzdyq2===9-(item.id-9-1)) ? "white" : bgColor}
                        text={item.text}
                        count={containers[item.id-1-9].count}
                        onClick={() => {
                            makeMove(item.playerId, item.id);
                        }}/>
                    : <></>
                ))}
            </div>
        </div>
    );
  }
  export default Board;