import { useState, useEffect } from "react";

const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const newData = { ...prev };
      const keys = name.split(".").reduce((acc, key) => {
        if (key.endsWith("]")) {
          const [arrKey, arrIndex] = key.slice(0, -1).split("[");
          acc.push(arrKey, +arrIndex);
        } else {
          acc.push(key);
        }
        return acc;
      }, []);

      let ref = newData;
      keys.forEach((key, idx) => {
        if (idx === keys.length - 1) {
          if (type === "checkbox") {
            ref[key] = checked;
          } else if (type === "number") {
            ref[key] = value ? Number(value) : 0;
          } else {
            ref[key] = value;
          }
        } else {
          if (!ref[key]) {
            ref[key] = typeof keys[idx + 1] === "number" ? [] : {};
          }
          ref = ref[key];
        }
      });
      return newData;
    });
  };

  return [formData, handleChange];
};

export default useForm;
