module.exports = {
    forListIP: (req, res)=>{

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>lista de IPs da rota encontrada</h1>');
    },
    forAutNum: (req, res)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>lista de IP do AS</h1>');
       
    } 
};