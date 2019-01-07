import React, { Component } from 'react';

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
    }

	componentDidMount() {
		console.log("componentDidMount");
		this.messageListRef.on('child_added', snapshot => {
        	const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages:this.state.messages.concat(message) });
        })

    updateMessage () => {event;
    	event.preventDefault();
    	this.setState({
    		message: event.target.value;
    	})
    }

    submitMessage(event){
    	event.preventDefault();
    	console.log('submitMessage: '+this.state.message);
    	const nextMessage={
    		id: this.state.messages.length,
    		text: this.state.message
    	}

    	this.roomsref = this.props.firebase.database().ref('messages');
		// var list = Object.assign([], this.state.messages)
		// list.push(nextMessage)
		// this.setState({
		// 	messages: list
		// })
	}

    render(){

    	const currentMessage = this.state.messages.map((message, i) => {
    			return(
    				<li key={message.id}>{message.text}</li>
    			)
    	})

    	return (
    			<div>

    				<ol>
    					{currentMessage}
    				</ol>

    				<input onChange={this.updateMessage} type = "text" placeholder="Message"/>

    				<br/>

    				<button onClick={this.submitMessage}>Submit</button>
    			</div>
    		)
    }

}

export default MessageList;