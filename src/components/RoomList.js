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
        this.setState({newRoomName: event.target.value})
        console.log("text");
    }

    newRoom(event){
        event.preventDefault();
        this.roomsRef.push({name: this.state.newRoomName});
        this.setState({newRoomName:''});
        console.log('submitted');
    }


    render() {
        return (
            <div className="roomlist">
                <div>
                    {this.state.rooms.map((room) => <ul key={room.key}>{room.name}</ul>)}
                </div>
            <form className="createRoom" onSubmit={this.newRoom}>
                <button type="submit">
                    New Room
                </button>
                <input type = "text" placeholder="New Room" value={this.newRoomName} onChange={this.onChange }/>
            </form>
            </div>


        );
    }
}


export default RoomList;