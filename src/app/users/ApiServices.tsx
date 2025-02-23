import axios from "axios";
import { ControlData } from "../users/DataTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://web-production-af645.up.railway.app/";

export const sendControlData = async (data: {
  controls: ControlData[];
  num_simulations: number;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Server Response:", response.data); // ✅ Log the response data
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
