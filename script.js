
const formLinks = {
    hoc_sinh: "https://docs.google.com/forms/d/e/LINK_FORM_HOC_SINH/viewform?embedded=true",
    cong_ty: "https://docs.google.com/forms/d/e/LINK_FORM_CONG_TY/viewform?embedded=true",
    rieng_le: "https://docs.google.com/forms/d/e/LINK_FORM_CA_NHAN/viewform?embedded=true"
};

function selectRole(role) {
    const formContainer = document.getElementById('form-container');
    const formTitle = document.getElementById('form-title');
    const iframeWrapper = document.getElementById('iframe-wrapper');

    // 1. Hiển thị khu vực chứa Form
    formContainer.classList.remove('hidden');

    // 2. Đổi tiêu đề phù hợp với nhóm đối tượng đã chọn
    if (role === 'hoc_sinh') {
        formTitle.innerText = "Phiếu Số Đo Dành Cho Học Sinh / Sinh Viên";
    } else if (role === 'cong_ty') {
        formTitle.innerText = "Phiếu Đăng Ký Đồng Phục Doanh Nghiệp";
    } else if (role === 'rieng_le') {
        formTitle.innerText = "Phiếu Đặt Áo Thiết Kế Cá Nhân";
    }

    // 3. Nhúng Google Form tương ứng vào thẻ iframe
    iframeWrapper.innerHTML = `
        <iframe 
            src="${formLinks[role]}" 
            width="100%" 
            height="800" 
            frameborder="0" 
            marginheight="0" 
            marginwidth="0">Đang tải biểu mẫu...
        </iframe>
    `;

    // 4. Tự động cuộn màn hình xuống khu vực điền form cho mượt mà
    formContainer.scrollIntoView({ behavior: 'smooth' });
}