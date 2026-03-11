import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const AdminUpload = () => {

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  // Fetch problems
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

  // Select problem
  const handleSelect = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/problem/problemById/${id}`);

      const fixedVisible = (data.visibleTestCases || []).map((t) => ({
        ...t,
        explanation: t.explanation || t.explationation || ""
      }));

      setSelectedProblem({
        ...data,
        visibleTestCases: fixedVisible,
        hiddenTestCases: data.hiddenTestCases || [],
        startCode: data.startCode || [],
        referenceSolution: data.referenceSolution || []
      });

    } catch (err) {
      setError("Failed to fetch problem details");
      console.error(err);
    }
  };

  // Handle simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedProblem((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleUpdate = async () => {

    try {

      await axiosInstance.put(
        `/problem/upload/${selectedProblem._id}`,
        {
          ytlink: selectedProblem.ytlink
        }
      );

      alert("Ytlink updated successfully!");

      setSelectedProblem(null);
      fetchProblems();

    } catch (err) {
      console.error(err.message);
      setError("Failed to update problem");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <span className="loading loading-spinner loading-lg text-gray-900 dark:text-white"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 p-6">{error}</div>;
  }

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {!selectedProblem ? (

          <>
            <h1 className="text-3xl font-bold mb-8">
              Admin Problem Manager
            </h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">

              <table className="w-full">

                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="p-4 text-left">#</th>
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left">Difficulty</th>
                    <th className="p-4 text-left">Tags</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {problems.map((problem, index) => (

                    <tr
                      key={problem._id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >

                      <td className="p-4">{index + 1}</td>

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
                          onClick={() => handleSelect(problem._id)}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                        >
                          Update
                        </button>

                      </td>

                    </tr>

                  ))}
                </tbody>

              </table>

            </div>
          </>

        ) : (

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">

            <h2 className="text-2xl font-bold">
              Update Problem
            </h2>

            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold">
                Link:
              </label>

              <input
                name="ytlink"
                value={selectedProblem.ytlink}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
              >
                Save Update
              </button>

              <button
                onClick={() => setSelectedProblem(null)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md"
              >
                Cancel
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default AdminUpload;