const app = require('./server');

app.listen(process.env.NODE_PORT, '127.0.0.1', ()=>{
    console.log(`Use link to show your data http://127.0.0.1:${process.env.NODE_PORT}/`);
});