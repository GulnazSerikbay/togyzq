import React from 'react';
import './Chat.css';
import {useState} from 'react';

const newDate = new Date()
const hour = newDate.getHours();
const minutes = newDate.getMinutes();
const seconds = newDate.getSeconds();

function Chat(props) {
    //const [time, setTime] = useState(<%= new java.util.Date()%>)


    return (
            <div className='chat mb-2 ' style={{display: "flex", marginLeft: "10px", flexDirection: "column", justifyContent: "flex-end", alignItems:'flex-start'}}>
                <div className ="mb-2 chatel">
                    Game launched: {hour}:{minutes}:{seconds}
                </div>
                <div className ="mb-2 senddiv">
                        <div className="form-outline form-white d-flex flex-row">
                            <textarea className="chattext form-control p-1" id="textAreaExample3" rows="1" placeholder="message"></textarea>
                            <button type="button" className="btn sendbutton text-light p-1 btn-dark btn btn-rounded float-end">Send</button>
                        </div>
                </div>
            </div>
      
    );
}
export default Chat;