import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Candy, SortOption } from '../types';
import { SortAsc, SortDesc } from 'lucide-react';
import Confetti from 'react-confetti';

interface SavedCandiesProps {
  savedCandies: Candy[];
  onRemove: (id: number) => void;
}

const SavedCandies: React.FC<SavedCandiesProps> = ({ savedCandies, onRemove }) => {
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showConfetti, setShowConfetti] = useState(true);

  const sortedCandies = [...savedCandies].sort((a, b) => {
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

  const toggleSort = (option: SortOption) => {
    if (sortOption === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(option);
      setSortDirection('asc');
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showConfetti && <Confetti recycle={false} onConfettiComplete={() => setShowConfetti(false)} />}
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Your Candy Collection</h2>
      {savedCandies.length === 0 ? (
        <p className="text-xl text-gray-600">No candies saved yet. Start collecting your favorites!</p>
      ) : (
        <>
          <div className="mb-4 flex space-x-4">
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {sortedCandies.map((candy) => (
                <motion.li
                  key={candy.id}
                  className="bg-pink-100 rounded-lg p-4 shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={candy.image} alt={candy.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-pink-600">{candy.name}</h3>
                  <p className="text-gray-600 mb-2">Sugar: {candy.sugarContent}g</p>
                  <p className="text-gray-700 mb-4">{candy.description}</p>
                  <button
                    onClick={() => onRemove(candy.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </>
      )}
    </motion.div>
  );
};

export default SavedCandies;