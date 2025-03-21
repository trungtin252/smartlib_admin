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

export const showNoteDeniBorrow = async () => {
  return Swal.fire({
    title: "Nhập vào lý do từ chối yêu cầu",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
      autocomplete: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    showLoaderOnConfirm: true,
    preConfirm: (inputValue) => {
      if (!inputValue) {
        Swal.showValidationMessage("Bạn phải nhập vào lý do từ chối yêu cầu");
      }
      return inputValue; // Return input value to .then()
    },
  });
};

export const showErrorDeleteBook = () => {
  Swal.fire({
    icon: "error",
    title: "Xóa thất bại",
    text: "Không thể xóa sách do sách nằm trong danh sách yêu cầu",
  });
};

export const showSuccessDelete = () => {
  Swal.fire({
    title: "Xóa thành công",
    text: "Xóa sách thành công",
    icon: "success",
  });
};

export const showSuccessUpdateBook = () => {
  Swal.fire({
    title: "Cập nhật thành công ",
    text: "Sách được cập nhật thành công",
    icon: "success",
  });
};
