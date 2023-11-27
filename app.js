const express = require("express")
const app = express()
const session = require("express-session")
require("dotenv").config()
const registrarse = require("./routes/registrarse")
const PORT = process.env.PORT || 3000

const notas = require("./routes/notas")
const passport = require("./routes/passport")
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(session({
    secret:"abba2202.",
    resave:false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.get("/",(req,res)=>{
    res.render("index")
})
app.use("/registrarse", registrarse)
app.post("/registro",registrarse)

app.get("/iniciar-sesion",(req,res)=>{
    res.render("login")
})
app.post("/login",passport.authenticate("local",{
    successRedirect:"/notas",
    failureRedirect:"/inicio-sesion"
}))


app.use("/notas", notas)
app.post("/subir", notas)
app.listen(PORT,()=>{
    console.log("El servidor ha iniciado")
})