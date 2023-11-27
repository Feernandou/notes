const express = require("express");
const router = express.Router();
const db = require("./db")

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const sql = "SELECT * FROM notas WHERE autorID = ?"
    const id = req.user.id
    db.query(sql,id,(err,results)=>{
      if(err){
        console.log("Error en la recuperación de notas del usuario")
      }else{
        console.log("Notas del usuario recuperadas")
        res.render("notas", { user: req.user,notas:results});
      }
    })
    
  } else {
    
    res.redirect("/iniciar-sesion");
  }
});
router.post("/subir",(req,res)=>{
  const {titulo,contenido,autorID} = req.body
  const values = [titulo,contenido,autorID]
  const sql = "INSERT INTO notas(titulo,contenido,autorID) values(?,?,?)"
  db.query(sql,values,(err,results)=>{
    if(err){
      console.log("Ocurrió un error en la subida de datos de la nota")
    }else{
      console.log("Subida de datos de la nota exitosa")
      res.redirect("/notas")
    }
  })
})

module.exports = router;
