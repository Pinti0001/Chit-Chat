import dayjs from "dayjs";

export const loadMessages = () => {
  try {
    const data = localStorage.getItem("chatMessages");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveMessages = (messages) => {
  try {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  } catch {
    console.error("Failed to save messages");
  }
};

export const formatTimestamp = (timestamp) => {
  return dayjs(timestamp).format("h:mm A");
};
