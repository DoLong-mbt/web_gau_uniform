const formLinks = {
    hoc_sinh: "https://forms.gle/zk8ToitL8AEJdqiR9",
    cong_ty: "https://forms.gle/VaZ6bHTshTCMJ3ZD8",
    rieng_le: "https://forms.gle/sGPgTNrABCArMgn58"
};

function selectRole(role) {
    const formContainer = document.getElementById('form-container');
    const formTitle = document.getElementById('form-title');
    const iframeWrapper = document.getElementById('iframe-wrapper'); // Giữ nguyên cái id này của bạn trong HTML

    // 1. Hiển thị khu vực kết quả
    formContainer.classList.remove('hidden');

    // 2. Đổi tiêu đề phù hợp
    if (role === 'hoc_sinh') {
        formTitle.innerText = "Đường Dẫn Thu Thập Số Đo Học Sinh / Sinh Viên";
    } else if (role === 'cong_ty') {
        formTitle.innerText = "Đường Dẫn Thu Thập Số Đo Doanh Nghiệp";
    } else if (role === 'rieng_le') {
        formTitle.innerText = "Đường Dẫn Thu Thập Số Đo Cá Nhân";
    }

    // 3. Thay vì nhúng iframe, ta render ra giao diện lấy Link và nút Copy
    const linkCuaRole = formLinks[role];
    iframeWrapper.innerHTML = `
        <div style="background: #f4f5f7; padding: 20px; border-radius: 8px; text-align: center; margin-top: 15px;">
            <p style="margin-bottom: 10px; color: #555; font-weight: bold;">Vui lòng sao chép liên kết dưới đây để lấy form:</p>
            
            <input type="text" value="${linkCuaRole}" id="link-copy-input" readonly 
                style="width: 80%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; text-align: center; font-size: 16px; font-weight: 500; background: #fff;">
            
            <button onclick="copyLinkHethong()" 
                style="margin-left: 10px; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Copy Link
            </button>
            
            <p id="copy-success-msg" style="color: green; margin-top: 10px; font-weight: bold; display: none;">✓ Đã sao chép vào bộ nhớ tạm!</p>
        </div>
    `;

    // 4. Cuộn xuống mượt mà
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Hàm bổ sung: Xử lý tự động Copy link khi người dùng bấm nút
function copyLinkHethong() {
    const copyText = document.getElementById("link-copy-input");
    
    // Chọn đoạn văn bản trong ô input
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Dành cho điện thoại

    // Copy vào bộ nhớ tạm
    navigator.clipboard.writeText(copyText.value);
    
    // Hiển thị thông báo thành công
    const msg = document.getElementById("copy-success-msg");
    msg.style.display = "block";
    
    // Ẩn thông báo sau 2 giây
    setTimeout(() => {
        msg.style.display = "none";
    }, 2000);
}
