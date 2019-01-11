import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props, context){ 
		super(props, context);
		this.state = {
			messages: [],
			message: '',
			username:'',
			content:'',
			roomId:'',
			sentAt:''
		};

        this.messagesRef = this.props.firebase.database().ref('messages');	
        this.updateMessage = this.updateMessage.bind(this)
		this.submitMessage = this.submitMessage.bind(this)
    };

	componentDidMount() {
		console.log("componentDidMount");
		this.messagesRef.on('child_added', snapshot => {
        	const newMessage = snapshot.val();
            newMessage.key = snapshot.key;
            this.setState({ messages:this.state.messages.concat(newMessage) });
        
        });
	};

    updateMessage(event){
    	event.preventDefault();
    	this.setState({message: event.target.value})
    	console.log("text" +event.target.value);
    };

    submitMessage(event){
    	event.preventDefault();
		this.messagesRef.push({name:this.state.message});
    	this.setState({message:''});
    	console.log('submitted: '+this.state.message);
	};

    render(){

       return (
            <div className="messagelist">
                <div>
                    {this.state.messages.map((message) => <ul key={message.key}>{message.name}</ul>)}
                </div>
            <form className="createMessage" onSubmit={this.submitMessage}>
                <button type="submit">
                    Submit
                </button>
                <input type = "text" placeholder="New Message" value={this.message} updateMessage={this.updateMessage }/>
            </form>
            </div>


        );
    }
}

export default MessageList;