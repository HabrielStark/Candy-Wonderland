import React from 'react';
import { motion } from 'framer-motion';
import CandyCard from './CandyCard';
import { Candy } from '../types';

interface CandyListProps {
  candies: Candy[];
  onSave: (candy: Candy) => void;
}

const CandyList: React.FC<CandyListProps> = ({ candies, onSave }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {candies.map((candy) => (
        <CandyCard key={candy.id} candy={candy} onSave={onSave} />
      ))}
    </motion.div>
  );
};

export default CandyList;