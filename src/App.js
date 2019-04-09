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
      username:''
        };
    this.setActiveRoom=this.setActiveRoom.bind(this);

  }

  setActiveRoom(clickedRoom){
    this.setState({
      activeRoom:clickedRoom.name
    });
    console.log(clickedRoom);
  };

  setUser(user){
    this.setState({
      user : user
    });
    console.log(user);
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
                this.setActiveRoom
              }
              activeRoom={
                this.state.activeRoom
              }/>
          </div>


          <div className='messageList'>
              <MessageList
                firebase={firebase}
                activeRoom={
                  this.state.activeRoom
                }
                setActiveRoom={
                  this.setActiveRoom
                } />
          </div>
 
          <div className='User'>
              <User
                firebase={firebase}
                setUser={
                  this.setUser.bind(this)
                }
                user={
                    this.state.user
                }/>
          </div> 

      </div>
    );
  }
}


export default App;