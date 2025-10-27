import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Notes } from '../context/notesContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface NoteEditorModalProps {
  note: Notes | null;
  onSave: (noteData: {
    title: string;
    content: string;
    tags: string[];
  }) => void;
  onClose: () => void;
}

const EditNote: React.FC<NoteEditorModalProps> = ({
  note,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(note?.tags ?? []);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    onSave({ title: title.trim(), content: content.trim(), tags });
    onClose();
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prev) => [...prev, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm dark:text-white flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-card rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">
              {note ? 'Edit Note' : 'New Note'}
            </h2>
            <Button onClick={onClose} variant="ghost" size="icon">
              <X size={20} />
            </Button>
          </header>

          <main className="flex-1 overflow-y-auto p-4 space-y-4">
            <Input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
              autoFocus
            />

            <Textarea
              placeholder="Start writing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none"
              rows={10}
            />

            <section>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-sm"
                />
                <Button onClick={addTag} variant="secondary">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {tags.map((tag) => (
                    <motion.div
                      key={tag}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Badge
                        variant="secondary"
                        className="cursor-pointer flex items-center gap-1.5"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-destructive"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </main>

          <footer className="flex items-center justify-end gap-3 p-4 border-t">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!title.trim() && !content.trim()}
            >
              Save Note
            </Button>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditNote;
