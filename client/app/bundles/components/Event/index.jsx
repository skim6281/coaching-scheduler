import React from "react";
import styles from './Event.module.css';
import { formatDate } from "../../util";

const Event = ({event}) => {

  return (
    <div className={styles.container}>
      {event?.name && <p>{event.name}</p>}
      {
        event?.availability &&
        <>
          <p>{`Start: ${formatDate(event.availability.start_time)}`}</p>
          <p>{`End: ${formatDate(event.availability.end_time)}`}</p>
          {event.availability.coach && <p>{`Coach: ${event.availability.coach.name}`}</p>}
        </>
      }
  
    </div>
  )
}

export default Event;