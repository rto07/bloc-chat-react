import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ""
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
        this.setState({text: event.target.value});
        this.roomsRef.push({name: this.state.newRoomName});

    }

    newRoom(event){
        event.preventDefault();
        this.setState({newRoomName: ''});
    }


    render() {
        return (
            <div className="roomlist">
                <div>
                    {this.state.rooms.map((room) => <li key={room.key}>{room.name}</li>)}
                </div>
            <form className="submit" onChange={this.onChange}>
                <button type="submit">
                    Create Room
                </button>
                <input type = "text" placeholder="New Room" value={this.state.newRoomName}  onChange={ this.onChange }/>
            </form>
            </div>


        );
    }
}


export default RoomList;