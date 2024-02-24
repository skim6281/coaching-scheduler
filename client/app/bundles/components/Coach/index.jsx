
import React, { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import Availability from "../Availability";
import Errors from "../Errors";
import styles from './Coach.module.css';
import Event from "../Event";
import { Link } from "react-router-dom";


const Coach = () => {
    const [startTime, setStartTime] = useState(new Date());
    const [availabilities, setAvailabilities] = useState([]);
    const [events, setEvents] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
      const fetchAvailabilities = async() => {
        const response = await fetch('/api/v1/coach/availabilities');
        const json = await response.json();
        setAvailabilities(json);
      }
      fetchAvailabilities();
    }, []);

     useEffect(() => {
      const fetchEvents = async() => {
        const response = await fetch('/api/v1/coach/events');
        const json = await response.json();
        setEvents(json);
      }
      fetchEvents();
    }, [])

    const addAvailability = async () => {
      const data = {
        availability: {
          start_time: startTime
        }
      }
      const response = await fetch('/api/v1/coach/availabilities', {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if(response.status === 200 || response.status === 201) {
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 2);
        setAvailabilities([...availabilities, {start_time: startTime, end_time: endTime} ])
        setErrors([]);
      } else {
        if(json.errors) {
          setErrors(json.errors);
        }
      }
    }

    const handleBookedEventClick = (eventId) => {
      rout
    }

    return (
      <div>
        <h1>COACH</h1>
        <Errors errors={errors}/>
        <h2>Add Availabilities</h2>
        <div>
          <DateTimePicker onChange={setStartTime} value={startTime}/>
          <button onClick={addAvailability}>Add</button>
        </div>

        <h2>Availabilities:</h2>
        <div className={styles.flex}>
          {availabilities.map((availability, index) => {
            return (
              <Availability key={index} availability={availability}/>
            )
          })}
        </div>
        <h2>Booked Slots</h2>
        <div className={styles.flex}>
          {
            events.map((event, index) => {
              return (
                <Link key={event.id} to={`events/${event.id}`}>
                  <Event event={event}/>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
}

export default Coach;