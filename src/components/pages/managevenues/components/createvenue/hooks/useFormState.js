import { useState } from "react";

const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

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
