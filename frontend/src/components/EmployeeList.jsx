import EmployeeCard from "./EmployeeCard";

function EmployeeList({ employees, loading, error }) {
  // 1. Loading
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  // 2. Error
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
        ⚠️ {error}
      </div>
    );
  }

  // 3. No results
  if (employees.length === 0) {
    return (
      <p className="py-16 text-center text-gray-500">
        No employees found. Try a different search.
      </p>
    );
  }

  // 4. Results
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map((emp) => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </div>
  );
}

export default EmployeeList;