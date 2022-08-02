import React from 'react';
import './User.css';
import ReactDOM from 'react-dom'
import { FaUserAstronaut } from 'react-icons/fa';

function User(props) {
    console.log("score sent to User: ", props.score);
    console.log("undo function", props.undo);
    return (
        <>
        <div className='user' style={{backgroundColor: (props.playing) ? "var(--tuzdyqcolor)": "var(--boardcolor)"}}>
                <span className="userspan m-2 border-radius-3">
                    <FaUserAstronaut size={60} style = {{color: "white", fontSize: "1.5em"}} />
                </span>
                <p> {props.name} {props.you ? 'YOU': ''}, score: {props.score}</p>
                 {props.undo ? (
                    <button className='req' onClick={() => props.undo} >Undo</button>
                  ) : null}
        </div>
        
        </>
    );
}
export default User;