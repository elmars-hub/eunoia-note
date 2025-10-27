import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNotes, type Notes } from './context/notesContext';
import Header from './components/Header';
import SearchBar from './components/Searchbar';
import NoNotes from './components/noNotes';
import EditNote from './components/editNote';
import { useTheme } from './context/themeContext';
import NotePad from './components/notePad';

const App: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTag, setSelectedTag] = useState('');
  const [editingNote, setEditingNote] = useState<Notes | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const allTags = [...new Set(notes.flatMap((note) => note.tags || []))];

  const filteredAndSortedNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || note.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'newest')
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === 'oldest')
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      if (sortBy === 'updated')
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      return 0;
    });

  const handleNewNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note: Notes) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = (noteData: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
    } else {
      addNote(noteData);
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background transition-colors">
        <Header onNewNote={handleNewNote} />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          allTags={allTags}
        />

        <main className="max-w-6xl mx-auto px-4 pb-8">
          {filteredAndSortedNotes.length === 0 ? (
            notes.length === 0 ? (
              <NoNotes onNewNote={handleNewNote} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No notes match your search
                </p>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredAndSortedNotes.map((note) => (
                  <NotePad
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={deleteNote}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>

        {showEditor && (
          <EditNote
            note={editingNote}
            onSave={handleSaveNote}
            onClose={() => setShowEditor(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
