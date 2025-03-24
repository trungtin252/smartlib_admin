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

export const showSuccessCreateBook = () => {
  Swal.fire({
    title: "Thêm sách thành công ",
    text: "Sách được thêm thành công",
    icon: "success",
  });
};

export const showConfimGetBookManual = async (
  maYeuCau,
  maSach,
  tieuDe,
  viTri
) => {
  return Swal.fire({
    title: `Xác nhận đã lấy sách của yêu cầu <strong>${maYeuCau}</strong>?`,
    html: `
      <p><strong>Mã sách:</strong> ${maSach}</p>
      <p><strong>Tên sách:</strong> ${tieuDe}</p>
      <p><strong>Vị trí trong kệ:</strong> ${viTri}</p>
    `,
    input: "password",
    inputPlaceholder: "Nhập mật khẩu xác nhận",
    inputAttributes: {
      autocapitalize: "off",
      autocomplete: "new-password",
    },
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
    showLoaderOnConfirm: true,
    preConfirm: (password) => {
      if (!password) {
        Swal.showValidationMessage("Bạn phải nhập mật khẩu để xác nhận");
      }
      return password;
    },
  });
};

export const showConfimGetBookAuto = (maYeuCau, maSach, tieuDe, viTri) => {
  return Swal.fire({
    title: `Xác nhận đã lấy sách của yêu cầu <strong>${maYeuCau}</strong>?`,
    html: `
      <p><strong>Mã sách:</strong> ${maSach}</p>
      <p><strong>Tên sách:</strong> ${tieuDe}</p>
      <p><strong>Vị trí trong kệ:</strong> ${viTri}</p>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
  });
};

export const showInfo = (title, content) => {
  Swal.fire({
    title: title,
    text: content,
    icon: "info",
  });
};

export const showError = (title, content) => {
  Swal.fire({
    title: title,
    text: content,
    icon: "error",
  });
};

export const showSuccess = (title, content) => {
  Swal.fire({
    title: title,
    text: content,
    icon: "success",
  });
};
