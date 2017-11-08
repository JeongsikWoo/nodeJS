// 모듈 추출
var express = require('express');

// 변수 선언
var items = [];

// 웹 서버 생성
var app = express();
app.use(express.static('public'));

// 라우트
app.all('/a', function(request, response){
    response.send('<h1>A</h1>')
});
app.all('/b', function(request, response){
    response.send('<h1>B</h1>')
});

// 웹 서버 실행
app.listen(8800, function(){
    console.log("Server Running at http://127.0.0.1:8800");
});