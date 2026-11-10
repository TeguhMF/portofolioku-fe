import React from 'react';

const LoadingModal = ({ isOpen, progress = 0 }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl p-8 max-w-xs w-full mx-4 shadow-2xl flex flex-col items-center text-center">
        
        {/* Animated Circular Spinner */}
        <div className="relative w-16 h-16 mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-blue-600 animate-spin"></div>
        </div>

        {/* Loading Text */}
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Loading...</h3>
        <p className="text-xs text-gray-400 mb-6">Please wait a moment</p>

        {/* Progress Bar Container */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Percentage Label */}
        <span className="text-xs font-medium text-gray-500">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default LoadingModal;