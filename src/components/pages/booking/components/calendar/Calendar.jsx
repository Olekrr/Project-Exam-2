import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.scss";

const BookingCalendar = ({ events, onDateSelect, venueName }) => {
  const formattedEvents = events.map((event) => {
    const endDate = new Date(event.end);
    endDate.setDate(endDate.getDate() + 1);
    return {
      ...event,
      start: new Date(event.start).toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0]
    };
  });

  return (
    <div className="booking-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        selectable={true}
        select={(info) => onDateSelect(info)}
        selectOverlap={false}
        eventOverlap={false}
        validRange={{ start: new Date().toISOString() }}
        eventColor="red"
        eventTextColor="white"
        height="auto"
      />
    </div>
  );
};

export default BookingCalendar;
