const express = require("express")
const router = express.Router()
const db = require("./db")

router.get("/",(req,res)=>{
    res.render("registrarse")
})

router.post("/registro",(req,res)=>{
    const {nombre,apellidos,correo,contraseña} = req.body
    const values = [nombre,apellidos,correo,contraseña]
    const sql = "INSERT INTO usuarios(nombre,apellidos,correo,contraseña) values(?,?,?,?)"
    db.query(sql,values,(err,results)=>{
        if(err){
            console.log("Error en la subida de datos")
        }else{
            console.log("Subida de datos exitosa")
            res.redirect("/")
        }
    })
})

module.exports = router