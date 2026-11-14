import { useState, useEffect } from "react";
import { fetchEmployees } from "../services/employeeApi";

export function useEmployees(search) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController cancels the old request if the search changes
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetchEmployees(search, controller.signal)
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // ignore cancelled requests
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [search]);

  return { employees, loading, error };
}