import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {

const setDay = day => setState(prev => ({ ...prev, day })); 
const[state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: [
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
  ],

  interviewers: [{
  "1": { 
    id: 1, 
    name: "Sylvia Palmer", 
    avatar: "https://i.imgur.com/LpaY82x.png" 
  },
   "2": { 
     id: 2, 
     name: "Tori Malcolm", 
     avatar: "https://i.imgur.com/Nmx0Qxo.png"
  },
   "3": { 
     id: 3, 
     name: "Mildred Nazir", 
     avatar: "https://i.imgur.com/T2WwVfS.png"
  },
   "4": { 
     id: 4, 
     name: "Cohana Roy", 
     avatar: "https://i.imgur.com/FK8V841.jpg" 
  },
   "5": { 
     id: 5, 
     name: "Sven Jones", 
     avatar: "https://i.imgur.com/twYrpay.jpg"
     }
 }
]
  
});


useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  });
}, [])

const spotsRemaining = (day) => {
  const match = (element) => element.name === day;
 return state.days.findIndex(match)
};

function cancelInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview}
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const dayIndex = spotsRemaining(state.day)

  const dayObj = {
    ...state.days[dayIndex],
    spots:  state.days[dayIndex].spots + 1
  }
  const days = state.days

  days[dayIndex] = dayObj

  return axios.delete(`/api/appointments/${id}`)
  .then((response) => {
    setState({...state, appointments, days })
  })
}



function bookInterview(id, interview) {
  
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  const dayIndex = spotsRemaining(state.day)

  const dayObj = {
    ...state.days[dayIndex],
    spots:  state.days[dayIndex].spots - 1
  }
  const days = state.days


  days[dayIndex] = dayObj

  return axios.put(`/api/appointments/${id}`, appointment)
  .then((response) => {
    setState({...state, appointments, days})
  })
}

return {	state,	setDay,	bookInterview,	cancelInterview	};
}