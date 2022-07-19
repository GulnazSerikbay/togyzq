import React from 'react';
import './Otau.css';
import {useState} from 'react';
import Ball from './Ball.js';
import { useEffect } from 'react';


function Otau(props) {
    const [balllist, setBalllist] = useState([]);
    const [balllist2, setBalllist2] = useState([]);

    useEffect(() => {
        //console.log("object",props);
        //if(props.count){
        //console.log(balls);
        // setBalls(props.count);
        let list = []
        let list2 = []
        let mar = 0;
        let count = props.count;
        for (let i = 0; i < props.count && i < 10 ; i++) {
            list.push(<Ball color="brown" id = {i} marg={mar}/>);
            count--;
        }
        for (let i = 0; i < count && i < 5 ; i++) {
            list2.push(<Ball color="brown" id = {i} marg={mar}/>);
            count--;
        }
        
        //console.log("list",list);
        setBalllist([...list]);
        setBalllist2([...list2]);
     //   }
    }, [props.count])

    
    //console.log("action", props.onMouseEnter);
    //console.log('hover', props.hoverHint)
    //${(props.hoverHint=== true) ? 'hoverHint' : ''}`}
    return (
            <div 
                className= 'container btn' 
                style = {{backgroundColor: props.color, 
                    fontSize: 16, 
                    display: 'flex', 
                    alignItems: 'justify',
                    border: (props.hoverHint === true) ? '5px solid lightblue' : '2px solid #cca481'}}
                    onClick={props.onClick}    
                    onMouseEnter = {props.onMouseEnter}
                    onMouseLeave = {props.onMouseLeave}
            >
                <div className = "ballSpace">
                    {balllist.map(x => x)}
                    <div className = "overflown">
                    {balllist2.map(x => x)}
                    </div>
                </div>
                
                    <span>{props.text}</span>  
            </div>
    );
}

function Qazan(props) {
    const [qazan, setQazan] = useState([]);
    
    useEffect(() => {
        //console.log(qazan);
        let list = []
        for (let i = 0; i < props.count && i < 60; i++) {
            
            list.push(<Ball color="brown" id = {i}/>);
        }
        setQazan(list);

    }, [props.count])

    return (
        <div className = "qazan ballSpace">
        {qazan.map(x => x)}
        
        </div>
    );
}
export {Otau, Qazan};