import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface EmptyNoteProps {
  onNewNote: () => void;
}

const NoNotes: React.FC<EmptyNoteProps> = ({ onNewNote }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4"
      >
        <Plus size={32} className="text-muted-foreground" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">No Eunoia yet</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">
        Use Eunoia to organize your thoughts by creating them
      </p>
      <Button onClick={onNewNote} size="lg">
        Create Your First Eunoia
      </Button>
    </motion.div>
  );
};

export default NoNotes;
