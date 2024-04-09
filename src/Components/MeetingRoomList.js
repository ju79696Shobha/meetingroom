
import React, { useState, useEffect } from 'react';


const graphqlEndPoint = 'http://localhost:3001/graphql'
const MeetingRoomList = () => {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
     const fetchMeetingRooms = async () => {
      try {
        const response = await fetch(graphqlEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            query: `
            query {
              getAllMeetingRooms {
                id
                name
                floor
                building
              }
            }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch meeting rooms');
        }

        const data = await response.json();
        console.log(data.data.getAllMeetingRooms)
        setMeetingRooms(data.data.getAllMeetingRooms);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    //fetchMeetingRooms();

    const intervalId = setInterval(fetchMeetingRooms, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
    
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container'>
      
      <ul>
        <h1>Booked Meeting Rooms List</h1>
        {meetingRooms.map(room => {
          return (
            <li key={room.id}>
            <p>Booked by  {room.name}  {room.floor} {room.building}</p>
          </li>
          )
        })}
      </ul>

    </div>
  );
};

export default MeetingRoomList;
