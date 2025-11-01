"use client"

import { useState } from "react"
import ApiService from "../services/api"

const EventTypes = () => {
  const [eventTypeName, setEventTypeName] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [categoryEventType, setCategoryEventType] = useState("")
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
      // Send both category and eventType in one request
      await ApiService.addEventCategory({ name: categoryName }, categoryEventType)
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
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full mt-2 px-3 py-2 border rounded-md"
          placeholder="e.g. Outdoor"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mt-3">Associated Event Type</label>
        <input
          type="text"
          value={categoryEventType}
          onChange={(e) => setCategoryEventType(e.target.value)}
          className="w-full mt-2 px-3 py-2 border rounded-md"
          placeholder="Enter event type name (e.g. Wedding)"
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
