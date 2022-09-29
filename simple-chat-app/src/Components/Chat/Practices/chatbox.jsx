import React,{useEffect,useState} from 'react';
import 'react-chatbox-component/dist/style.css';
import {ChatBox} from 'react-chatbox-component';
import avator from "../../../Assets/Public";


export default function Chatbox() {
  const [currentuser,setCurrentuser] = useState('');

  let user1;

  useEffect(()=>{
   user1 = localStorage.getItem('UserData');
   user1 = JSON.parse(user1);
  },[])
  const messages = [
    {
      "text": "Hello there",
      "id": "1",
      "sender": {
        "name": "Ironman",
        "uid": "user1",
        "avatar": `${avator}`,
        "time":"1 hour ago"
      },
    },
  ]
  const user = {
    "uid" : "user1"
  }
  const time={
    "time":"12"
  }
  return (
    <div>
      <ChatBox
  messages={messages}
 user={user}
 time={time}
/>
      

    </div>
  )
}
