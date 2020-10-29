import React from "react";
import "./InterviewerListItem.scss";
const classNames = require('classnames');


export default function InterviewerListItem(props){
  const interviewerList = classNames('interviewerList', {
   'interviewers__item--selected': props.selected,
   })
    return (
    <li className={interviewerList} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {props.selected && props.name}
  </li>
    );
}
