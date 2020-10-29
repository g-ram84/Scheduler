export function getAppointmentsForDay(state, day) {
  if (!state.days.length){
    return [];
  }

  const dayObj = state.days.find(days => days.name === day);
  if(!dayObj){
    return [];
  }
  
  return dayObj.appointments.map(id => state.appointments[id]); 
}