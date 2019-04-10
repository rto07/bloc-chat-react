import React, { Component } from 'react';

class User extends Component{
    constructor(props){
        super(props);
        this.state={
          users:''
        }
     } 
     
     componentDidMount(){
        console.log('componentDidMount');
        this.props.firebase.auth().onAuthStateChanged(user => {
          this.props.setUser(user);
        });
      }


     signIn(){
        var provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithRedirect(provider);
     };

     signOut(){
        this.props.firebase.auth().signOut() 
        }

     render() {
       return(

        <div >

            <h3 className="seeUsername">
              {this.props.username ? this.props.username.displayName : "Guest"}
            </h3>

          <button className='signInButton' onClick={this.signIn=this.signIn.bind(this)}> Sign In</button>
          <button className='signOutButton' onClick={this.signOut=this.signOut.bind(this)}>Sign Out</button>

        </div>
       )
     }
 }

 export default User;