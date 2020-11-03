import React from "react";
import Header from "./Header.js"
import Show from "./Show.js"
import Status from "./Status.js"
import Empty from "./Empty.js"
import Error from "./Error.js"
import Confirm from "./Confirm.js"
import Form from "./Form.js"
import './styles.scss';
import  useVisualMode  from "hooks/useVisualMode.js"
import Application from "components/Application.js"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"



  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  const onAdd = () => transition(CREATE);
  const onBack = () => back(EMPTY); 

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
}
  
function cancel(event) {
  
  transition(DELETING, true)
    
  props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
}
  return (
      <article 
        className="appointment" 
        data-testid="appointment"
      >
      <Header
       time={props.time}
      />
      {mode === CONFIRM && <Confirm 
        message="Are you sure you would like to delete?"
        onCancel={back}
        onConfirm={cancel}
      />}
      {mode === ERROR_DELETE &&
      <Error message="Error Deleting" onClose={back}/>}
      {mode === ERROR_SAVE &&
      <Error message="Error Saving" onClose={back}/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={onBack} 
        onSave={save}
        />}
      {mode === EDIT && (
        <Form 
        interviewers={props.interviewers}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onCancel={onBack} 
        onSave={save}
        />
      )}
      {mode === SHOW && (
         <Show 
         student={props.interview.student}
         interviewer={props.interview.interviewer}
         onDelete={() => transition(CONFIRM)}
         onEdit={() => transition(EDIT)}
       />
      )}
</article>

    
  )
}