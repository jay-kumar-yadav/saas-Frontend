import React from 'react';

const NoteList = ({ notes, onEdit, onDelete, canEdit = true }) => {
  if (notes.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div key={note._id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap">{note.content}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Created by: {note.createdBy?.email}
            </span>
            {canEdit && (
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(note)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(note._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;