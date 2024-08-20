import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calender.style.css";
import { FaBed } from "react-icons/fa";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const customToolbar = (toolbar) => {
  // Replace button components with custom icon components
  toolbar.prev = () => <FaBed name="left" />;
  toolbar.next = () => <FaBed name="right" />;
  toolbar.today = () => <FaBed name="calendar" />;

  return toolbar;
};

const Calender = ({ bookings, onDateClick }) => {
  const events = bookings.map((booking) => ({
    title: booking.guestDetails.firstname + " " + booking.guestDetails.lastname,
    start: new Date(booking.bookingDetails.visitDate),
    end: new Date(booking.bookingDetails.endDate),
    allDay: true,
    bookingId: booking._id,
  }));

  const handleSelectEvent = (event) => {
    onDateClick(new Date(event.start));
  };
  return (
    <div className="bg-white h-[27rem] rounded-md">
      <Calendar
        views={["month"]}
        defaultView="month"
        localizer={localizer}
        toolbar={customToolbar}
        events={events}
        onSelectEvent={handleSelectEvent}
        headerRowStyle={(date) => ({ padding: "10px" })}
        style={{ background: "#fff", padding: "10px", borderRadius: "1rem" }}
      />
    </div>
  );
};

export default Calender;
