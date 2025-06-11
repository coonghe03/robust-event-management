import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-100 to-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-extrabold text-indigo-800 flex items-center justify-center gap-2">
            📅 <span>Robust Event Management System</span>
          </h1>
          <p className="text-sm text-gray-600">
            Plan, manage and organize events with ease.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <EventForm
            fetchEvents={fetchEvents}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <EventList
            events={events}
            fetchEvents={fetchEvents}
            setSelectedEvent={setSelectedEvent}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
