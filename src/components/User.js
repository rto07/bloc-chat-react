import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component{
    constructor(props){
        super(props);
        this.state={
          users:''
        }
        this.usernamesRef = this.props.firebase.database().ref('usernames');
     } 
     
     componentDidMount(){
        console.log('componentDidMount');
        this.usernamesRef.on("child_added", snapshot => {
            const username2 = snapshot.val();
            username2.key = snapshot.key;
            this.setState({ usernames: this.state.userames.concat(username2) });
          });
        }


     signIn(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
     };

     signOut(){
        firebase.auth().signOut() 
        }

     render() {
       return(
           <form>
          <button onClick={this.signIn=this.signIn.bind(this)}> Sign In</button>
          <button onClick={this.signOut=this.signOut.bind(this)}>Sign Out</button>
          </form>
       )
     }
 }

 export default User;