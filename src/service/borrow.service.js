import createApiClient from "./api.service";
class BorrowService {
  constructor(baseUrl = "/api/admin/borrow") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getBorrowByuserId(userId) {
    return (await this.api.get(`?userId=${userId}`)).data;
  }

  async changeStatus(statusChangeInfo) {
    return (await this.api.post("/changestatus", statusChangeInfo)).data;
  }

  //   async create(data) {
  //     return (await this.api.post("/", data)).data;
  //   }
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
export default new BorrowService();
