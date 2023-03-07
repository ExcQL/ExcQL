import React, { createContext, useCallback, useState } from 'react';

const store = createContext();

export const Provider = ({ children }) => {
  const [uploadedData, setUploadedData] = useState(null);

  const updateData = useCallback((data) => {
    setUploadedData(data);
  }, []);

  return (
    <store.Provider
      value={{
        uploadedData,
        updateData,
      }}
    >
      {children}
    </store.Provider>
  );
};

export default store;
