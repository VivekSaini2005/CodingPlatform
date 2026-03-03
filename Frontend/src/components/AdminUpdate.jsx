import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AdminUpdate = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/problem/allProblem");
      setProblems(data);
    } catch (err) {
      setError("Failed to fetch problems");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/problem/problemById/${id}`);
      setSelectedProblem(data);
    } catch (err) {
      setError("Failed to fetch problem details");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProblem((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setSelectedProblem((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleAddArrayItem = (field, defaultValue) => {
    setSelectedProblem((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setSelectedProblem((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatedProblem = {
        ...selectedProblem,
        tags:
          typeof selectedProblem.tags === "string"
            ? selectedProblem.tags.split(",").map((t) => t.trim())
            : selectedProblem.tags,
      };

      await axiosInstance.put(`/problem/update/${selectedProblem._id}`, updatedProblem);
      alert("Problem updated successfully!");
      setSelectedProblem(null);
      fetchProblems();
    } catch (err) {
      setError("Failed to update problem");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {!selectedProblem ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Update Problems</h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => (
                  <tr key={problem._id}>
                    <th>{index + 1}</th>
                    <td>{problem.title}</td>
                    <td>
                      <span
                        className={`badge ${
                          problem.difficulty === "Easy"
                            ? "badge-success"
                            : problem.difficulty === "Medium"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-outline">
                        {Array.isArray(problem.tags) ? problem.tags.join(", ") : problem.tags}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleSelect(problem._id)}
                        className="btn btn-sm btn-info"
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
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Update Problem</h2>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                name="title"
                value={selectedProblem.title}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label className="label">Description</label>
              <textarea
                name="description"
                value={selectedProblem.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                rows={4}
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="label">Difficulty</label>
              <select
                name="difficulty"
                value={selectedProblem.difficulty}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="label">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={
                  Array.isArray(selectedProblem.tags)
                    ? selectedProblem.tags.join(", ")
                    : selectedProblem.tags || ""
                }
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Visible Test Cases */}
            <div>
              <label className="label">Visible Test Cases</label>
              {selectedProblem.visibleTestCases.map((test, i) => (
                <div key={i} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Input"
                    value={test.input || ""}
                    onChange={(e) =>
                      handleArrayChange("visibleTestCases", i, { ...test, input: e.target.value })
                    }
                    className="input input-bordered w-1/2"
                  />
                  <input
                    type="text"
                    placeholder="Output"
                    value={test.output || ""}
                    onChange={(e) =>
                      handleArrayChange("visibleTestCases", i, { ...test, output: e.target.value })
                    }
                    className="input input-bordered w-1/2"
                  />
                  <button
                    onClick={() => handleRemoveArrayItem("visibleTestCases", i)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddArrayItem("visibleTestCases", { input: "", output: "" })}
                className="btn btn-sm btn-outline"
              >
                Add Test Case
              </button>
            </div>

            {/* Hidden Test Cases */}
            <div>
              <label className="label">Hidden Test Cases</label>
              {selectedProblem.hiddenTestCases.map((test, i) => (
                <div key={i} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Input"
                    value={test.input || ""}
                    onChange={(e) =>
                      handleArrayChange("hiddenTestCases", i, { ...test, input: e.target.value })
                    }
                    className="input input-bordered w-1/2"
                  />
                  <input
                    type="text"
                    placeholder="Output"
                    value={test.output || ""}
                    onChange={(e) =>
                      handleArrayChange("hiddenTestCases", i, { ...test, output: e.target.value })
                    }
                    className="input input-bordered w-1/2"
                  />
                  <button
                    onClick={() => handleRemoveArrayItem("hiddenTestCases", i)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddArrayItem("hiddenTestCases", { input: "", output: "" })}
                className="btn btn-sm btn-outline"
              >
                Add Test Case
              </button>
            </div>

            {/* Start Code */}
            <div>
              <label className="label">Start Code</label>
              {selectedProblem.startCode.map((codeObj, i) => (
                <div key={i} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Language"
                    value={codeObj.language || ""}
                    onChange={(e) =>
                      handleArrayChange("startCode", i, { ...codeObj, language: e.target.value })
                    }
                    className="input input-bordered w-1/4"
                  />
                  <textarea
                    placeholder="Code"
                    value={codeObj.code || ""}
                    onChange={(e) =>
                      handleArrayChange("startCode", i, { ...codeObj, code: e.target.value })
                    }
                    className="textarea textarea-bordered w-3/4"
                    rows={3}
                  />
                  <button
                    onClick={() => handleRemoveArrayItem("startCode", i)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddArrayItem("startCode", { language: "", code: "" })}
                className="btn btn-sm btn-outline"
              >
                Add Code
              </button>
            </div>

            <div className="flex space-x-2">
              <button onClick={handleUpdate} className="btn btn-success">
                Save Update
              </button>
              <button
                onClick={() => setSelectedProblem(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpdate;
