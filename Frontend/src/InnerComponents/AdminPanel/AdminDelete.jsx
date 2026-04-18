import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext"

const AdminDelete = () => {

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loadUser } = useAuth();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/problem/getAllProblem");
      setProblems(data);
    } catch (err) {
      setError("Failed to fetch problems");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this problem?")) return;

    try {

      await axiosInstance.delete(`/problem/delete/${id}`);
      await loadUser();

      setProblems(problems.filter((problem) => problem._id !== id));

    } catch (err) {

      setError("Failed to delete problem");
      console.error(err);

    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#1a1a1a]">
        <span className="loading loading-spinner loading-lg text-gray-900 dark:text-white"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a] text-red-600 dark:text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Delete Problems
        </h1>

        <div className="bg-white dark:bg-[#262626] rounded-xl border border-gray-200 dark:border-[#2f2f2f] overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-4 text-left w-1/12">#</th>
                <th className="p-4 text-left w-4/12">Title</th>
                <th className="p-4 text-left w-2/12">Difficulty</th>
                <th className="p-4 text-left w-3/12">Tags</th>
                <th className="p-4 text-left w-2/12">Action</th>
              </tr>
            </thead>

            <tbody>

              {problems.map((problem, index) => (

                <tr
                  key={problem._id}
                  className="border-b border-gray-200 dark:border-[#2f2f2f] hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 text-gray-800 dark:text-gray-200"
                >

                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4 font-semibold">
                    {problem.title}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-md text-sm font-medium ${problem.difficulty === "easy"
                        ? "bg-green-600"
                        : problem.difficulty === "medium"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                        }`}
                    >
                      {problem.difficulty}
                    </span>

                  </td>

                  <td className="p-4 text-gray-600 dark:text-gray-300">
                    {Array.isArray(problem.tags)
                      ? problem.tags.join(", ")
                      : problem.tags}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => handleDelete(problem._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};

export default AdminDelete;