"use client"

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddNewProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export default function AddNewProblemModal({ isOpen, onClose }: AddNewProblemModalProps) {
  const [formData, setFormData] = useState({
    orderNumber: '',
    problemName: '',
    linkToProblem: '',
    difficulty: 'EASY' as Difficulty,
    topic: '',
    confidenceRating: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-lg p-8 w-[500px] shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold mb-6">Add New Problem</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Order Number (1-169)
            </label>
            <input
              type="number"
              min="1"
              max="169"
              value={formData.orderNumber}
              onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Problem Name
            </label>
            <input
              type="text"
              value={formData.problemName}
              onChange={(e) => setFormData({...formData, problemName: e.target.value})}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Link to Problem
            </label>
            <input
              type="url"
              value={formData.linkToProblem}
              onChange={(e) => setFormData({...formData, linkToProblem: e.target.value})}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Difficulty
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value as Difficulty})}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              required
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Topic
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confidence Rating (0-10)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.confidenceRating}
              onChange={(e) => setFormData({...formData, confidenceRating: parseFloat(e.target.value)})}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-6"
          >
            Add Problem
          </button>
        </form>
      </div>
    </>
  );
}
