import React, { createContext, useContext, useState } from 'react'

const FormContext = createContext();

export default function FormContextProvider({ children }) {
    const [formData,setFormData] = useState({});

    const updateFormData = (jsonKey, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [jsonKey]: value,
          }));
    }
    const resetFormData = () => {
        setFormData({});
    }

    const context = {
        formData,
        setFormData,
        updateFormData,
        resetFormData,
    };

  return (
    <FormContext.Provider value={context}>
        {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => useContext(FormContext);