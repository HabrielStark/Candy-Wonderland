import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Candy, SortOption } from './types';
import { candies as initialCandies } from './data/candies';
import CandyList from './components/CandyList';
import SavedCandies from './components/SavedCandies';
import { Candy as CandyIcon, SortAsc, SortDesc, ImageOff } from 'lucide-react';

const App: React.FC = () => {
  const [candies, setCandies] = useState<Candy[]>(initialCandies);
  const [savedCandies, setSavedCandies] = useState<Candy[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const sorted = [...candies].sort((a, b) => {
      if (sortOption === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === 'asc'
          ? a.sugarContent - b.sugarContent
          : b.sugarContent - a.sugarContent;
      }
    });
    setCandies(sorted);
  }, [sortOption, sortDirection]);

  const handleSave = (candy: Candy) => {
    if (!savedCandies.some((c) => c.id === candy.id)) {
      setSavedCandies([...savedCandies, candy]);
    }
  };

  const handleRemove = (id: number) => {
    setSavedCandies(savedCandies.filter((c) => c.id !== id));
  };

  const toggleSort = (option: SortOption) => {
    if (sortOption === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(option);
      setSortDirection('asc');
    }
  };

  const toggleSavedCandies = () => {
    setShowSaved(!showSaved);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2 flex items-center justify-center">
            <CandyIcon className="mr-2" />
            Candy Wonderland
          </h1>
          <p className="text-xl text-purple-700">Discover and save your favorite sweets!</p>
        </header>

        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Sort Candies</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => toggleSort('name')}
                className={`flex items-center px-4 py-2 rounded ${
                  sortOption === 'name' ? 'bg-pink-500 text-white' : 'bg-white text-pink-500'
                }`}
              >
                Sort by Name
                {sortOption === 'name' && (sortDirection === 'asc' ? <SortAsc className="ml-2" /> : <SortDesc className="ml-2" />)}
              </button>
              <button
                onClick={() => toggleSort('sugarContent')}
                className={`flex items-center px-4 py-2 rounded ${
                  sortOption === 'sugarContent' ? 'bg-pink-500 text-white' : 'bg-white text-pink-500'
                }`}
              >
                Sort by Sugar Content
                {sortOption === 'sugarContent' && (sortDirection === 'asc' ? <SortAsc className="ml-2" /> : <SortDesc className="ml-2" />)}
              </button>
            </div>
          </div>
          <button
            onClick={toggleSavedCandies}
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors"
          >
            {showSaved ? 'Back to Candies' : 'View Saved Candies'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {showSaved ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <SavedCandies savedCandies={savedCandies} onRemove={handleRemove} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <CandyList candies={candies} onSave={handleSave} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;