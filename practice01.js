// 모듈 추출
var express = require('express');
var bodyParser = require('body-parser');

// 변수 선언
var items = [{
    name: '우유',
    price: '800'
}, {
    name: '홍차',
    price: '3500'
}, {
    name: '커피',
    price: '1500'
}];

// 웹 서버 생성
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/products', function(request, response){
    response.send(items);
});
app.get('/products/:id', function(request, response){
    // 변수선언
    var id = Number(request.params.id);

    if(isNaN(id)){
        // 오류: 잘못된 경로
        response.send({
            error: '숫자를 입력하세요!'
        });
    } else if(items[id]){
        // 정상
        response.send(items[id]);
    } else {
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다!'
        });
    }
});
app.post('/products', function(request, response){
    // 변수를 선언합니다.
    var name = request.body.name;
    var price = request.body.price;
    var item = {
        name: name,
        price: price
    };
    
    items.push(item);
    response.send({
        message: '데이터를 추가했습니다.',
        data: item
    });
});

app.put('/products/:id', function(request, response){
    // 변수를 선언합니다.
    var id = Number(request.params.id);
    var name = request.body.name;
    var price = request.body.price;

    if(items[id]){
        if(name) {items[id].name = name;}
        if(price){items[id].price = price;}

        // 응답합니다
        response.send({
            message: '데이터를 수정했습니다.',
            data: items[id]
        });
    } else{
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다!'
        });
    }
});

app.del('/products/:id', function(request, response){
    // 변수를 선언합니다.
    var id = Number(request.params.id);

    if(isNaN(id)){
        // 오류: 잘못된 경로
        response.send({
            error: '숫자를 입력하세요!'
        });
    } else if(items[id]){
        // 정상: 데이터 삭제
        items.splice(id, 1);
        response.send({
            message: '데이터를 삭제했습니다.'
        });
    } else{
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다!'
        });
    }
});

// 라우트
// xml
app.all('/data.xml', function(request, response){
    var output ='';
    output+= '<?xml version="1.0" encoding="UTF-8" ?>';
    output+= '<products>';
    items.forEach(function(item){
        output+= '<product>';
        output+= '  <name>' + item.name + '</name>';
        output+= '  <price>' + item.price + '</price>';
        output+= '</product>';
    })
    output+= '</products>';

    response.type('text/xml');
    response.send(output);
});

// JSON 형식 응답
app.all('/data.json', function(request, response){
    response.send(items);
});
//  html
app.all('/data.html', function(request, response){
    var output ='';
    output+= '<!DOCTYPE html>';
    output+= '<html>';
    output+= '  <head>';
    output+= '      <title>HTML</title>';
    output+= '  </head>';
    output+= '  <body>'
    items.forEach(function(item){
        output+= '<div>';
        output+= '  <h1>' + item.name + '</h1>';
        output+= '  <h2>' + item.price + '</h2>';
        output+= '</div>';
    })
    output+= '  </body>';
    output+= '</html>';
    response.send(output);
});

app.all('/parameter', function(request, response){
    var name = request.param('name');
    var region = request.param('region');

    // 응답합니다.
    response.send('<h1>' + name + ':' + region + '</h1>');
});

// 웹 서버 실행
app.listen(12312, function(){
    console.log("Server Running at http://127.0.0.1:12312");
});