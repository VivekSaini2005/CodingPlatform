import axiosInstance from "./axiosInstance";

export const getAllProblems = async () => {
    try {
        const response = await axiosInstance.get("/problem/getAllProblem");
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch problems";
    }
};

// export const getProblemById = async (id) => {
//     try {
//         console.log("response is computed")
//         const response = await axiosInstance.get(`/problem/problemById/${id}`);

//         return response.data;
//     } catch (error) {
//         throw error.response?.data || "Failed to fetch problem details";
//     }
// };

export const getProblemById = async (id) => {
    try {
        // console.log("response is computed");

        const token = localStorage.getItem("token");

        const response = await fetch(
            `https://localhost:4000/problem/problemById/${id}`,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData || "Failed to fetch problem details";
        }
        console.log("response is computed")
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("FETCH ERROR:", error);
        throw error;
    }
};

