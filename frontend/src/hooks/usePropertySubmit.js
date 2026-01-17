import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const usePropertySubmit = ({ url, method }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();
      navigate("/dashboard/my-properties");
    } catch {
      setError("Error saving property");
    }
  };

  return { submit, error };
};