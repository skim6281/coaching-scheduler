import React, {useEffect, useState} from "react";
import styles from './ReportForm.module.css';
import Errors from "../Errors";

const ReportForm = ({event}) => {
  const [score, setScore] = useState();
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if(new Date(event?.availability?.end_time) < new Date()) {
      setDisabled(false);
    }
  }, [event])

  const handleScoreChange = (e) => setScore(e.target.value);
  const handleNotesChange = e => {
    e.preventDefault();
    setNotes(e.target.value);
  }

  const createReport = async (e) => {
    e.preventDefault();
    const data = {
      report: {
        score,
        notes
      }
    }
    const response = await fetch(`/api/v1/coach/events/${event.id}/report`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if(response.status == 200 || response.status == 201) {
      alert("Report created");
      setDisabled(true);
      setErrors([]);
    } else {
      setErrors(json.errors);
    }
  }
  
  return (
    <form onSubmit={createReport}>
      <fieldset className={styles.form}  disabled={disabled ? "disabled" : ''}>
        <select value={score} onChange={handleScoreChange}>
          <option></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <textarea rows='5' value={notes} onChange={handleNotesChange} />
        <input type="submit" value="Submit"/>
      </fieldset>
      <Errors errors={errors}/>
    </form>
  )
}

export default ReportForm;