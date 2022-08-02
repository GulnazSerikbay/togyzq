import React from 'react';
import {useState} from 'react';
import './Board.css';

function Ball(props) {
    return (
        <div id = {props.id} className="ball" style={{ marginLeft: props.marg ? '30%': '' }}></div>
    );
}

export default Ball;