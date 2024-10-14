import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MilkGlassProps {
  onSave: () => void;
  isSaving: boolean;
  candyImage: string;
}

const MilkGlass: React.FC<MilkGlassProps> = ({ onSave, isSaving, candyImage }) => {
  return (
    <div className="relative w-24 h-32 mx-auto cursor-pointer" onClick={onSave}>
      <svg viewBox="0 0 100 120" className="w-full h-full">
        <path
          d="M10,30 L20,120 L80,120 L90,30 Z"
          fill="#fff"
          stroke="#000"
          strokeWidth="2"
        />
        <path
          d="M0,25 C0,15 100,15 100,25"
          fill="#fff"
          stroke="#000"
          strokeWidth="2"
        />
      </svg>
      <AnimatePresence>
        {isSaving && (
          <motion.img
            src={candyImage}
            alt="Falling candy"
            className="absolute w-12 h-12 left-1/2 transform -translate-x-1/2"
            initial={{ top: -50, rotate: 0 }}
            animate={{ top: 80, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
      {!isSaving && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-pink-500 font-bold">Save</span>
        </div>
      )}
    </div>
  );
};

export default MilkGlass;