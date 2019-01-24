import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props){ 
		super(props);
		this.state = {
			messages: [],
            newMessage:''
		};

        this.messagesRef = this.props.firebase.database().ref('messages');
        //this.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP
        this.updateMessage = this.updateMessage.bind(this)
		this.submitMessage = this.submitMessage.bind(this)
    };

	componentDidMount() {
		console.log("componentDidMount");
		this.messagesRef.on('child_added', snapshot => {
        	const message = snapshot.val();
                message.key = snapshot.key;
        this.setState({ 
            	messages:this.state.messages.concat(message) 
            });
        });
	};

    updateMessage(event){
    	event.preventDefault();
    	this.setState({
            newMessage: event.target.value
        })
    	console.log(event.target.value);
    };

    submitMessage(event){
    	event.preventDefault();
		this.messagesRef.push({
            message:this.state.newMessage
        });
    	this.setState({
            newMessage:''
        });
    	console.log('submitted: '+this.state.newMessage);
	};

    render() {
        return (
            <div className='messageList'>
                <div>
                    <h3>Messages</h3>
                    <ul className="newMessage group">
                    {this.state.messages.filter(
                        message => message.roomId === this.props.activeRoom.key).map((message, index) =>
                            <div key={index}>
                            </div>
                    )}
                    </ul>
                </div>

                <form className="createmessage" onSubmit={(event)=> this.submitMessage(event)}>
                    <input type = "text" placeholder = "New Message" value = {this.state.newMessage} onChange = {this.updateMessage}/>

                    <input type="submit" value="Submit"
                    />

                </form>

            </div>
        )
    }
}


export default MessageList;