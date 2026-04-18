import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const AdminUpdate = () => {

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
        hiddenTestCases: data.hiddenTestCases
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

  // Update nested array fields
  const handleArrayChange = (field, index, key, value) => {

    setSelectedProblem((prev) => {

      const updatedArray = [...(prev[field] || [])];

      updatedArray[index] = {
        ...updatedArray[index],
        [key]: value
      };

      return {
        ...prev,
        [field]: updatedArray
      };

    });
  };

  // Add new item
  const handleAddArrayItem = (field, defaultValue) => {

    setSelectedProblem((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue]
    }));

  };

  // Remove item
  const handleRemoveArrayItem = (field, index) => {

    setSelectedProblem((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));

  };

  // Update problem
  const handleUpdate = async () => {

    try {

      const updatedProblem = {
        ...selectedProblem,
        tags:
          typeof selectedProblem.tags === "string"
            ? selectedProblem.tags.split(",").map((t) => t.trim())
            : selectedProblem.tags
      };
      // console.log("call to backend");
      await axiosInstance.put(
        `/problem/update/${selectedProblem._id}`,
        updatedProblem
      );
      // console.log("back from backend");
      alert("Problem updated successfully!");

      setSelectedProblem(null);
      fetchProblems();

    } catch (err) {

      console.error(err.message);
      setError("Failed to update problem");

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
    return <div className="text-red-400 p-6">{error}</div>;
  }

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {!selectedProblem ? (

          <>
            <h1 className="text-3xl font-bold mb-8">
              Admin Problem Manager
            </h1>

            <div className="bg-white dark:bg-[#262626] rounded-xl border border-gray-200 dark:border-[#2f2f2f] overflow-hidden">

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
                      className="border-b border-gray-200 dark:border-[#2f2f2f] hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
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

          <div className="bg-white dark:bg-[#262626] rounded-xl p-8 space-y-6 border border-gray-200 dark:border-[#2f2f2f]">

            <h2 className="text-2xl font-bold">
              Update Problem
            </h2>

            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold">
                Title
              </label>

              <input
                name="title"
                value={selectedProblem.title || ""}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] rounded-md p-3 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={selectedProblem.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] rounded-md p-3 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block mb-2 font-semibold">
                Difficulty
              </label>

              <select
                name="difficulty"
                value={selectedProblem.difficulty || "easy"}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] rounded-md p-3 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              >

                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>

              </select>
            </div>

            {/*Example Test Cases*/}
            <div>

              <h3 className="text-lg font-semibold mb-3">
                Example Test Cases
              </h3>

              {selectedProblem.explainTestCase.map((test, i) => (

                <div key={i} className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded mb-4 space-y-2 border border-gray-200 dark:border-[#2f2f2f]">

                  <div className="flex gap-3">

                    <input
                      value={test.input || ""}
                      placeholder="Input"
                      onChange={(e) =>
                        handleArrayChange("explainTestCase", i, "input", e.target.value)
                      }
                      className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] p-2 rounded text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    />

                    <input
                      value={test.output || ""}
                      placeholder="Output"
                      onChange={(e) =>
                        handleArrayChange("explainTestCase", i, "output", e.target.value)
                      }
                      className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] p-2 rounded text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    />

                    <button
                      onClick={() => handleRemoveArrayItem("explainTestCase", i)}
                      className="bg-red-600 px-3 rounded"
                    >
                      ✕
                    </button>

                  </div>

                  <textarea
                    value={test.explanation || ""}
                    placeholder="Explanation"
                    onChange={(e) =>
                      handleArrayChange("explainTestCase", i, "explanation", e.target.value)
                    }
                    rows={2}
                    className="w-full bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] p-2 rounded text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                  />

                </div>

              ))}

              <button
                onClick={() =>
                  handleAddArrayItem("explainTestCase", {
                    input: "",
                    output: "",
                    explanation: ""
                  })
                }
                className="bg-blue-600 px-4 py-1 rounded"
              >
                + Add Test Case
              </button>

            </div>
            {/* Visible Test Cases */}
            <div>

              <h3 className="text-lg font-semibold mb-3">
                Visible Test Cases
              </h3>

              {selectedProblem.visibleTestCases.map((test, i) => (

                <div key={i} className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded mb-4 space-y-2 border border-gray-200 dark:border-[#2f2f2f]">

                  <div className="flex gap-3">

                    <input
                      value={test.input || ""}
                      placeholder="Input"
                      onChange={(e) =>
                        handleArrayChange("visibleTestCases", i, "input", e.target.value)
                      }
                      className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] p-2 rounded text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    />

                    <input
                      value={test.output || ""}
                      placeholder="Output"
                      onChange={(e) =>
                        handleArrayChange("visibleTestCases", i, "output", e.target.value)
                      }
                      className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] p-2 rounded text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    />

                    <button
                      onClick={() => handleRemoveArrayItem("visibleTestCases", i)}
                      className="bg-red-600 px-3 rounded"
                    >
                      ✕
                    </button>

                  </div>

                  <textarea
                    value={test.explanation || ""}
                    placeholder="Explanation"
                    onChange={(e) =>
                      handleArrayChange("visibleTestCases", i, "explanation", e.target.value)
                    }
                    rows={2}
                    className="w-full bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] p-2 rounded text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                  />

                </div>

              ))}

              <button
                onClick={() =>
                  handleAddArrayItem("visibleTestCases", {
                    input: "",
                    output: "",
                    explanation: ""
                  })
                }
                className="bg-blue-600 px-4 py-1 rounded"
              >
                + Add Test Case
              </button>

            </div>

            {/* Hidden Test Cases */}
            <div>

              <h3 className="text-lg font-semibold mb-2">
                Hidden Test Cases
              </h3>

              {selectedProblem.hiddenTestCases?.map((test, i) => (

                <div key={i} className="flex gap-3 mb-2">

                  <input
                    value={test.input || ""}
                    placeholder="Input"
                    onChange={(e) =>
                      handleArrayChange("hiddenTestCases", i, "input", e.target.value)
                    }
                    className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] p-2 rounded text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                  />

                  <input
                    value={test.output || ""}
                    placeholder="Output"
                    onChange={(e) =>
                      handleArrayChange("hiddenTestCases", i, "output", e.target.value)
                    }
                    className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#2f2f2f] p-2 rounded text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                  />

                  <button
                    onClick={() => handleRemoveArrayItem("hiddenTestCases", i)}
                    className="bg-red-600 px-3 rounded"
                  >
                    ✕
                  </button>

                </div>

              ))}

              <button
                onClick={() =>
                  handleAddArrayItem("hiddenTestCases", {
                    input: "",
                    output: ""
                  })
                }
                className="bg-blue-600 px-4 py-1 rounded"
              >
                + Add Hidden Case
              </button>

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

export default AdminUpdate;
