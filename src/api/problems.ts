export interface Problem {
  id: number;
  orderNumber: number;
  problemName: string;
  linkToProblem: string | null;
  solution: string | null;
  difficulty: string;
  topic: string | null;
  confidenceRating: number;
  lastEdited: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

export const problemsApi = {
  // Default GET endpoint - Retrieves all problems sorted by orderNumber
  // Returns: Array of Problem objects sorted in ascending order by orderNumber
  getAll: async (): Promise<Problem[]> => {
    const response = await fetch(`${API_BASE_URL}/problems/sort/order`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  // GET endpoint - Retrieves all problems sorted by lastEdited date
  // Returns: Array of Problem objects sorted in ascending order (oldest first)
  getAllByLastEdited: async (): Promise<Problem[]> => {
    const response = await fetch(`${API_BASE_URL}/problems/sort/last-edited`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  // GET endpoint - Retrieves all problems sorted by difficulty
  // Returns: Array of Problem objects sorted by difficulty (easiest first)
  getAllByDifficultyAsc: async (): Promise<Problem[]> => {
    const response = await fetch(`${API_BASE_URL}/problems/sort/difficulty/asc`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  // GET endpoint - Retrieves all problems sorted by confidence rating
  // Returns: Array of Problem objects sorted by confidence (lowest first)
  getAllByConfidence: async (): Promise<Problem[]> => {
    const response = await fetch(`${API_BASE_URL}/problems/sort/confidence`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  // Add other API methods here
  create: async (problem: Omit<Problem, 'id'>): Promise<Problem> => {
    const response = await fetch(`${API_BASE_URL}/problems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problem),
    });
    if (!response.ok) {
      throw new Error('Failed to create problem');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/problems/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete problem');
    }
  },

  update: async (id: number, problem: Partial<Problem>): Promise<Problem> => {
    const response = await fetch(`${API_BASE_URL}/problems/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problem),
    });
    if (!response.ok) {
      throw new Error('Failed to update problem');
    }
    return response.json();
  },

  updateTimestamp: async (id: number): Promise<Problem> => {
    const response = await fetch(`${API_BASE_URL}/problems/${id}/timestamp`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to update timestamp');
    }
    return response.json();
  },
};
