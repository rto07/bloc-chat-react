import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      activeRoom:''
    };

    this.setActiveRoom=this.setActiveRoom.bind(this);
  }

  setActiveRoom(room){
    this.setState({
      activeRoom:room,
    })
    console.log(room);
  };

// Create a component for holding a list of messages alongside the list of available chat rooms. (MessageList.js)

// The active room should be stored in the App component's state object so that the title of the active room changes every time you visit a different room.

// The active room should be stored in App so that it's available throughout the app – both in RoomList, so that it can highlight the active room, and  MessageList, where it will filter results by the ID of the active room.

// The active room should be triggered by clicking on the name of the room in the RoomList component.


  render() {
    return (
      <div className="App">
        <header>
          <h1>
            Bloc Chat React
          </h1>
        </header>

       
          <div className='rooms'>
            <div>
              <RoomList firebase={firebase} 
                setActiveRoom={this.setActiveRoom}
                />
              </div>
            </div>


            <div className='messageList'>
              <MessageList firebase={firebase} 
              activeRoom={this.state.activeRoom}
              />
            </div>
 
      </div>


    );
  }
}


export default App;