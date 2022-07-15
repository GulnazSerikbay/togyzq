import React from 'react';
import './User.css';
import ReactDOM from 'react-dom'
import { FaUserAstronaut } from 'react-icons/fa';

function User(props) {
    return (
        <>
        <div className='user' style={{backgroundColor: (props.playing) ? "lightblue": "#9a8572"}}>
                <span className="userspan m-2 border-radius-3">
                    <FaUserAstronaut size={60} style = {{color: "white", fontSize: "1.5em"}} />
                </span>
                <p>user: {props.id}, score: {props.score}</p>
                <button className='req'>Undo</button>  
        </div>
        
        </>
    );
}
export default User;