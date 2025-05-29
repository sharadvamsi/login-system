import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "Moderator" },
];

const Dashboard = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setLocalUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (setUser) setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome{user ? `, ${user.name || user.username || "User"}` : ""}!
      </h1>

      <div className="overflow-x-auto w-full max-w-4xl mb-8 shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-6 border-b border-gray-200">ID</th>
              <th className="py-3 px-6 border-b border-gray-200">Name</th>
              <th className="py-3 px-6 border-b border-gray-200">Email</th>
              <th className="py-3 px-6 border-b border-gray-200">Role</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(({ id, name, email, role }) => (
              <tr key={id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b border-gray-200">{id}</td>
                <td className="py-3 px-6 border-b border-gray-200">{name}</td>
                <td className="py-3 px-6 border-b border-gray-200">{email}</td>
                <td className="py-3 px-6 border-b border-gray-200">{role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
