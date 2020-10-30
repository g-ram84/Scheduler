import React from "react";
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Form from "./Form.js"
import './styles.scss';
import  useVisualMode  from "hooks/useVisualMode.js"
import Application from "components/Application.js"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => transition(CREATE);
  const onBack = () => back(EMPTY); 
  return (
    <main>
      <Header
       time={props.time}
      />
      <article className="appointment"></article>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={onBack}/>}
      {mode === SHOW && (
         <Show 
         student={props.interview.student}
         interviewer={props.interview.interviewer}
       />
      )}
    </main>

    
  )
}