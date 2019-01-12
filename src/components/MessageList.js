import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props){ 
		super(props);
		this.state = {
			messages: [],
			username:'',
			content:'',
			roomId:'',
			sentAt:''
		};

        this.messagesRef = this.props.firebase.database().ref('messages');	
  //       this.updateMessage = this.updateMessage.bind(this)
		// this.submitMessage = this.submitMessage.bind(this)
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

 //    updateMessage(event){
 //    	event.preventDefault();
 //    	this.setState({message: event.target.value})
 //    	console.log("text" +event.target.value);
 //    };

 //    submitMessage(event){
 //    	event.preventDefault();
	// 	this.messagesRef.push({name:this.state.message});
 //    	this.setState({message:''});
 //    	console.log('submitted: '+this.state.message);
	// };

    render() {
        return (
            <div>
                <h3>Messages</h3>
                <ul className="list message">
                    {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
                        <div key={index}>
                            	{message.content}
                            	{message.username}
                            	{message.roomId}
								{message.sentAt}
                        </div>
                    )}
                </ul>
            </div>
        )
    }
}


export default MessageList;