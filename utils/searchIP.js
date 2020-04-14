let NeDB = require('nedb');
let db = new NeDB({
    filename:'dataBase/maquinas.db',
    autoload:true
});


module.exports = {
    insertMaqs: (req, res, as)=>{
        db.insert(as, (err, list)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(list);
            }
        });
    },

    findMaqs: (req, res, ip_maq = '201.23.160.3')=>{
        db.findOne({ ip: ip_maq }).exec((err, list)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(list);
            }

        });
    }, 
    removeAS: (req, res, numAs = '22085' )=>{
        db.remove({autNum: numAs }, {}, function (err) {

            if(err)return console.log(err);
          
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>AS removido</h1>');
          });

    }
     

};