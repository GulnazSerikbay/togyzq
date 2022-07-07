import React from 'react';
import './Container.css';
import {useState} from 'react';
import Ball from './Ball.js';
import { useEffect } from 'react';

function Container(props) {
    const [balls, setBalls] = useState(props.count);

    useEffect(() => {
        setBalls(props.count)
    }, [props.count])

    let balllist = [];
    for (let i = 0; i < balls; i++) {
        balllist.push(<Ball color="brown" />);
    }
    console.log('balllist', balllist)
    return (
       
            <div 
                className='container btn' 
                style = {{backgroundColor: props.color, fontSize: 16, display: 'flex', alignItems: 'justify'}}
                onClick={props.onClick}    
            >
                <div className = "ballSpace">
                    {balllist.map(x => x)}
                    
                </div>
                {props.text}
            </div>
     
        
    );
}

function Qazan(props) {
    return (
        <button className='qazan btn'></button>
    );
}
export {Container, Qazan};