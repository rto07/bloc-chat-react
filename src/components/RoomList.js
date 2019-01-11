import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.onChange = this.onChange.bind(this);
        this.newRoom = this.newRoom.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ 
                rooms: this.state.rooms.concat(room) 
            });
        });
    }

    onChange(e){
        this.setState({
            newRoomName: e.target.value
        })
    }

    newRoom(e){
        this.roomsRef.push({
            name: this.state.newRoomName
        });
        e.preventDefault();
        this.setState({
            newRoomName:''
        });
    }


    render() {
        return (
            <div className="roomlist">
                <div>
                    {this.state.rooms.map((room) => <ul key={room.key}>{room.name}</ul>)}
                </div>
            <form className="createRoom" onSubmit={(e)=> this.newRoom(e)}>
                <input type = "text" placeholder="Chatroom Name" value={this.state.newRoomName} onChange={(e) => this.onChange(e)}/>
                <input type="submit" value="Submit"/>
            </form>
            </div>


        );
    }
}


export default RoomList;