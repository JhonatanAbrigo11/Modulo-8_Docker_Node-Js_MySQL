import express from "express";
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

const pool = mysql.createPool(
    {
        host: 'db',
        user: 'admin',
        password: 'admin',
        database:'laptopsdb',
        port:3306
    }
);

//Ingresar las laptops
app.post('/laptops',async (req,res)=> {
    const {marca,procesador,memoria,disco}= req.body;
    const [result]= await pool.query (
        'INSERT INTO laptops (marca,procesador,memoria,disco) VALUES(?,?,?,?)',
        [marca,procesador,memoria,disco]
    );
    const [rows] = await pool.query('SELECT * FROM laptops WHERE id = ?',[result.insertId]);
    res.json(rows[0]);
})


// GET /laptops/:id → recuperar laptop
app.get("/laptops/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM laptops WHERE id = ?", [id]);
  if (rows.length > 0) {
    res.json(rows[0]);   // muestra la laptop encontrada
  } else {
    res.json({ mensaje: "No se encontró la laptop" }); // mensaje básico
  }
});

// GET /laptops → todas las laptops
app.get("/laptops", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM laptops");
  res.json(rows);
});

// PUT /laptops/:id → actualizar laptop
app.put("/laptops/:id", async (req, res) => {
  const { id } = req.params; 
  const { marca, procesador, memoria, disco } = req.body;
  await pool.query(
    "UPDATE laptops SET marca=?, procesador=?, memoria=?, disco=? WHERE id=?",
    [marca, procesador, memoria, disco, id]
  );
  const [rows] = await pool.query("SELECT * FROM laptops WHERE id=?", [id]);
  res.json(rows[0] || {});
});

// DELETE /laptops/:id → eliminar laptop
app.delete("/laptops/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM laptops WHERE id=?", [id]);
  res.status(200).send();
});

app.listen(3000, () => console.log("Servidor corriendo en puerto"));
