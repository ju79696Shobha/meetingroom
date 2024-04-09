
import React, { useState } from 'react';
import MeetingRoomList from '../Components/MeetingRoomList';
const listofmeetingrooms = [
    {"id":1,"name":"room-1","floor":"1st floor","building":"1st building"},
    {"id":2,"name":"room-2","floor":"2nd floor","building":"1st building"},
    {"id":3,"name":"room-3","floor":"3rd floor","building":"1st building"}
]

const BookMeetingRoom = () => {

    const [bookingData, setBookingData] = useState([]);
    const [floor, setFloor] = useState([]);
    const [building, setBuilding] = useState([]);
    const [name, setName] = useState([]);
    const [personname, setPersonName] = useState('');
    const graphqlEndPoint = 'http://localhost:3001/graphql'
    const query = `
    mutation bookMeetingRoom(
        $name: String!
        $floor: String!
        $building: String!
      ) {
        bookMeetingRoom(
          name: $name
          floor: $floor
          building: $building
        ) {
          id
          name
          floor
          building
        }
      }
        
        `;

        const variables= {
            name: name,
            floor: floor,
            building: building
        }

    const createMeetingRoom = async () => {

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
           // 'Authorization': 'Bearer YOUR_AUTH_TOKEN', 
          },
          body: JSON.stringify({ query, variables }),
        };
      
         try {
             const response = await fetch( graphqlEndPoint, requestOptions)
             const data = await response.json();
             console.log('bookedmeetingdata', data.data.bookMeetingRoom)
             setBookingData(data.data.bookMeetingRoom);
             setPersonName('')
             if (data.errors) {
             throw new Error(data.errors[0].message);
             }
            return bookingData;
         } catch (error) {
             console.error('Error creating meeting room:', error.message);
             throw error;
         }
    };
    

    return (
    <div className="main-container">
        <div className="form-container">
            {/* Reserving an meeting room */}
        <h1>Reserving an meeting room</h1>
        <input type="text" placeholder='enter your name' onChange={(e)=> setPersonName(e.target.value)} />

        <select value={name} onChange={(e)=> setName(e.target.value)}>
            {listofmeetingrooms.map((room,index) => {
                return (
                <>
                <option>{room.name}</option>
                </>
                )
            })}
        </select>

        <select value={floor} onChange={(e)=> setFloor(e.target.value)}>
            {listofmeetingrooms.map((room,index) => {
                return (
                <>
                <option>{room.floor}</option>
                </>
                )
            })}
        </select>
        <select value={building} onChange={(e)=> setBuilding(e.target.value) }>
            {listofmeetingrooms.map((room,index) => {
                return (
                <>
                <option>{room.building}</option>
                </>
                )
            })}
        </select>
        <button onClick={createMeetingRoom}> Reserve meeting room</button>

            <h1>Your meeting is booked {personname} : Please find the detail</h1>
            {bookingData.name} {bookingData.floor} {bookingData.building}
        </div>

        <div>
             <MeetingRoomList />
        </div>
    </div>
    )

}

export default BookMeetingRoom;
