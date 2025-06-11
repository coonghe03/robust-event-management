import React from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EventList = ({ events, fetchEvents, setSelectedEvent }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-indigo-800 flex items-center gap-2 mb-4">
        📋 <span>Event List</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-indigo-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Organizer</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500 italic">
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="border-t hover:bg-gray-50 transition duration-200 text-sm">
                  <td className="px-4 py-2">{event.title}</td>
                  <td className="px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{event.location}</td>
                  <td className="px-4 py-2">{event.organizer}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
