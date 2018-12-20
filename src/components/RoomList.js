import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: '',
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.onChange = this.onChange.bind(this);
        this.newRoom = this.newRoom.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) });
        });
    }

    onChange(event){
        event.preventDefault();
        this.roomsRef.push({newRoomName: event.target.value});
    }

    newRoom(event){
        event.preventDefault();
        this.setState({name: this.state.newRoomName});
    }


    render() {
        return (
            <div className="roomlist">
                <div>
                    {this.state.rooms.map((room) => <ul key={room.key}>{room.name}</ul>)}
                </div>
            <form className="createRoom" onChange={()=>this.onChange}>
                <button type="submit">
                    Create Room
                </button>
                <input type = "text" placeholder="Room Name" value={this.newRoomName}  onChange={this.onChange }/>
            </form>
            </div>


        );
    }
}


export default RoomList;