import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

interface Provider {
  title: string;
  start: string;
  end: string;
}

const get_tasks = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("user-token"),
    },
    params: { view: "list" },
  };

  const response = await axios.get(`${baseURL}/tasks/`, config);

  return response;
};

const Calendar = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Provider[]>([]);

  useEffect(() => {
    get_tasks()
      .then((response: any) => {
        console.log(response.data);

        if (response && response.data) {
          const tasks: Array<{ title: string; start: string; end: string }> =
            [];

          Object.values(response.data).forEach((category: any) => {
            Object.values(category).forEach((task: any) => {
              tasks.push({
                title: task.name,
                start: task.deadline,
                end: task.deadline,
              });
            });
          });

          setEvents(tasks);

          console.log(events);
        }
      })
      .catch((error: any) => {
        alert(JSON.stringify(error.response.data.detail));
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    console.log(events);
    navigate("/login");
  };

  const data = [
    {
      title: "Event 2",
      start: "2023-03-01T12:00:00",
      end: "2023-03-01T12:00:00",
    },
    {
      title: "Event 1",
      start: "2023-05-08T10:00:00",
      end: "2023-05-08T12:00:00",
    },
  ];
  console.log(events);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        // initialView="day"
        // validRange={{
        //   start: "2023-04-04T10:00:00",
        //   end: "2023-04-19T10:00:00",
        // }}
        // visibleRange={{ start: "2023-04-01", end: "2023-04-30" }}
        // visibleRange={{
        //   start: "2020-01-01",
        //   end: "2023-12-31",
        // }}
        events={events}
      />
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Calendar;
