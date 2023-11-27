

const db = require("./db")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy




passport.use(new LocalStrategy({
    usernameField:"correo",
    passwordField:"contraseña"
},(username,password,done)=>{
    const sql = "SELECT * FROM usuarios WHERE correo = ?"
    db.query(sql,[username],(err,results)=>{
        if(err){
            console.log("Error, usuario no existente")
        }else{
            console.log("Usuario encontrado")
        }
        const user = results[0]
        if(password !== user.contraseña){
            console.log("Contraseña incorrecta")
        }
        return done(null,user)
    })
}))
passport.serializeUser((user,done)=>{
    done(null,{id:user.id})
})
passport.deserializeUser((data,done)=>{
    const {id} = data
    const sql = "SELECT * FROM usuarios WHERE id = ?"
    db.query(sql,id,(err,results)=>{
        if(err){
            return done(err)
        }
        const user = results[0]
        
        done(null,user)
    })
})

module.exports = passport