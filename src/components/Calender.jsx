import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calender.style.css'
import { FaBed } from 'react-icons/fa'

const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })
const customToolbar = (toolbar) => {
    // Replace button components with custom icon components
    toolbar.prev = () => <FaBed name="left" />;
    toolbar.next = () => <FaBed name="right" />;
    toolbar.today = () => <FaBed name="calendar" />;
  
    return toolbar;
  };

const Calender = () => {
    return (
        <div className='bg-white h-[27rem] rounded-md'>
            <Calendar
                views={['month']}
                defaultView="month"
                localizer={localizer}
                toolbar={customToolbar}
                headerRowStyle={(date) => ({padding: '10px'})}
                style={{ background: "#fff", padding: "10px", borderRadius: "1rem" }}
            />
        </div>
    )
}

export default Calender
