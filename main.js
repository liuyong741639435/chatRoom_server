const ws = require('ws');
const express = require('express');

const app = express();
app.listen('80');

app.use(express.static("./public"));

const wss = new ws.Server({
    port: 3000,
}, () => {
    console.log('开始监听3000端口')
})

wss.on('connection', (ws) => {
    console.log('监听到一个新的连接')
    ws.on('message', (msg) => {
        const reqMsg = JSON.parse(msg);
        console.log(`收到消息：${msg}`)
        // ws.send(JSON.stringify({
        //     a: 1,
        //     msg: '我收到你消息了'
        // }));
        const resMsg = reqMsg;
        wss.clients.forEach((ws) => {
            ws.send(JSON.stringify(resMsg))
        })
    })
})