
var request = $request;

const options = {
    url: "https://api.locketcamera.com/changeProfileInfo",
    headers: {
        Authorization: request.headers["authorization"],
        "Content-Type": "application/json",
        "User-Agent": request.headers["user-agent"]
    },
    body: JSON.stringify({
  "data": {
    "badge": "locket_gold"
  }
})
};

$httpClient.post(options, function(error, response, data) {
    console.log(response);
});
