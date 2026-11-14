import { useState } from "react";
import SearchBar from "./components/SearchBar";
import EmployeeList from "./components/EmployeeList";
import { useDebounce } from "./hooks/useDebounce";
import { useEmployees } from "./hooks/useEmployees";

function App() {
  const [search, setSearch] = useState("");

  // The API only sees the value 500ms after the user stops typing
  const debouncedSearch = useDebounce(search.trim(), 500);
  const { employees, loading, error } = useEmployees(debouncedSearch);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Employee Directory</h1>

        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <EmployeeList employees={employees} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;