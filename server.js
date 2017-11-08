var express = require('express');

// 웹 서버를 생성합니다.
var app = express();
app.use(express.static('public'));
app.use(function(request, response){
    response.send("인덱스 페이지를 호출할 수 없습니다 ..");
});

// 웹 서버를 실행합니다.
app.listen(8383, function(){
    console.log('Server Running at http://127.0.0.1:8383');
});