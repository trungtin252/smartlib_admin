import createApiClient from "./api.service";

class loginService {
  constructor(baseUrl = "/api/admin/login") {
    this.api = createApiClient(baseUrl);
  }

  async Login(infoLogin) {
    try {
      return (await this.api.post("", infoLogin)).data;
    } catch {
      console.log("Sai tên đăng nhập hoặc mật khẩu");
    }
  }
}

export default new loginService();
