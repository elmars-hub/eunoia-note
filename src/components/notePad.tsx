import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { type Notes } from '../context/notesContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';

interface NoteCardProps {
  note: Notes;
  onEdit: (note: Notes) => void;
  onDelete: (id: string) => void;
}

const NotePad: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(note.id);
    setOpenConfirm(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow dark:text-white"
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold flex-1 break-words">
            {note.title || 'Untitled Note'}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              onClick={() => onEdit(note)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label="Edit note"
            >
              <Edit2 size={16} />
            </Button>
            <Button
              onClick={() => setOpenConfirm(true)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label="Delete note"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-3 whitespace-pre-wrap break-words">
          {note.content || 'No content'}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex flex-wrap gap-1.5">
            {note.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
        </div>
      </motion.div>

      {/* Confirmation if the user wants to delete a particular note */}
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className=" dark:text-white">
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotePad;
