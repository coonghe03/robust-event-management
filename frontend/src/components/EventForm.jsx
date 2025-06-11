import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ fetchEvents, selectedEvent, setSelectedEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    organizer: '',
  });

  useEffect(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        organizer: '',
      });
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEvent) {
        await axios.put(`http://localhost:5000/api/events/${selectedEvent.id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/events', formData);
      }
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        organizer: '',
      });
      setSelectedEvent(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {['title', 'description', 'date', 'location', 'organizer'].map((field) => (
        <div className="flex flex-col gap-1" key={field}>
          <label className="text-sm text-gray-700 capitalize font-medium">{field}</label>
          <input
            name={field}
            type={field === 'date' ? 'date' : 'text'}
            value={formData[field]}
            onChange={handleChange}
            required
            className="px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      ))}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-md transition duration-200 w-full"
        >
          {selectedEvent ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
