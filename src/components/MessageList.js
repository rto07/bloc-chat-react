import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props){ 
		super(props);

		this.state = {
			messages: [],
            newMessage:''
		};

        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

	componentDidMount() {
		console.log("componentDidMount");
		this.messagesRef.on('child_added', snapshot => {
        	
            const message =  
                snapshot.val();
                message.key=snapshot.key;
        this.setState({ 
            	messages:this.state.messages.concat(message) 
            });
        });
	};

    handleChange(event){
    	event.preventDefault();
    	this.setState({
            newMessage: event.target.value
        })
    	console.log(event.target.value);
    };

    handleSubmit(event){
    	event.preventDefault();
		this.messagesRef.push({
            messages:this.state.newMessage
        });
    	this.setState({
            messages:''
        });
    	console.log('submitted: '+this.state.newMessage);
	};

    render() {
        return (
            <div className='messageList'>
                <div>
                    <h3>Messages</h3>
                    <ul className="submittedMessage group">
                    this.state.messages.filter(
                        {messages => messages.roomId === this.props.activeRoom.key}).map((newMessage,value)) =>
                            <div key={value}>
                            </div>
                    
                    </ul>
                </div>

                <form className="createmessage" onSubmit={(event)=> this.handleSubmit(event)}>
                    <input type = "text" placeholder = "New Message" value = {this.state.handleChange} onChange = {(message)=>this.handleChange(window.event)}/>

                    <input type="submit" value="Submit"
                    />

                </form>

            </div>
        )
    }
}


export default MessageList;