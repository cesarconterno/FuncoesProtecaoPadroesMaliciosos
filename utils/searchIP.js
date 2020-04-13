let NeDB = require('nedb');
let db = new NeDB({
    filename:'dataBase/maquinas.db',
    autoload:true
});

var as1 = {
	autNum: "2715",
	ip: ["200.156.10.5", "200.20.6.7", "200.6.41.4"]
};
var as2 = {
	autNum: "28573",
	ip: ["200.189.80.7", "200.160.96.8", "201.6.3.9", "201.17.2.3"]
};
var as3 = {
	autNum: "22085",
	ip: ["200.169.112.2", "201.23.160.3", "189.92.2.4", "189.24.3.5", "187.68.7.6"]
};

module.exports = {
    insertMaqs: (req, res)=>{
        db.insert(as2, (err, list)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(list);
            }
        });
    },

    findMaqs: (req, res)=>{
        db.findOne({ ip: '200.20.120.111' }).exec((err, list)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(list);
            }

        });
    }, 
    removeAS: (req, res)=>{
        db.remove({autNum: '2715' }, {}, function (err) {

            if(err)return console.log(err);
          
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>AS removido</h1>');
          });

    }
     

};