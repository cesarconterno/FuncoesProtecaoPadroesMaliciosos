// const env = require('../.env')
// var nedb = require('nedb');
// var db = new nedb({filename: './maq.db', autoload: true});
// const ssh = require('../functions/ssh')


// var maquina1 = {
//     ASN: '28573',
//     ip: '201.52.1.3',
//     user: env.userRemoto,
//     pass: env.passRemoto
// };

// var maquina2 = {
//     ASN: '22548',
//     ip: '200.160.4.5',
//     user: env.userRemoto,
//     pass: env.passRemoto
// };


// // db.insert(maquina1, function(err){
// //     if(err)return console.log(err); //caso ocorrer algum erro
   
// //     console.log("Nova máquina adicionada!");
// // });

// // db.insert(maquina2, function(err){
// //     if(err)return console.log(err); //caso ocorrer algum erro
   
// //     console.log("Nova máquina adicionada!");
// // });


// db.find({ ASN: '28573' }, function (err, maq) {
//     if(err)return console.log(err);
//     aux = maq
//     console.log(maq);
//     // ssh.comandoRemoto(env.hostRemoto, env.userRemoto, env.passRemoto, 'echo "oi"')

// });


// // db.remove({ _id: "ldvr77TeE1gTNCEv" }, {}, function (err) {
// // if(err)return console.log(err);

// // console.log("Maquina removido");
// // });