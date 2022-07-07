import React from 'react';
import './Container.css';
import {useState} from 'react';
import Ball from './Ball.js';

function Container(props) {
    const [balls, setBalls] = useState(props.count);

    var balllist = [];
    for (var i = 0; i < balls; i++) {
        balllist.push(<Ball color="brown" />);
    }
    
    return (
       
            <div 
                className='container btn' 
                style = {{backgroundColor: props.color, fontSize: 16, display: 'flex', alignItems: 'justify'}}>
                <div className = "ballSpace">
                    {balllist}
                    
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