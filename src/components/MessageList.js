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
      username: this.props.currentUser ? this.props.currentUser: "userOne",
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoomId
    });
  }

  render() {

    return (
    <React.Fragment>

        <div className="activeRoom">
            Active Room: {this.props.activeRoom}
        </div>

        <div className="listOfMessages">
            {this.state.messages.filter(
                message => {
                    return message.roomId === this.props.activeRoomId}).map((
                            message, i) => (
                              <div>
                                <p key={i}>Message: {message.content}</p>
                                <p key={i}>Chatroom: {message.roomId}</p>
                                <p key={i}>Username: {message.username}</p>
                                <p key={i}>Sent at: {message.sentAt}</p>
                                <br/>
                              </div>
                            ))};
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

    </React.Fragment>
    )
  }
}



export default MessageList;