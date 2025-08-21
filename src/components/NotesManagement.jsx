"use client"

import { useState } from "react"

const NotesManagement = () => {
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState([
    { id: "1", content: "Female only event", createdAt: "2024-01-15 10:30", author: "Admin" },
    { id: "2", content: "Outdoor venue required", createdAt: "2024-01-14 15:45", author: "Admin" },
    { id: "3", content: "Special dietary requirements", createdAt: "2024-01-13 09:20", author: "Admin" },
  ])

  const handleAddNote = (e) => {
    e.preventDefault()
    if (note.trim()) {
      const newNote = {
        id: Date.now().toString(),
        content: note,
        createdAt: new Date().toLocaleString(),
        author: "Admin",
      }
      setNotes((prev) => [newNote, ...prev])
      setNote("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Notes Management</h1>
      </div>

      {/* Add Note Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Note</h2>
        <form onSubmit={handleAddNote} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Note Content</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter note content..."
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Notes ({notes.length})</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {notes.map((noteItem) => (
            <div key={noteItem.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 mb-2">{noteItem.content}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>By {noteItem.author}</span>
                    <span>{noteItem.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotesManagement
