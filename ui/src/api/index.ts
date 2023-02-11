import axios, { AxiosResponse } from "axios";

const baseURL = "/api";

const axi = axios.create({
  baseURL,
});

const api = {
  chat(prompt: { prompt: string }): Promise<AxiosResponse<{ text: string }>> {
    return axi.post("/chat", prompt);
  },
};

export default api;
