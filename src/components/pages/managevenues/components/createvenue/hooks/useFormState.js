import { useState } from "react";

/**
 * Custom hook for managing form state.
 *
 * @param {Object} initialState - The initial state of the form.
 * @returns {Array} An array containing the form data and a function to handle input changes.
 */
const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  /**
   * Handles input changes and updates the form state.
   *
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const path = name.split(/[.[\]]/).filter(Boolean);

    setFormData((prev) => {
      const newData = { ...prev };

      let lastRef = newData;
      path.forEach((key, index) => {
        if (index === path.length - 1) {
          lastRef[key] = type === "checkbox" ? checked : value;
        } else {
          if (!isNaN(parseInt(key))) {
            lastRef = lastRef[parseInt(key)];
          } else {
            if (!lastRef[key]) {
              lastRef[key] = isNaN(parseInt(path[index + 1])) ? {} : [];
            }
            lastRef = lastRef[key];
          }
        }
      });
      return newData;
    });
  };

  return [formData, handleChange];
};

export default useFormState;
