import React from 'react';
import { Search, Tag, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedTag: string;
  onTagChange: (value: string) => void;
  allTags: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedTag,
  onTagChange,
  allTags,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 py-4 space-y-3"
    >
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search notes by title or content..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none h-10 pl-3 pr-8 bg-background dark:text-white border border-input rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="updated">Recently Updated</option>
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={16}
          />
        </div>

        <div className="flex flex-wrap gap-2 dark:text-white">
          <Button
            onClick={() => onTagChange('')}
            variant={selectedTag === '' ? 'default' : 'outline'}
            size="sm"
          >
            All
          </Button>
          {allTags.map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onTagChange(tag)}
                variant={selectedTag === tag ? 'default' : 'outline'}
                size="sm"
              >
                <Tag size={14} className="mr-1" />
                {tag}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
