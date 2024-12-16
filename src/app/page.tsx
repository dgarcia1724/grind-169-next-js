"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddNewProblemModal from "@/components/modals/AddNewProblemModal";

const dummyProblems = [
  {
    id: 1,
    orderNumber: 1,
    problemName: "Two Sum",
    linkToProblem: "https://leetcode.com/problems/two-sum",
    solution: "",
    difficulty: "EASY",
    topic: "Array",
    confidenceRating: 8.5,
    lastEdited: "2024-01-15T20:51:21.434Z"
  },
  {
    id: 2,
    orderNumber: 2,
    problemName: "Valid Parentheses",
    linkToProblem: "https://leetcode.com/problems/valid-parentheses",
    solution: "",
    difficulty: "EASY",
    topic: "Stack",
    confidenceRating: 7.2,
    lastEdited: "2024-01-14T15:30:00.000Z"
  },
  // Add more dummy problems as needed
];

const confidenceColors = {
  high: "text-green-500",    // 8.0 - 10.0
  good: "text-yellow-500",   // 6.0 - 8.0
  medium: "text-orange-500", // 4.0 - 6.0
  low: "text-red-500"        // 0.0 - 4.0
};

// Helper function to determine color based on rating
const getConfidenceColor = (rating: number): string => {
  if (rating >= 8.0) return confidenceColors.high;
  if (rating >= 6.0) return confidenceColors.good;
  if (rating >= 4.0) return confidenceColors.medium;
  return confidenceColors.low;
};

export default function Home() {
  const [isAddNewProblemModalOpen, setIsAddNewProblemModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsAddNewProblemModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <main className="max-w-7xl mx-auto">
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-2 text-white">
            Grind 169 questions
          </h1>
          <p className="text-sm text-gray-400">
            Spaced Repetition Study App
          </p>
        </div>

        <button 
          onClick={() => setIsAddNewProblemModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg mb-6"
        >
          Add New Problem
        </button>

        <div className="space-y-2">
          {dummyProblems.map((problem) => (
            <div key={problem.id} className="bg-gray-800 p-4 rounded-lg flex items-center">
              <div className="text-3xl font-bold text-gray-500 mr-6 w-12">
                {problem.orderNumber}
              </div>
              
              <div className="flex-grow">
                <Link 
                  href={problem.linkToProblem}
                  className="text-blue-500 hover:text-blue-400 text-lg font-medium"
                >
                  {problem.problemName}
                </Link>
                
                <div className="flex items-center mt-1 space-x-4">
                  <span className="text-green-500 text-sm">{problem.difficulty}</span>
                  <span className="text-gray-400 text-sm">{problem.topic}</span>
                </div>
              </div>

              <div className={`text-2xl font-bold ${getConfidenceColor(problem.confidenceRating)} w-20 text-center`}>
                {problem.confidenceRating.toFixed(1)}
              </div>

              <div className="w-32 text-right mr-6">
                <div className="text-sm text-gray-400">
                  {new Date(problem.lastEdited).toLocaleDateString()}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-700 rounded-full">
                  <PencilSquareIcon className="w-6 h-6 text-blue-500" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-full">
                  <TrashIcon className="w-6 h-6 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <AddNewProblemModal 
          isOpen={isAddNewProblemModalOpen}
          onClose={() => setIsAddNewProblemModalOpen(false)}
        />
      </main>
    </div>
  );
}
