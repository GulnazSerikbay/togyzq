import React from 'react';
import './User.css';
import ReactDOM from 'react-dom'
import { FaUserAstronaut } from 'react-icons/fa';

function User(props) {
    return (
        <div className='user'>
            <span className="userspan m-2 border-radius-3">
                <FaUserAstronaut size={60}  style={{color: "white", fontSize: "1.5em"}} />
            </span>
             
                user: {props.id}, score: {props.score}
        </div>
    );
}
export default User;