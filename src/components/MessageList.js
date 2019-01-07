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
        	const newMessage = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages:this.state.messages.concat(newMessage) });
        })

    updateMessage(event){
    	console.log("updateMessage: " +event.target.value);
    	event.preventDefault();
    	this.setState({
    		message: event.target.value;
    	})
    }

    submitMessage(event){
    	event.preventDefault();
    	console.log('submitMessage: '+this.state.message);
		this.messagesref.push(this.state.nextMessage)
    	this.setState('message')}
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
            <div className="messagelist">
                <div>
                    {this.state.messages.map((message) => <ul key={message.key}>{message.name}</ul>)}
                </div>
            <form className="createMessage" onSubmit={this.newMessage}>
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