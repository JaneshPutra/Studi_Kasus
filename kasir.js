//iniaili library
const express = require("express")
const BodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const bodyParser = require("body-parser")

// implementasi

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kasirr"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})



// end-point akses data kasir
app.get("/kasir", (req, res) => {
    // create sql query
    let sql = "select * from kasir"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                kasir: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data siswa berdasarkan id_siswa tertentu
app.get("/kasir/:id", (req, res) => {
    let data = {
        id_kasir: req.params.id
    }
    // create sql query
    let sql = "select * from data_kasir where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                kasir: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data siswa
app.post("/kasir", (req, res) => {

    // prepare data
    let data = {
        nama_kasir: req.body.nama_kasir,
        status_kasir: req.body.status_kasir
    }

    // create sql query insert
    let sql = "insert into kasir set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data siswa
app.put("/kasir", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            nama_kasir: req.body.nama_kasir,
            status_kasir: req.body.status_kasir
        },

        // parameter (primary key)
        {
            id_kasir: req.body.id_kasir
        }
    ]

    // create sql query update
    let sql = "update kasir set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data siswa berdasarkan id_siswa
app.delete("/kasir/:id", (req, res) => {
    // prepare data
    let data = {
        id_kasir: req.params.id
    }

    // create query sql delete
    let sql = "delete from kasir where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

app.listen(8000, () => {
    console.log("Run on port 8000")
})