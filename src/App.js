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
      username:null
        };
  }

  setActiveRoom(clickedRoom){
    this.setState({
      activeRoom:clickedRoom.name
    });
    console.log(clickedRoom);
  };

  setUser(user){
    this.setState({
      username : user
    });
console.log(user);
  };


  render() {
    return (
      <div className='App'>
        <header>
          <h1>
            BLOC CHAT
          </h1>
        </header>

       
        <div className='User'>
              <User
                firebase={firebase}
                setActiveRoom={
                  this.setActiveRoom=this.setActiveRoom.bind(this)
                }
                activeRoom={
                  this.state.activeRoom
                }

                setUser={
                  this.setUser=this.setUser.bind(this)
                }
                username={
                    this.state.username
                }/>
          </div> 
          
          <div className='roomList'>
            <RoomList 
              firebase={firebase}
              setActiveRoom={
                this.setActiveRoom=this.setActiveRoom.bind(this)
              }
              activeRoom={
                this.state.activeRoom
              }

              setUser={
                this.setUser=this.setUser.bind(this)
              }
              username={
                  this.state.username
              }/>
          </div>


          <div className='messageList'>
              <MessageList
                firebase={firebase}
                setActiveRoom={
                  this.setActiveRoom=this.setActiveRoom.bind(this)
                }
                activeRoom={
                  this.state.activeRoom
                }

                setUser={
                  this.setUser=this.setUser.bind(this)
                }
                username={
                    this.state.username
                }/>
          </div>

      </div>
    );
  }
}


export default App;