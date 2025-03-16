import createApiClient from "./api.service";

class profileService {
  constructor(baseUrl = "/api/admin/staff") {
    this.api = createApiClient(baseUrl);
  }

  async getAllStaff() {
    try {
      return (await this.api.get("")).data;
    } catch {
      console.log("Lỗi khi lấy thông tin nhân viên");
    }
  }

  async getStaffInfo(staffId) {
    try {
      return (await this.api.get(`/${staffId}`)).data;
    } catch {
      console.log("Lỗi khi lấy thông tin nhân viên");
    }
  }
}

export default new profileService();
