import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [],
      newMessage:''
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

handleChange(e) {
    e.preventDefault();
    this.setState({
        newMessage: e.target.value
    });
    console.log(e.target.value);
  }

handleSubmit(newMessage) {
    this.messagesRef.push({
      username: this.props.username ? this.props.username.displayName : "Guest",
      message: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
      console.log('submitted');

  }

  render() {

    return (
      <div>
        <div className="chatInfo">
          <p>Username: <b>{this.props.username ? this.props.username.displayName : "Guest"}</b></p>
           <p>Room Name: <b>{this.props.activeRoom}</b></p>
            <p>Message:<b>{this.state.newMessage}</b></p>
        </div>

        <div className="form">
            <form 
              onSubmit={e => {
                this.handleSubmit(this.state.newMessage);
              }}>  


            <input

              type="text"
              id="message"
              value={this.state.newMessage} 
              placeholder="Message"
              onChange={e => this.handleChange(e)}
           
            />

            <input type="submit"/>


            </form>
        </div>
        </div>
    )
  }
}



export default MessageList;