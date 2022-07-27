import React from 'react';
import './Chat.css';
import {useState, useEffect, useContext} from 'react';
import { createChatRoom, sendMessage } from '../functions';
import { firestore } from '../.firebase';
import { GlobalContext } from '../context/GlobalContext';
import ScrollToBottom from 'react-scroll-to-bottom';


const newDate = new Date()
const hour = newDate.getHours();
const minutes = newDate.getMinutes();
const seconds = newDate.getSeconds();

function Chat(props) {
    //const [time, setTime] = useState(<%= new java.util.Date()%>)
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const { state } = useContext(GlobalContext);

    useEffect(() => {
        (async () => {
          try {
            await createChatRoom(props.roomID);
          } catch (error) {
            console.log(error);
          }
        })();
      }, [props.roomID]);

    useEffect(() => {
        firestore
        .collection('chats')
        .doc(props.roomID)
        .onSnapshot((snap) => {
            //console.log("snap: ", snap.data())
            const { messages } = snap.data();
            setChat(messages);
        });
    }, [props.roomID]);

    const send = async () => {
        setMessage('');
        try {
          await sendMessage(props.roomID, message, state.username);
        } catch (error) {
          console.log(error);
        }
      };

    return (
            <div className='chat mb-2 ' style={{display: "flex", marginLeft: "10px", flexDirection: "column", justifyContent: "flex-end", alignItems:'flex-start'}}>
                <ScrollToBottom className='chat__messages'>
                    <div className ="mb-2 chatel">
                        Game launched: {hour}:{minutes}:{seconds}
                        {chat.map((message, index, array) => {
                            const chat = JSON.parse(message);
                            const prevChat = JSON.parse(array[index === 0 ? index : index - 1]);

                            return (
                                <p key={message}>
                                {chat.sentBy !== prevChat.sentBy || index === 0 ? (
                                    <span>
                                    <b>{chat.sentBy}</b> • <i>{new Date(chat.time).toLocaleTimeString()}</i> <br />
                                    </span>
                                ) : null}

                                {chat.message}
                                </p>
                            );
                            })}
                    </div>
                </ScrollToBottom>

                <div className ="mb-2 senddiv">
                        <div className="form-outline form-white d-flex flex-row">
                            <input
                                className="chattext form-control p-1"
                                type='text'
                                placeholder={'Type...'}
                                value={message}
                                onKeyDown={(e) => (e.key === 'Enter' ? send() : null)}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="button" 
                                    onClick={send}
                                    className="btn sendbutton text-light p-1 btn-dark btn btn-rounded float-end">Send</button>
                        </div>
                </div>
            </div>
      
    );
}
export default Chat;


//      <textarea className="chattext form-control p-1" id="textAreaExample3" rows="1" placeholder="message"></textarea>
