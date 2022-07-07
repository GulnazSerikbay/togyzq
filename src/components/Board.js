
import React, { Component } from 'react';
//import { FaTheRedYeti } from 'react-icons/fa';
import './Board.css';
import {Container, Qazan } from "./Container.js";
//import Game from "./Game.js"
import { useState, useEffect } from 'react';
import { useDebugValue } from 'react';




function Board(props) {
    const bgColor = '#ffdab9'

    
    const [currPlayer, setCurrPlayer] = useState(0); // change to string probs 
    const [opponent, setOpponent] = useState(1); // change to string probs 

    const [winner, setWinner] = useState('');

    if (props.qazan1 > 81){
        setWinner('Player1')
    }
    if (props.qazan2 > 81){
        setWinner('Player2')
    }
    if (props.qazan1 === 81 && props.qazan2 === 81){
        setWinner('Tie!')
    }


    const Canvas = React.createRef()
    const balls1 = props.balls1
    const balls2 = props.balls2
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

    function switchPlayer () {
        const curr = currPlayer;
        setCurrPlayer(opponent);
        setOpponent(curr);
    }
    function win (){
        if (winner != ''){
            console.log(`winner is ${currPlayer}`);
        }
    }
    //requires count > 1
    function oneMove (id, count) {
        let currId = id+1;
        let newContainers = [...containers];
        newContainers[id-1].count = 0
        for (let i = 1; i < count-1; i++) {
            if (currId>18){
                currId = 0;
            }
            else{
                currId++;
            }
            newContainers[currId-1].count++;
        }
        // console.log('oneMove', newContainers)
        setContainers(newContainers)
    } 


    function makeMove (playerId, id) {
        // console.log(playerId, currPlayer)
        if (playerId === currPlayer) {
            if (containers[id-1].count===0){
                console.log("Invalid move, not enough balls")
                return;
            }
            else if (containers[id-1].count===1){
                console.log('only 1 qumalak')
                if (id===18){
                    containers[0].count = containers[0].count+1;
                    containers[id-1].count = 0;
                }
                else {
                    containers[id].count = containers[id].count+1;
                    containers[id-1].count = 0;
                }
            }
            else {
                oneMove(id, containers[id-1].count)
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
                        onClick={() => {
                            makeMove(item.playerId, item.id);
                        }}/>
                    : <></>
                ))}

            </div>
            <Qazan/>
            <Qazan/>

            <div className="board-side">
            {containers.map (item=>(
                (item.playerId === 1) ? 
                    <Container 
                        id={item.id-9} 
                        color={(props.tuzdyq2===item.id-9) ? "white" : bgColor}
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