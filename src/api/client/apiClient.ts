import axios, { AxiosInstance } from "axios";
import getBaseUrl from "../basurl";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: getBaseUrl(),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setAuthToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.client.defaults.headers.common["Authorization"];
  }

  getClient() {
    return this.client;
  }
}

export const apiClient = new ApiClient();
