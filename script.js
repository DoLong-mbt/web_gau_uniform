let vaiTroHienTai = ""; 

// Hàm chạy khi click vào 1 trong 3 nút đối tượng chính (Học sinh, Công ty, Cá nhân)
function selectRole(role) {
    vaiTroHienTai = role; 
    const formContainer = document.getElementById('form-container');
    const formTitle = document.getElementById('form-title');
    const khungNhapLieu = document.getElementById('khung-nhap-lieu-drive'); 
    const btnTao = document.getElementById('btn-tao-link');

    // 1. Hiển thị khu vực form tổng
    formContainer.classList.remove('hidden');

    // 2. Cho cái khung nhập liệu đổi từ ẩn thành hiện
    khungNhapLieu.style.display = "block";

    // 3. Reset ẩn khu vực kết quả link cũ và xóa chữ đã nhập trước đó
    document.getElementById('ket-qua-link-wrapper').style.display = "none";
    document.getElementById('input-truong').value = "";
    document.getElementById('input-lop').value = "";

    // 4. KIỂM TRA ĐIỀU KIỆN: Nếu là Khách Cá Nhân, ẩn các ô nhập liệu đi
    if (role === 'rieng_le') {
        formTitle.innerText = "Khởi Tạo Hệ Thống - Khách Hàng Cá Nhân";
        
        // Điền sẵn giá trị ẩn để Make.com không bị lỗi khi nhận dữ liệu
        document.getElementById('input-truong').value = "Khách Cá Nhân";
        document.getElementById('input-lop').value = "Cá Nhân";
        
        // Ẩn 2 cái thẻ chứa ô nhập liệu đi cho đỡ vướng mắt khách
        document.getElementById('input-truong').parentElement.style.display = "none";
        document.getElementById('input-lop').parentElement.style.display = "none";
        
        // Đổi chữ nút bấm cho chuẩn ngữ cảnh
        btnTao.innerText = "Tạo Biểu Mẫu Cá Nhân Ngay";
    } 
    // Nếu là Học sinh hoặc Công ty thì hiện lại 2 ô nhập liệu như bình thường
    else {
        document.getElementById('input-truong').parentElement.style.display = "block";
        document.getElementById('input-lop').parentElement.style.display = "block";
        
        if (role === 'hoc_sinh') {
            formTitle.innerText = "Khởi Tạo Hệ Thống Thu Thập - Khối Học Sinh / Trường Học";
            btnTao.innerText = "Bấm vào đây để lấy link form";
        } else if (role === 'cong_ty') {
            formTitle.innerText = "Khởi Tạo Hệ Thống Thu Thập - Khối Doanh Nghiệp";
            btnTao.innerText = "Bấm vào đây để lấy link form";
        }
    }

    // 5. Cuộn màn hình xuống mượt mà
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Hàm cốt lõi: Bốc dữ liệu Trường + Lớp bắn sang Webhook của Make.com
async function guiYeuCauTaoForm() {
    const tenTruong = document.getElementById('input-truong').value.trim();
    const tenLop = document.getElementById('input-lop').value.trim();
    const btnTao = document.getElementById('btn-tao-link');

    // Kiểm tra xem user đã nhập đủ thông tin chưa
    if (!tenTruong || !tenLop) {
        alert("Bạn ơi, hãy nhập đầy đủ Tên Trường/Công ty và Lớp/Phòng ban nhé!");
        return;
    }

    // Khóa nút bấm lại và đổi text để user tránh click liên tục khi đang xử lý
    btnTao.innerText = "Đang khởi tạo cấu trúc Drive...";
    btnTao.disabled = true;

    // !!! CHỖ NÀY CỰC KỲ QUAN TRỌNG: Thay bằng cái link Webhook lấy từ Make của bạn vào !!!
    const webhookUrl = "https://hook.eu1.make.com/q3hlt1mc7wlhm1bvtlqtdzsdw40xanrm"; 

    // Gói dữ liệu JSON gửi sang Make
    const dataGuiDi = {
        vai_tro: vaiTroHienTai,
        ten_truong: tenTruong,
        ten_lop: tenLop
    };

    try {
        // Bắn tín hiệu sang Make bằng API fetch
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataGuiDi)
        });

        if (response.ok) {
            const dataNhanVe = await response.json(); // Nhận cục JSON { "linkFormMoi": "..." } từ Make trả về
            
            // Hiển thị ô kết quả và điền link Form mới tinh vào ô input
            document.getElementById('ket-qua-link-wrapper').style.display = "block";
            document.getElementById('link-copy-input').value = dataNhanVe.linkFormMoi;
            
            // Cuộn tiếp xuống phần link kết quả thành công
            document.getElementById('ket-qua-link-wrapper').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Lỗi kết nối đến hệ thống tự động hóa Make! Hãy kiểm tra lại Scenario.");
        }
    } catch (error) {
        console.error("Lỗi kết nối:", error);
        alert("Không kết nối được tới cổng server Make.com!");
    } finally {
        // Sau khi xử lý xong (thành công hoặc thất bại) thì mở khóa lại nút bấm ban đầu
        btnTao.innerText = "Sinh Link Form Riêng trên Drive";
        btnTao.disabled = false;
    }
}

// Hàm xử lý tự động Copy link khi người dùng bấm nút Copy nhanh
function copyLinkHethong() {
    const copyText = document.getElementById("link-copy-input");
    
    // Chọn đoạn văn bản trong ô input
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Hỗ trợ trên giao diện điện thoại

    // Copy văn bản vào bộ nhớ tạm (Clipboard)
    navigator.clipboard.writeText(copyText.value);
    
    // Hiển thị thông báo "Đã sao chép!" màu xanh
    const msg = document.getElementById("copy-success-msg");
    msg.style.display = "block";
    
    // Ẩn dòng thông báo đó đi sau 2 giây cho đẹp
    setTimeout(() => {
        msg.style.display = "none";
    }, 2000);
}
