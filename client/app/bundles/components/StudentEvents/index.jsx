import React, { useState, useEffect } from "react";
import Event from "../Event";

const StudentEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async() => {
      const response = await fetch('/api/v1/student/events');
      const json = await response.json();
      setEvents(json);
    }
    fetchEvents();
  }, [])

  return (
    <div>
      {
        events.map((event) => {
          return (
            <Event key={event.id} event={event}/>
          )
        })
      }
    </div>
  )
}

export default StudentEvents;