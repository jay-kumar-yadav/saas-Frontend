import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { notesAPI } from '../services/notes';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import UpgradeBanner from '../components/UpgradeBanner';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await notesAPI.getAll();
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await notesAPI.create(noteData);
      setNotes([newNote, ...notes]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      const updatedNote = await notesAPI.update(editingNote._id, noteData);
      setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
      setEditingNote(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await notesAPI.delete(noteId);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  const handleUpgrade = () => {
    // Refresh the page to reflect the new subscription status
    window.location.reload();
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <UpgradeBanner noteCount={notes.length} onUpgrade={handleUpgrade} />
      
      <NoteForm
        onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
        initialData={editingNote || {}}
        buttonText={editingNote ? 'Update Note' : 'Create Note'}
      />
      
      {editingNote && (
        <button
          onClick={() => setEditingNote(null)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mb-6"
        >
          Cancel Edit
        </button>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Notes</h3>
        <NoteList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={handleDeleteNote}
        />
      </div>
    </div>
  );
};

export default Dashboard;