import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Candy } from '../types';
import MilkGlass from './MilkGlass';
import { ImageOff } from 'lucide-react';

interface CandyCardProps {
  candy: Candy;
  onSave: (candy: Candy) => void;
}

const CandyCard: React.FC<CandyCardProps> = ({ candy, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(candy);
    setIsSaving(false);
  };

  const handleImageError = () => {
    console.error(`Failed to load image for ${candy.name}: ${candy.image}`);
    setImageError(true);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative w-full h-48 mb-4">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <ImageOff className="text-gray-400" size={48} />
          </div>
        ) : (
          <img
            src={candy.image}
            alt={candy.name}
            className="w-full h-full object-cover rounded-t-lg"
            onError={handleImageError}
          />
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2">{candy.name}</h2>
      <p className="text-gray-600 mb-2">Sugar: {candy.sugarContent}g</p>
      <p className="text-gray-700 mb-4">{candy.description}</p>
      <div className="mt-auto">
        <MilkGlass onSave={handleSave} isSaving={isSaving} candyImage={candy.image} />
      </div>
    </motion.div>
  );
};

export default CandyCard;
