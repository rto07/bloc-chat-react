import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config1 = {
    apiKey: "AIzaSyA1UyUR8tl0rcY3iSmSy0BZ4ag1q_ZNOSo",
    authDomain: "bloc-chat-1234f-26340.firebaseapp.com",
    databaseURL: "https://bloc-chat-1234f-26340.firebaseio.com",
    projectId: "bloc-chat-1234f-26340",
    storageBucket: "bloc-chat-1234f-26340.appspot.com",
    messagingSenderId: "562699450906"
  };
  firebase.initializeApp(config1);


 var config2 = {
    apiKey: "AIzaSyD2PXlAOqGFdtOOhwiuIi613_H_0VLc2Lc",
    authDomain: "bloc-chat-messages.firebaseapp.com",
    databaseURL: "https://bloc-chat-messages.firebaseio.com",
    projectId: "bloc-chat-messages",
    storageBucket: "bloc-chat-messages.appspot.com",
    messagingSenderId: "884012391863"
  };
  firebase.initializeApp(config2);


class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          Bloc Chat React
        </header>

        <main>
          <RoomList firebase={firebase} />
          <MessageList firebase={firebase} />

        </main>
      </div>
    );
  }
}


export default App;