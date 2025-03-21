import createApiClient from "./api.service";
class BookService {
  constructor(baseUrl = "/api/admin/book") {
    this.api = createApiClient(baseUrl);
  }
  async getAll(page = 1, limit = 5, query, sortBy) {
    let queryString = `?page=${page}&limit=${limit}`;
    if (query.title) {
      queryString = queryString + "&title=" + query.title;
    }
    if (query.author) {
      queryString = queryString + "&author=" + query.author;
    }
    if (query.category) {
      queryString = queryString + "&category=" + query.category;
    }
    queryString = queryString + "&sortBy=" + sortBy;
    return (await this.api.get(queryString)).data;
  }

  async deleteBook(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async getBookById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async createBook(data) {
    return (
      await this.api.post("/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }

  async update(id, data) {
    return (
      await this.api.put(`/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }

  //   async deleteAll() {
  //     return (await this.api.delete("/")).data;
  //   }
  //   async get(id) {
  //     return (await this.api.get(`/${id}`)).data;
  //   }
  //   async update(id, data) {
  //     return (await this.api.put(`/${id}`, data)).data;
  //   }
  //   async delete(id) {
  //     return (await this.api.delete(`/${id}`)).data;
  //   }
}
export default new BookService();
