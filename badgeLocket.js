var request = $request;

const options = {
    url: "https://api.locketcamera.com/changeProfileInfo",
    headers: {
        Authorization: request.headers["authorization"] || request.headers["Authorization"], // Tránh lỗi viết hoa/thường
        "Content-Type": "application/json",
        "User-Agent": request.headers["user-agent"] || request.headers["User-Agent"]
    },
    body: JSON.stringify({ // SỬA TẠI ĐÂY: Chuyển Object thành chuỗi JSON
        "data": {
            "badge": "locket_gold"
        }
    })
};

$httpClient.post(options, function(error, response, data) {
    if (error) {
        console.log("Lỗi kết nối: " + error);
    } else {
        console.log("Mã trạng thái: " + response.status);
        console.log("Dữ liệu trả về: " + data);
    }
    
    // BẮT BUỘC: Gọi $done để kết thúc script sau khi nhận phản hồi từ server
    $done({
        "result": {
            "status": 200
        }
    }); 
});
