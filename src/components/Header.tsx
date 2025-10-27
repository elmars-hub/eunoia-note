import React from "react";
import { Plus, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/themeContext";
import { Button } from "./ui/button";

interface HeaderProps {
  onNewNote: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewNote }) => {
  // i imported the context for theme on the header because the controller is there
  const { isDark, setIsDark } = useTheme();

  return (
    // framer motion for light animations
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-10 bg-background border-b"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.h1
          className="text-2xl font-bold dark:text-white"
          whileHover={{ scale: 1.05 }}
        >
          Eunoia
        </motion.h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsDark(!isDark)}
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <Sun className="dark:text-white" size={20} />
              ) : (
                <Moon className="dark:text-white" size={20} />
              )}
            </motion.div>
          </Button>
          <Button onClick={onNewNote}>
            <Plus size={18} className="mr-2" />
            <span className="hidden sm:inline">New Note</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
