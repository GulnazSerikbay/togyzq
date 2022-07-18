import React from 'react';
import './Otau.css';
import {useState} from 'react';
import Ball from './Ball.js';
import { useEffect } from 'react';


function Otau(props) {
    const [balllist, setBalllist] = useState([]);


    useEffect(() => {
        //console.log("object",props);
        //if(props.count){
        //console.log(balls);
        // setBalls(props.count);
        let list = []
        let mar = 0;
        for (let i = 0; i < props.count ; i++) {
            list.push(<Ball color="brown" id = {i} marg={mar}/>);
        }
        //console.log("list",list);
        setBalllist([...list]);
     //   }
    }, [props.count])

    
    console.log("action", props.onMouseEnter);
    console.log('hover', props.hoverHint)
    //${(props.hoverHint=== true) ? 'hoverHint' : ''}`}
    return (
       
            <div 
                className= 'container btn' 
                style = {{backgroundColor: props.color, 
                    fontSize: 16, 
                    display: 'flex', 
                    alignItems: 'justify',
                    border: (props.hoverHint === true) ? '5px solid yellow' : '2px solid #cca481'}}
                onClick={props.onClick}    
                onMouseEnter = {props.onMouseEnter}
                onMouseLeave = {props.onMouseLeave}
            >
                <div className = "ballSpace">
                    {balllist.map(x => x)}
                    
                </div>
                {props.text}
            </div>
     
        
    );
}

function Qazan(props) {
    const [qazan, setQazan] = useState([]);
    
    useEffect(() => {
       // console.log(props.count);
        //console.log(qazan);
        let list = []
        for (let i = 0; i < props.count; i++) {
            
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