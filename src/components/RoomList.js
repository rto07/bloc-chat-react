import React, { Component } from 'react';


class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newChatroom:''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
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

    handleSubmit(newChatroom){
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
    <React.Fragment>

        <div className="listOfRooms">
          {this.state.rooms.map((room, id) => (
            <p key={id} onClick={() => this.props.setActiveRoom(room)}>
            {room.name}<br/></p>
          ))}

        </div>

        <div className="form">
            <form
              onSubmit={e => {
                e.preventDefault();
                this.handleSubmit(this.state.newChatroom);
              }}>
        
            <input

              type="text"
              id="roomName"
              value={this.state.newChatroom}
              placeholder="Chatroom"
              onChange={e => this.handleChange(e)}

            />

            <input type="submit"/>

          </form>
        </div>

    </React.Fragment>

    )
   }
  }


export default RoomList;