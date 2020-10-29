import React from "react";
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import './styles.scss';


export default function Appointment(props) {
  return (
    <main>
      <Header
       time={props.time}
      />
      <article className="appointment"></article>
      {props.interview ? <Show 
                            student={props.interview.student}
                            interviewer={props.interview.interviewer}
                          /> : <Empty />}
    </main>

    
  )
}