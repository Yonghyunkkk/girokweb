import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <FullCalendar plugins={[dayGridPlugin]} />
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Calendar;
