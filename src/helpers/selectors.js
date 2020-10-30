export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(days => days.name === day);
  if (!state.days.length){
    return [];
  }
  if(!dayObj){
    return [];
  }
  return dayObj.appointments.map(id => state.appointments[id]); 
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(days => days.name === day);
  if (!state.days.length){
    return [];
  }
  if(!dayObj){
    return [];
  }
  return dayObj.interviewers.map(id => state.interviewers[id]); 
}

export function getInterview(state, interview) {
  if (!interview) return null
  const intObj = {};
   intObj.student = interview.student
   intObj.interviewer = state.interviewers[interview.interviewer]

  return intObj
}
