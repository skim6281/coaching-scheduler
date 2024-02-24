import React from "react";
import { Link } from "react-router-dom";
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <div className={styles.container}>
      <Link to="/">Coach</Link>
      <Link to="/student">Student</Link>
    </div>
  )
}

export default Nav;