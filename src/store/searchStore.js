import create from 'zustand';

// Define your Zustand store
const useSearchStore = create((set) => ({
  searchTerm: '', // Initial search term
  setSearchTerm: (term) => set({ searchTerm: term }), // Method to set search term
}));

export default useSearchStore;