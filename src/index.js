const express = require('express')
const pool = require('../db/db.js')
const app = express()
app.use(express.json())

app.get('/produtos', (req,res) => {
  const mostrar = `SELECT * FROM produtos`

  pool.query(mostrar, (Error,result) => {
    if(Error){
      return res.status(500).json({message:'error no servidor'})
    }
    res.status(200).json(result)
  })
})
app.get()// futura rota de busca com LIKE

app.get() // filtrar produtos pelo preço

app.get('/produtos/:id', (req,res) =>{

  const {id} = req.params

  const filtro = `SELECT * FROM produtos WHERE id = ?`

  pool.query(filtro, [id], (error,result) => {
    if(error){
      return res.status(500).json({message:'error'})
    }
    if(result.length === 0){
      return res.status(404).json({message:'produto nao encontrado'})
    }
    res.status(200).json(result)
  })
})

app.post('/produtos', (req,res) => {
  const {nome,preco,estoque} = req.body
  if(!nome || !preco || estoque === undefined){
    return res.status(400).json({message:'preencha todos os campos'})
  }

  const insert = `INSERT INTO produtos (nome,preco,estoque) VALUES (?,?,?)`

  pool.query(insert, [nome,preco,estoque], (error) => {
    if(error){
      return res.status(500).json({message:"error"})
    }
    res.status(201).json({message:'produto adicinado'})
  })
})

app.put('/produtos/:id', (req,res) => {
  const {id} = req.params
  const {nome,preco,estoque} = req.body

  const put = `UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ? `

  pool.query(put,[nome,preco,estoque,id], (error,result) => {
    if(error){
      return res.status(500).json({message:'error'})
    }
    if(result.affectedRows === 0){
      return res.status(404).json({message:'produto nao encontrado'})
    }
    res.status(200).json({message:'produto atualizado'})
  })
})

app.delete('/produtos/:id', (req,res) => {
  const {id} = req.params

  const del = `DELETE FROM produtos WHERE id = ?`

  pool.query(del, [id], (error,result) =>{
    if(error){
      return res.status(500).json({message:'error'})
    }
    if(result.affectedRows === 0){
      return res.status(404).json({message:'produto nao encontrado'})
    }
    res.status(200).json({message:"produto deletado!"})
  })
})

app.listen(3000)