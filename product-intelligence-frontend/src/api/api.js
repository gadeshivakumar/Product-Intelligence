import axios from "axios";

const api = axios.create({
  baseURL:
    "https://product-intelligence-kqfa.onrender.com/api",
});

export const getProducts =
  async (
    page = 1,
    limit = 10,
    search = ""
  ) => {

    const response =
      await api.get("/products", {
        params: {
          page,
          limit,
          search,
        },
      });

    return response.data.data;
  };

export default api;