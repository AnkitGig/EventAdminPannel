"use client"

import { useState, useEffect } from "react"
import ApiService from "../services/api"

const EventTypes = () => {
  const [eventTypeName, setEventTypeName] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [categoryEventType, setCategoryEventType] = useState("")
  const [eventTypes, setEventTypes] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddEventType = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      await ApiService.addEventType({ eventType: eventTypeName })
      setMessage("Event type added successfully")
      setEventTypeName("")
    } catch (err) {
      setMessage("Failed to add event type")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      // Send both category and eventTypeId in one request
      await ApiService.addEventCategory(categoryName, categoryEventType)
      setMessage("Event category added successfully")
      setCategoryName("")
      setCategoryEventType("")
    } catch (err) {
      setMessage("Failed to add event category")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        setLoading(true)
        const data = await ApiService.getEventTypes()
        // Support different response shapes: array or { eventTypes: [...] }
        let types = []
        if (Array.isArray(data)) types = data
        else if (data?.eventTypes) types = data.eventTypes
        else if (data?.data) types = data.data
        setEventTypes(types)
      } catch (err) {
        console.error("Failed to fetch event types", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEventTypes()
  }, [])

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">Add Event Type & Category</h2>

      {message && <div className="mb-4 text-sm text-green-700">{message}</div>}

      <form onSubmit={handleAddEventType} className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Event Type Name</label>
        <div className="flex mt-2">
          <input
            type="text"
            value={eventTypeName}
            onChange={(e) => setEventTypeName(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-l-md"
            placeholder="e.g. Wedding"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Type"}
          </button>
        </div>
      </form>

      <form onSubmit={handleAddCategory}>
           <label className="block text-sm font-medium text-gray-700 mt-3">Associated Event Type</label>
        <select
          value={categoryEventType}
          onChange={(e) => setCategoryEventType(e.target.value)}
          className="w-full mt-2 px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select event type</option>
          {eventTypes.map((et) => (
            <option key={et._id || et.id || et.value} value={et._id || et.id || et.value}>
              {et.name || et.eventType || et.title || et.type}
            </option>
          ))}
        </select>
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full mt-2 px-3 py-2 border rounded-md"
          placeholder="e.g. Outdoor"
          required
        />

     

        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EventTypes
