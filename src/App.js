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
    this.setState({activeRoom:room,})
  };

  render() {
    return (
      <div className="App">
        <header>
          Bloc Chat React
        </header>

        <main>
        <div className="rooms">
          <RoomList firebase={firebase} 
          activeRoom={this.state.activeRoom}
          setActiveRoom={this.setActiveRoom}
          />
        </div>


        <div className='messageList'>
          <messageList firebase={firebase} 
          activeRoom={this.state.activeRoom}
          setActiveRoom={this.setActiveRoom}
          />
        </div>
        </main>
      </div>

    );
  }
}


export default App;