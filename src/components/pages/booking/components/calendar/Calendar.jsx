import React from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

const BookingCalendar = ({ events, onSelectDate }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dayMaxEvents={true}
      selectable={true}
      select={onSelectDate}
      aspectRatio={1.5}
      selectMirror={true}
      unselectAuto={false}
    />
  );
};

export default BookingCalendar;
