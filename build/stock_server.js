"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 Created By zeng.jian On 2018/3/30
 */
var express = require("express");
var ws_1 = require("ws");
var path = require("path");
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/api/stock', function (req, res) {
    var result = stocks;
    var params = req.query;
    if (params.name) {
        result = result.filter(function (stock) { return stock.name.indexOf(params.name); });
    }
    res.json(result);
});
var server = app.listen(8000, 'localhost', function () {
    console.log('服务器已经启动，地址是http://localhost:8000');
});
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on('connection', function (websocket) {
    subscriptions.add(websocket);
});
var messageCount = 0;
setInterval(function () {
    subscriptions.forEach(function (ws) {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ messageCount: messageCount++ }));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 10000);
var subscriptions = new Set();
app.get('/api/stock/:id', function (req, res) {
    res.json(stocks.find(function (stock) { return stock.id == req.params.id; }));
});
var Stock = /** @class */ (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, '第一只股票', 1.99, 1.5, '阿花的angular入门项目', ['IT', 'BYD']),
    new Stock(2, '第二只股票', 6.99, 4.5, '阿猫的angular入门项目', ['金融', '互联网']),
    new Stock(3, '第三只股票', 5.99, 2.5, '阿成的angular入门项目', ['IT']),
    new Stock(4, '第四只股票', 1.99, 4.5, '阿晓的angular入门项目', ['IT']),
    new Stock(5, '第五只股票', 7.99, 3.5, '阿猪的angular入门项目', ['金融']),
    new Stock(6, '第六只股票', 3.99, 2.5, '阿撒的angular入门项目', ['IT', '金融']),
    new Stock(7, '第七只股票', 1.99, 3.2, '阿健的angular入门项目', ['互联网']),
    new Stock(8, '第八只股票', 8.99, 2.8, '阿瑞的angular入门项目', ['金融', 'IT'])
];
