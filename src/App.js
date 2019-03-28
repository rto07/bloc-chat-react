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
      activeRoom:"",
      activeUser:null,
    };

    this.setActiveRoom=this.setActiveRoom.bind(this);
    this.setActiveUser=this.setActiveUser.bind(this);
  }

  setActiveRoom(clickedRoom){
    this.setState({
      activeRoom:clickedRoom.name
    });
    console.log(clickedRoom);
  };

  



  render() {
    return (
      <div className="App">
        <header>
          <h2>
            Bloc Chat React
          </h2>
        </header>

       
          <div className='roomList'>
            <RoomList 
              setActiveRoom={
                this.setActiveRoom.bind(this)}
              firebase={firebase}/>
          </div>


          <div className='messageList'>
              <MessageList
                activeRoom={
                  this.state.activeRoom}
                firebase={firebase}/>
          </div>
 
          <div className='user'>
              <User
                activeUser={
                  this.state.activeUser}
                firebase={firebase}/>
          </div>

      </div>


    );
  }
}


export default App;