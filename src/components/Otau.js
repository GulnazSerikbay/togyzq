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
        let mar = false;
        for (let i = 0; i < props.count && i < 10 ; i++) {
            list.push(<Ball color="brown" id = {i} marg={mar}/>);
        }
        for (let i = 0; i < props.count-list.length && i < 5 ; i++) {
            list2.push(<Ball color="brown" id = {i} marg={true}/>);
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
                style = {{
                    backgroundColor: props.color, 
                    fontSize: 16, 
                    display: 'flex', 
                    alignItems: 'justify',
                    transform: (props.hoverHint === true) ? 'scale(1.1)' : '',
                    border: (props.hoverHint === true) ? '3px solid yellow' : '3px solid var(--containerborder)'
                }}
                    onClick={props.onClick}    
                    onMouseEnter = {props.onMouseEnter}
                    onMouseLeave = {props.onMouseLeave}
            >
                <div className = "ballSpace">
                    {balllist.map(x => x)}
                    <div className = "overflown">
                        {balllist2.map(x => x)}
                    </div>
                    <div className = "scoreBall">{props.count}</div>
                </div>
                
                    <span style={{color: 'black !important'}}>{props.text}</span>  
            </div>
    );
}

function Qazan(props) {
    const [qazan, setQazan] = useState([]);
    const [overflown, setOverflown] = useState([]);

    useEffect(() => {
        //console.log(qazan);
        let list = []
        let list2 = []
        for (let i = 0; i < props.count && i < 60; i++) {
            list.push(<Ball id = {i}/>);
        }
        console.log("list length: ", list.length);
        for (let i = 0; i < props.count-list.length; i++) {
            list2.push(<Ball c id = {i} marg={true}/>);
        } 
        setQazan(list);
        setOverflown(list2);

    }, [props.count])

    return (
        <div className = "qazan ballSpace">
            {qazan.map(x => x)}
            <div className ="overflownQ">
                {overflown.map(x=>x)}
            </div>
            <div className = "scoreBall" style={{fontSize: 'small '}}>{props.count}</div>
        </div>
    );
}
export {Otau, Qazan};