"use client"

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { problemsApi, Problem } from '@/api/problems';
import { ProblemCard } from "@/components/ProblemCard";
import AddNewProblemModal from "@/components/modals/AddNewProblemModal";
import DeleteProblemModal from "@/components/modals/DeleteProblemModal";
import EditProblemModal from "@/components/modals/EditProblemModal";

export default function Home() {
  const [isAddNewProblemModalOpen, setIsAddNewProblemModalOpen] = useState(false);
  const [sortMethod, setSortMethod] = useState<string>('order');
  const [problemToDelete, setProblemToDelete] = useState<string | null>(null);
  const [problemToEdit, setProblemToEdit] = useState<Problem | undefined>(undefined);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => problemsApi.delete(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
    },
  });

  // Updated query with dynamic sort method
  const { data: problems, isLoading, isError, error } = useQuery<Problem[]>({
    queryKey: ['problems', sortMethod],
    queryFn: () => {
      switch (sortMethod) {
        case 'lastEdited':
          return problemsApi.getAllByLastEdited();
        case 'difficulty':
          return problemsApi.getAllByDifficultyAsc();
        case 'confidence':
          return problemsApi.getAllByConfidence();
        default:
          return problemsApi.getAll();
      }
    },
  });

  const handleEdit = (id: number) => {
    const problemToEdit = problems?.find(p => p.id === id);
    setProblemToEdit(problemToEdit);
  };

  const handleDelete = (id: number) => {
    setProblemToDelete(id.toString());
  };

  const confirmDelete = () => {
    if (problemToDelete) {
      deleteMutation.mutate(problemToDelete);
      setProblemToDelete(null);
    }
  };

  const handleCardClick = (id: number) => {
    setSelectedProblemId(id === selectedProblemId ? null : id);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-black text-white p-8">Error: {error.message}</div>;
  }

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

        <div className="flex gap-4 mb-6">
          <select
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="order">Grind 169 Order</option>
            <option value="lastEdited">Least Recently Edited</option>
            <option value="difficulty">Easiest First</option>
            <option value="confidence">Lowest Confidence First</option>
          </select>

          <button 
            onClick={() => setIsAddNewProblemModalOpen(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Add New Problem
          </button>
        </div>

        <div className="space-y-2">
          {problems?.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isSelected={problem.id === selectedProblemId}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        <AddNewProblemModal 
          isOpen={isAddNewProblemModalOpen}
          onClose={() => setIsAddNewProblemModalOpen(false)}
        />

        <DeleteProblemModal 
          isOpen={problemToDelete !== null}
          onClose={() => setProblemToDelete(null)}
          onConfirm={confirmDelete}
        />

        <EditProblemModal 
          isOpen={problemToEdit !== undefined}
          onClose={() => setProblemToEdit(undefined)}
          problem={problemToEdit}
        />
      </main>
    </div>
  );
}
