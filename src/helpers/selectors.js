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
export function getInterview(state, interview) {
  const intObj = state.interviews.find(interviews => interviews.name === interview);
  return intObj.interviewer.map(id => state.interviewer[id])
}
