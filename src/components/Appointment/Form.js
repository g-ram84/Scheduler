import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js";
import React, { useState } from "react";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setName("")
    setInterviewer(null)
  }
  
  const save = () => {
    props.onSave(name, interviewer)
  }
  
  const cancel = () => {
    reset()
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input 
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
             /*
             This must be a controlled component
             */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
         <Button danger onClick={cancel}>Cancel</Button>
         <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}