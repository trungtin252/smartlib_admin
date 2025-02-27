import Swal from "sweetalert2";

export const showSuccessLogin = () => {
  Swal.fire({
    title: "Đăng nhập thành công!",
    text: "Chào mừng bạn trở lại.",
    icon: "success",
  });
};

export const showErrorLogin = () => {
  Swal.fire({
    icon: "error",
    title: "Đăng nhập thất bại.",
    text: "Tên tài khoản hoặc mật khẩu không đúng",
  });
};

export const showComfirm = async () => {
  return Swal.fire({
    title: "Bạn có chắc muốn thực hiện thao tác?",
    showCancelButton: true,
    confirmButtonText: "Ok",
    denyButtonText: `Hủy`,
  });
};
