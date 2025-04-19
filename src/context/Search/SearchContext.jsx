import { useState } from 'react';

import {SearchContext} from './SearchContextData';

export function SearchProvider({children}) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
      {children}
    </SearchContext.Provider>
  )
}