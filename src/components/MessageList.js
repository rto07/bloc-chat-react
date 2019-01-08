import React, { Component } from 'react';
import RoomList from './components/RoomList';

class MessageList extends Component {
	constructor(props, context){ 
		super(props, context);
		this.state = {
			messages: [],
			message: '',
		};

        this.messagesRef = this.props.firebase.database().ref('messages');	
        this.updateMessage = this.updateMessage.bind(this)
		this.submitMessage = this.submitMessage.bind(this)
    };

	componentDidMount() {
		console.log("componentDidMount");
		this.messageListRef.on('child_added', snapshot => {
        	const newMessage = snapshot.val();
            message.key = snapshot.key();
            this.setState({ messages:this.state.messages.concat(newMessage) });
        
        });
	};

    updateMessage(event){
    	event.preventDefault();
    	this.setState({message: event.target.value})
    	console.log("updateMessage: " +event.target.value);

    };

    submitMessage(event){
    	event.preventDefault();
    	console.log('submitMessage: '+this.state.message);
		this.messagesref.push(this.state.nextMessage)
    	this.setState('message')}
	};

    render(){

       return (
            <div className="messagelist">
                <div>
                    {this.state.messages.map((message) => <ul key={message.key}>{message.name}</ul>)}
                </div>
            <form className="createMessage" onSubmit={this.submitMessage}>
                <button type="submit">
                    New Message
                </button>
                <input type = "text" placeholder="New Message" value={this.messages} updateMessage={this.updateMessage }/>
            </form>
            </div>


        );
    }
}

export default MessageList;