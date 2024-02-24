import React, { useEffect, useState } from "react";
import Availability from "../Availability";
import Errors from '../Errors';
import Event from "../Event";
import styles from './Student.module.css';

const Student = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchAvailabilities = async() => {
      const response = await fetch('/api/v1/student/availabilities');
      const json = await response.json();
      setAvailabilities(json);
    }
    fetchAvailabilities();
  }, []);

    useEffect(() => {
      const fetchEvents = async() => {
        const response = await fetch('/api/v1/student/events');
        const json = await response.json();
        setEvents(json);
      }
      fetchEvents();
    }, [])

  const handleBook = ({id, start_time, end_time, coach}) => async () => {
    if (confirm("Are you sure?")) {
      const response = await fetch(`/api/v1/student/availabilities/${id}/event`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({event: {name: ''}})
      });
      const json = await response.json();
      if(response.status === 200 || response.status === 201) {
        const newAvailabilities = [...availabilities];
        const aIndex = newAvailabilities.findIndex(a => a.id = id);
        newAvailabilities.splice(aIndex, 1);
        setAvailabilities(newAvailabilities);
        setEvents([...events, {availability: {start_time, end_time, coach}, id} ])
        setErrors([]);
      } else {
        if(json.errors) {
          setErrors(json.errors);
        }
      }
    }
  }

  return (
    <div>
      <h1>STUDENT</h1>
      <Errors errors={errors}/>
      <h2>Availabilities:</h2>
      <div className={styles.flex}>
        {availabilities.map((availability) => {
          return (
            <div key={availability.id}>
              <Availability availability={availability}/>
              <button onClick={handleBook(availability)}>Book</button>
            </div>
          )
        })}
      </div>
      <h2>Booked Slots:</h2>
        <div className={styles.flex}>
          {
            events.map((event, index) => {
              return (
                <Event key={event.id} event={event}/>
              )
            })
          }
        </div>
    </div>
  )
}

export default Student;