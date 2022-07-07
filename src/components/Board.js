
import React, { Component } from 'react';
import { FaTheRedYeti } from 'react-icons/fa';
import './Board.css';
import {Container, Qazan } from "./Container.js";
//import Game from "./Game.js"
import { useState, useEffect } from 'react';
import { useDebugValue } from 'react';


function Board(props) {
    const bgColor = '#ffdab9'
    const Canvas = React.createRef()
    const balls1 = props.balls1
    const balls2 = props.balls2
    const [containers1, setContainers1] = useState([
        {id: 1, text:"A", count: 9},
        {id: 2, text:"B", count: 9},
        {id: 3, text:"C", count: 9},
        {id: 4, text:"D", count: 9},
        {id: 5, text:"E", count: 9},
        {id: 6, text:"F", count: 9},
        {id: 7, text:"G", count: 9},
        {id: 8, text:"H", count: 9},
        {id: 9, text:"I", count: 9}
    ]);
    const [containers2, setContainers2] = useState([
        {id: 9, text:"I", count: 9},
        {id: 8, text:"H", count: 9},
        {id: 7, text:"G", count: 9},
        {id: 6, text:"F", count: 9},
        {id: 5, text:"E", count: 9},
        {id: 4, text:"D", count: 9},
        {id: 3, text:"C", count: 9},
        {id: 2, text:"B", count: 9},
        {id: 1, text:"A", count: 9}
    ]);

    function makeMove (player, id) {
        const containers = (player==0) ? containers1 : containers2;
    }
    
    return (
        <div className="board">
            <div className="board-side">
                {containers1.map (item=>(
                    <Container 
                        id={item.id} 
                        color={(props.tuzdyq1===item.id) ? "white" : bgColor}
                        text={item.text}
                        count={containers1[item.id-1].count}
                        onClick={makeMove(0, item.id)}/>
                ))}

            </div>
            <Qazan/>
            <Qazan/>

            <div className="board-side">
            {containers2.map (item=>(
                    <Container 
                        id={item.id} 
                        color={(props.tuzdyq2===item.id) ? "white" : bgColor}
                        text={item.text}
                        count={containers1[item.id-1].count}
                        onClick={makeMove(0, item.id)}/>
                ))}
            </div>
        </div>
    );
  }

  export default Board;