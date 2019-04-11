import React, { Component } from 'react';

class User extends Component{
    constructor(props){
        super(props);
        this.state={
          users:['']
        }
        this.signIn=this.signIn.bind(this);
        this.signOut=this.signOut.bind(this);
     } 
     
     componentDidMount(){
        console.log('componentDidMount');
        this.props.firebase.auth().onAuthStateChanged(user => {
          this.props.setUser(user);
          console.log(user);
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

          <button className='signInButton' onClick={this.signIn}> Sign In</button>
          <button className='signOutButton' onClick={this.signOut}>Sign Out</button>

        </div>
       )
     }
 }

 export default User;