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
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
    this.setState({
      newMessage:''
    });
      console.log('submitted');
  }

  render() {

    return (
      <div>
        <div className="activeRoom">
            {this.props.activeRoom}
        </div>

        <div className="listOfMessages">
            {this.state.messages.filter(
                message => {
                    return message.roomId === this.props.activeRoom}).map((
                            message, id) => (
                              <div key={id} >
                                <p>Content: {message.content}</p>
                                <p>Chatroom: {message.roomId}</p>
                                <p>Username: {message.username}</p>
                                <p>Sent at: {message.sentAt}</p>
                                <br/>
                              </div>
                            ))}
        </div>

        <div className="form">
            <form 
              onSubmit={e => {
                e.preventDefault();
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