import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

var config = {
    apiKey: "AIzaSyA1UyUR8tl0rcY3iSmSy0BZ4ag1q_ZNOSo",
    authDomain: "bloc-chat-1234f-26340.firebaseapp.com",
    databaseURL: "https://bloc-chat-1234f-26340.firebaseio.com",
    projectId: "bloc-chat-1234f-26340",
    storageBucket: "bloc-chat-1234f-26340.appspot.com",
    messagingSenderId: "562699450906"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom:'',
      activeUser:'',
    };
  }

  setActiveRoom(clickedRoom){
    this.setState({
      activeRoom:clickedRoom.name
    });
    console.log(clickedRoom);
  };

  setUser(userStatus){
    this.setState({
      activeUser : userStatus.MessageList.username
    });
    console.log(userStatus);
  };


  render() {
    return (
      <div className='App'>
        <header>
          <h2>
            Bloc Chat
          </h2>
        </header>

       
          <div className='roomList'>
            <RoomList 
              firebase={firebase}
              setActiveRoom={
                this.setActiveRoom.bind(this)
              }/>
          </div>


          <div className='messageList'>
              <MessageList
                activeRoom={
                  this.state.activeRoom
                }
                firebase={firebase}/>
          </div>
 
          {<div className='User'>
              <User
                setUser={
                  this.setUser.bind(this)
                }
                firebase={firebase}/>
          </div> }

      </div>


    );
  }
}


export default App;