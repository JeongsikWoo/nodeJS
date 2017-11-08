// 모듈 추출
var express = require('express');
var bodyParser = require('body-parser');

// 변수 선언
var items = [{
    name: '우유',
    price: '2000'
}, {
    name: '물',
    price: '1000'
}, {
    name: '사이다',
    price: '3000'
}];

// 웹 서버 생성
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.all('/data.html', function(request, response){
    var output = '';
    output += '<!DOCTYPE html>';
    output += '<html>';
    output += '<head>';
    output += ' <title>Data HTML</title>';
    output += '</head>';
    output += '<body>';
    items.forEach(function(item){
        output += '<div>';
        output += ' <h1>' + item.name + '</h1>';
        output += ' <h2>' + item.price + '</h2>';
        output += '</div>';
    });
    output += '</body>';
    output += '</html>';
    response.send(output);
});

app.all('/data.json', function(request, response){
    response.send(items);
});

app.all('/data.xml', function(request, response){
    var output = '';
    output += '<?xml version="1.0" encoding="UTF-8" ?>';
    output += '<products>';
    items.forEach(function(item){
        output += '<product>';
        output += ' <name>' + item.name + '</name>';
        output += ' <price>' + item.price + '</price>';
        output += '</product>';
    });
    output += '</products>';
    response.send(output);
});

app.all('/parameter', function(request, response){
    // 변수 선언
    var name = request.query.name;
    var region = request.query.region;

    // 응답
    response.send('<h1>' + name + ':' + region + '</h1>');
});

app.all('/parameter/:id', function(request, response){
    // 변수 선언
    var id = request.params.id;

    // 응답
    response.send('<h1>' + id + '</h1>');
});

app.get('/products/:id', function(request, response){
    // 변수 선언
    var id = Number(request.params.id);

    if(isNaN(id)){
        // 오류: 잘못된 경로
        response.send({
            error: '숫자를 입력하세요'
        });
    } else if(items[id]){
        // 정상
        response.send(items[id]);
    } else{
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다.'
        });
    }
});

app.post('/products', function(request, response){
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
    var id = Number(request.params.id);
    var name = request.body.name;
    var price = request.body.price;

    if(items[id]){
        if(name){items[id].name = name;}
        if(price){items[id].price = price;}

        response.send({
            message: '데이터를 수정했습니다.',
            data: items[id]
        });
    } else{
        response.send({
            error: '존재하지 않는 데이터입니다'
        });
    }
});

app.delete('/products/:id', function (request, response){
    var id = Number(request.params.id);

    if(isNaN(id)){
        response.send({
            error: '숫자를 입력하세요!'
        });
    } else if(items[id]){
        items.splice(id, 1);
        response.send({
            message: '데이터를 삭제했습니다.'
        });
    } else {
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다!'
        });
    }
});

// 웹 서버 실행
app.listen(8800, function(){
    console.log('Server Running at http://127.0.0.1:8800');
});