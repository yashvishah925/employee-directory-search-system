function EmployeeCard({ employee }) {
  const joined = new Date(employee.date_of_joining).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
          {employee.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-lg font-bold">{employee.name}</h2>
          <p className="text-sm text-gray-500">{employee.designation}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p>Email: {employee.email}</p>
        <p>Department: {employee.department}</p>
        <p>Employee ID: {employee.id}</p>
        <p>Joined: {joined}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;