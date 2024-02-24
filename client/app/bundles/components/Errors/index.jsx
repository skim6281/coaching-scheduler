import React from "react";
import styles from './Errors.module.css';

const Errors = ({errors}) => {
  if(errors.length > 0) {
    return errors.map((error, index) => <p className={styles.error} key={index}>{error}</p>)
  }
  return null;
}

export default Errors;