import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchModalContextType {
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (isOpen: boolean) => void;
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(
  undefined,
);

export const SearchModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <SearchModalContext.Provider
      value={{ isSearchModalOpen, setIsSearchModalOpen }}
    >
      {children}
    </SearchModalContext.Provider>
  );
};

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error('useSearchModal must be used within a SearchModalProvider');
  }
  return context;
};
