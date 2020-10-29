import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList.js"
import "components/Application.scss";
import "components/Appointment/index.js"
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Matthew Salakas",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Luke Woodnutt",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Courtney Hulbert",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];



export default function Application(props) {
  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const[state, setState] = useState({
    day: "Monday",
    days: []
  });
  useEffect(() => {
    axios.get("/api/days")
    .then((response) => {
      setDays(response.data)
    });
  }, [])

  
  const booking = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    )
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
