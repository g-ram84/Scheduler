import React from "react";
import DayList from "./DayList.js"
import "components/Application.scss";
import "components/Appointment/index.js"
import useApplicationData from "hooks/useApplicationData.js"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const booking = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        id={appointment.id}
        time={appointment.time}
        key={appointment.id}  
        interview={interview} 
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  })


  return (
    <main className="layout">
      <section className="sidebar">
         <img
         className="sidebar--centered"
         src="images/logo.png"
         alt="Interview Scheduler"
       />
       <hr className="sidebar__separator sidebar--centered" />
       <nav className="sidebar__menu" >
         <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
       </nav>
       <img
         className="sidebar__lhl sidebar--centered"
         src="images/lhl.png"
         alt="Lighthouse Labs"
       />
      </section>
      <section className="schedule">
        {booking}    
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
