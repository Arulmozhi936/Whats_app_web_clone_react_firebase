import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, AttachFile, SearchOutlined } from '@material-ui/icons';
import React,{useState,useEffect} from 'react'
import "./Chat.css";
import InserEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom";
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase  from 'firebase';
function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("room")
            .doc(roomId)
            .onSnapshot((snapshot) => setRoomName
                (snapshot.data().name));
            
            db.collection("room")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp","asc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                
                );
                

        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
      e.preventDefault();
        console.log("you typed>>>", input);

        db.collection('room').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat_header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString("en-US", {timeZone: "Asia/Kolkata"})}
                    </p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>

            </div>
            <div className="chat_body">

                {messages.map(message => (
                    
                    <p className={`chat_message ${message.name===user.displayName&&"chat_receiver"}`}>
                        <span className="chat_name">{message.name}</span>
                    {message.message}
                        <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toLocaleString("en-US", {timeZone: "Asia/Kolkata"})}</span>
              
                   </p>

                ))}

               
            </div>
            
            <div className="chat_footer">
                <InserEmoticonIcon />
               
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    ></input>
                    <button onClick={sendMessage}
                        type="submit">Send a message
                        </button>
                </form>
               
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
