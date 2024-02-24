import React from "react";
import styles from './Availability.module.css';
import { formatDate } from "../../util";

const Availability = ({availability}) => {
  return (
    <div className={styles.container}>
      <p>{`Start: ${formatDate(availability?.start_time)}`}</p>
      <p>{`End: ${formatDate(availability?.end_time)}`}</p>
      {availability.coach && <p>{availability.coach.name}</p>}
      <p>{availability?.event?.name}</p>
    </div>
  )
}

export default Availability;