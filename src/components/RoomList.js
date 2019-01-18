import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newChatroom:{
                value:''
            }
            
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val(),
            key = snapshot.key;
            this.setState({ 
                rooms: this.state.rooms.concat(room) 
            });
        });
    }

    // handleChange(e){
    //     console.log('text '+e.target.value);
    //     this.setState({
    //         newChatroom: e.target.value
    //     })
    // }

    handleSubmit(e){
        this.setState({
            newChatroom:e.target.value
        });
    };

    handleChange(e){
        this.roomsRef.push({
            name: this.state.newChatroom
        });
        this.setState({
            newChatroom:[]
        })
        console.log('A new room was submitted');
    };

    handleClick(room) {
        this.props.setActiveRoom(room);
    }


    render() {
        return (
            <div className="roomlist">
                <div>
                  <ul className="list-group">
                    {this.state.rooms.map((room, i) => <li className="list-group-item-primary" key={i}
                        onClick={() => this.handleClick(room)}>{room.name}</li>)}
                    </ul>                
                </div>
            
            <form className="createRoom" onSubmit={(e)=> this.handleSubmit(e)}>
                <input type = "text" placeholder="Chatroom Name" value={this.state.newChatroom} onChange={this.handleChange
                }/>
                <input type="submit" value="Submit"/>
            </form>
            </div>


        );
    }
}


export default RoomList;