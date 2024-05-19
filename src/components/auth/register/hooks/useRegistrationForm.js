import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../../api/auth";

const useRegistrationForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await registerUser(formData);
      if (response) {
        navigate("/login");
      }
    } catch (err) {
      setError("Failed to register. Please check your details.");
    }
  };

  return {
    formData,
    error,
    handleChange,
    handleSubmit
  };
};

export default useRegistrationForm;
