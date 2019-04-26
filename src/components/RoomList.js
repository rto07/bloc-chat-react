import React, { Component } from 'react';


class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newChatroom:'',
            // isHovered: false
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

    // removeRoom(event){
    //   this.roomsRef.splice({name:this.state.room})
    // };

   render() {
        return (


        <div className="listOfRooms">

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

              <div className='selectRoom'>
                {this.state.rooms.map((room, id) => (
                <button key={id} onClick={() => this.props.setActiveRoom(room)}>{room.name}
                </button>
                ))
                }
              </div>

              {/* <div className="roomRemoval">
                <button >

                </button>
              </div> */}
          </div>

        </div>


    )
   }
  }


export default RoomList;