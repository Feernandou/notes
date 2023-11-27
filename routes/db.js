const sql = require("mysql2")

const db = sql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD ||"abba2202.",
    database: process.env.DB_DATABASE ||"notas"
})
db.connect((err)=>{
    if(err){
        console.log("Error en la conexión con la base de datos")
    }else{
        console.log("Conexión exitosa con la base de datos")
    }
})

module.exports = db