import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Problem } from '@/api/problems';
import { getConfidenceColor, getDifficultyColor } from '@/utils/colors';

interface ProblemCardProps {
  problem: Problem;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProblemCard = ({ problem, onEdit, onDelete }: ProblemCardProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center">
      <div className="text-3xl font-bold text-gray-500 mr-6 w-12">
        {problem.orderNumber}
      </div>
      
      <div className="flex-grow">
        <Link 
          href={problem.linkToProblem || '#'}
          className="text-blue-500 hover:text-blue-400 text-lg font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {problem.problemName}
        </Link>
        
        <div className="flex items-center mt-1 space-x-4">
          <span className={`${getDifficultyColor(problem.difficulty)} text-sm`}>{problem.difficulty}</span>
          <span className="text-gray-400 text-sm">{problem.topic || 'N/A'}</span>
        </div>
      </div>

      <div className={`text-2xl font-bold ${getConfidenceColor(Number(problem.confidenceRating))} w-20 text-center`}>
        {problem.confidenceRating.toFixed(1)}
      </div>

      <div className="w-32 text-right mr-6">
        <div className="text-sm text-gray-400">
          {new Date(problem.lastEdited).toLocaleDateString()}
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          className="p-2 hover:bg-gray-700 rounded-full"
          onClick={() => onEdit(problem.id)}
        >
          <PencilSquareIcon className="w-6 h-6 text-blue-500" />
        </button>
        <button 
          className="p-2 hover:bg-gray-700 rounded-full"
          onClick={() => onDelete(problem.id)}
        >
          <TrashIcon className="w-6 h-6 text-red-500" />
        </button>
      </div>
    </div>
  );
};
