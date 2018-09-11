var express = require('express');
var router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
      console.log("hola");   
      res.render('front/index');
   
});

router.get('/avatar', (req, res) => {
       
      res.render('front/avatar');
   
});


/*router.get("/partida/:id", (req, res) => {
    const id = req.param.id;
         knex('Partida')
    .select()
    .where('id_partida',id)
      .first()
    .then(partida =>{
      res.render('front/puzzle', { title: "Imagenes", objPartida: partida });
  });  
      
}); */

router.get('/avatarEscogido', (req, res) => {
       
      res.render('front/avatarEscogido');
   
});


router.get('/juegos', (req, res) => {
    
       knex('Imagenes')
    .select()
    .then(imagenes =>{
      res.render('front/juegos', { title: "Imagenes", objImagenes: imagenes });
  });  
      
   
});

function respondAndRenderUser(id,res,viewName){  
  if(typeof id != 'undefined'){
      console.log("respon");
    knex('Imagenes')
      .select()
      .where('id_imagen',id)
      .first()
      .then(imagenes => {
        
        res.render(viewName,{imagenes: imagenes});
    });
  }else{
    
    console.log('error invalid id ');   
    res.status(500);
    res.render('error', {
      message: 'Invalid ID user' 
    });    
  }  
}

//puntos

  router.get('/puntos/:id', function(req, res){

    const id = req.params.id;

    knex('Partida')
     .where('id_partida', id)
     .first()
     .then( partida => {
      res.json({user: partida});
    });
    
  });


 router.post('/puntos/:id', function(req, res){
     console.log("Entro al post");
    const id = req.params.id;

    knex('Partida')
    .increment('puntaje', 1)
     .where('id_partida', id)
     .then( partida => {
      res.json({user: partida});
    });
    
  });






router.get('/puzzle/:id_imagen', (req, res) => {
      const id = req.params.id_imagen;
    console.log("get"+ id);
  respondAndRenderUser(id,res,'front/puzzle'); 
      //res.render('front/puzzle');
   
});


router.get('/puzzle2', (req, res) => {
       
      res.render('front/puzzle2');
   
});


router.get('/puzzle3', (req, res) => {
       
      res.render('front/puzzle3');
   
});


router.get('/login', (req, res) => {
       
      res.render('user/login');
   
});


router.get('/administradorP', (req, res) => {
       
      res.render('front/administradorP');
   
});

router.get('/admin', (req, res) => {
       
      res.render('front/admin');
   
});


router.get('/', (req, res) => {
  knex('Imagenes')
    .select()
    .then(imagenes =>{
      res.render('imagen/uoload', { title: "Imagenes", objImagenes: imagenes });
  });  
});






module.exports = router;
