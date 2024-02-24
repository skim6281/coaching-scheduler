import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReportForm from '../ReportForm';
import { formatDate } from '../../util';

const EventReport = () => {
  let { eventId } = useParams();
  const [event, setEvent] = useState(null);
  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/v1/coach/events/${eventId}`);
      const json = await response.json();
      setEvent(json);
    }
    fetchEvent();
  }, []);

  if(event) {
    const {availability, student, report} = event;
    return (
      <div>
        <h2>Booked Slot</h2>
        {event.name && <p>{event.name}</p>}
        <p>{`Start Time: ${formatDate(availability.start_time)}`}</p>
        <p>{`End Time: ${formatDate(availability.end_time)}`}</p>
        <p>{`Student: ${student.name}`}</p>
        <div>
          <h2>Report:</h2>
          {!report ? <ReportForm event={event}/> : 
            <>
              <p>{`Score: ${report.score}`}</p>
              <p>{`Notes: ${report.notes}`}</p>
            </>
          }
          
        </div>
      </div>
    )
  }
  return <p>Loading...</p>
}

export default EventReport;