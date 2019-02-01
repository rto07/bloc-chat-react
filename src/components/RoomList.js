import React, { Component } from 'react';


class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newChatroom:''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickRoom = this.clickRoom.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.roomsRef.on('child_added', snapshot => {
           
            const room = { key: snapshot.key, value: snapshot.val() };
            this.setState({ 
                rooms: this.state.rooms.concat(room) 
            });
        });
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
            newChatroom:event.target.value
        })
        console.log(event.target.value);
    };

    handleSubmit(event){
        event.preventDefault();
        this.roomsRef.push({
            name: this.state.newChatroom
        });
        
        this.setState({
            newChatroom:''
        });

        console.log('submitted: '+this.state.newChatroom);
    };

    clickRoom(room) {
        this.props.setActiveRoom(room.name);
    }




    render() {
        return (
            <div className="roomlist">

                <div>

                  <ul className="list-group">
                    
                    {this.state.rooms.map((room, roomId) => <li key={roomId}
                        onClick={() => this.clickRoom(room)}>{roomId.name}
                    </li>)}

                    </ul> 

                </div>
            
                <form className="createRoom" onSubmit={(event)=> this.handleSubmit(event)}>

                    <input type = "text" placeholder="Chatroom Name" value = {this.state.handleChange} onChange = {(room)=>this.handleChange(window.event)}/> 

                    <input type="submit" value="Submit"/>
                </form>
            </div>


        );
    }
}


export default RoomList;