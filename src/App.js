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
      activeRoom:'',
    };

    this.setActiveRoom=this.setActiveRoom.bind(this);
  }

  setActiveRoom(room){
    this.setState({
      activeRoom:room,
    })
    console.log(room);
  };

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
                activeRoom={this.state.activeRoom}
                setActiveRoom={this.setActiveRoom}
                />
              </div>
            </div>


            <div className='messageList'>
              <MessageList firebase={firebase} 
              activeRoom={this.state.activeRoom}
              setActiveRoom={this.setActiveRoom}
              />
            </div>
 
      </div>


    );
  }
}


export default App;