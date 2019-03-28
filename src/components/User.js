import React, { Component } from 'react';


class User extends Component{
    constructor(props){
        super(props);
        this.state={
          users:''
        }
        this.signIn=this.signIn.bind(this);
        this.signOut=this.signOut.bind(this);
        this.usernameRef = this.props.firebase.database().ref('username');
     } 
     
     componentDidMount(){
        console.log('componentDidMount');
        this.usernameRef.on('child_added', snapshot => {
          const userName = snapshot.val();
          userName.key = snapshot.key;
          this.setState({ 
             username: this.state.username.concat(userName) 
             }

     signIn(){
       var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
     }

     signOut(){
      var provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signOutWithRedirect(provider).then(function(result) {
           // This gives you a Google Access Token. You can use it to access the Google API.
           var token = result.credential.accessToken;
           // The signed-in user info.
           var user = result.user;
           // ...
         }).catch(function(error) {
           // Handle Errors here.
           var errorCode = error.code;
           var errorMessage = error.message;
           // The email of the user's account used.
           var email = error.email;
           // The firebase.auth.AuthCredential type that was used.
           var credential = error.credential;
           // ...
         });
    }

     render() {
       return(
          <button>Sign In</button>
       )
     }
 }

 export default User;