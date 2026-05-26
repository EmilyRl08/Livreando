const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()

// CONFIGURAÇÕES
app.use(cors())
app.use(express.json())

// CONEXÃO MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SENAI103',
    database: 'livreando'
})

// TESTAR CONEXÃO
db.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar MySQL ❌')
        console.log(erro)
        return
    }
    console.log('MySQL conectado 🚀')
})

// ROTA TESTE
app.get('/', (req, res) => {
    res.send('API funcionando 🚀')
})

// LOGIN / CADASTRO AUTOMÁTICO
app.post('/auth', (req, res) => {
    const { nome, email, senha } = req.body

    // VALIDAÇÃO
    if (!email || !senha) {
        return res.json({
            sucesso: false,
            mensagem: 'Preencha email e senha'
        })
    }

    const verificar = 'SELECT * FROM usuarios WHERE email = ?'
    
    db.query(verificar, [email], (erro, resultado) => {
        if (erro) {
            console.log(erro)
            return res.status(500).json(erro)
        }

        // USUÁRIO EXISTE
        if (resultado.length > 0) {
            const usuario = resultado[0]

            // SENHA ERRADA
            if (usuario.senha !== senha) {
                return res.json({
                    sucesso: false,
                    mensagem: 'Senha incorreta'
                })
            }

            return res.json({
                sucesso: true,
                usuario
            })
        }

        // CRIAR CONTA CASO NÃO EXISTA
        const sql = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        `

        db.query(sql, [nome || 'Usuário', email, senha], (erro, resultadoCriar) => {
            if (erro) {
                console.log(erro)
                return res.status(500).json(erro)
            }

            return res.json({
                sucesso: true,
                mensagem: 'Conta criada 🚀'
            })
        })
    })
})

// BUSCAR LIVROS
app.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM livros'
    
    db.query(sql, (erro, resultado) => {
        if (erro) {
            console.log(erro)
            return res.status(500).json(erro)
        }
        return res.json(resultado)
    })
})

// SALVAR LIVRO
app.post('/livros', (req, res) => {
    console.log('Dados recebidos no body:', req.body)

    const {
        usuario_id,
        titulo,
        avaliacao,
        status,
        imagem
    } = req.body

    // VALIDAÇÕES
    if (!titulo) {
        return res.json({
            sucesso: false,
            mensagem: 'Título obrigatório'
        })
    }

    // SQL corrigido usando a coluna 'avaliacao'
    const sql = `
        INSERT INTO livros (usuario_id, titulo, avaliacao, status, imagem)
        VALUES (?, ?, ?, ?, ?)
    `

    db.query(
        sql,
        [
            usuario_id || 1,
            titulo,
            avaliacao || '',
            status || 'lendo',
            imagem || ''
        ],
        (erro, resultado) => {
            if (erro) {
                console.log('ERRO MYSQL AO INSERIR LIVRO ❌')
                console.log(erro)
                return res.status(500).json(erro)
            }

            console.log('Livro salvo no banco com sucesso! 🚀')
            return res.json({
                sucesso: true,
                mensagem: 'Livro salvo 🚀',
                id: resultado.insertId
            })
        }
    )
})

// APAGAR LIVRO
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params
    console.log('Tentando apagar livro de ID:', id)

    const sql = 'DELETE FROM livros WHERE id = ?'

    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.log('ERRO MYSQL AO APAGAR LIVRO ❌')
            console.log(erro)
            return res.status(500).json(erro)
        }
        
        console.log('Livro removido do banco com sucesso! 🗑️')
        return res.json({ sucesso: true, mensagem: 'Livro apagado com sucesso! 🗑️' })
    })
})

// EDITAR LIVRO (ALTERAR STATUS OU AVALIAÇÃO)
app.put('/livros/:id', (req, res) => {
    const { id } = req.params
    const { titulo, avaliacao, status, imagem } = req.body

    const sql = `
        UPDATE livros 
        SET titulo = ?, avaliacao = ?, status = ?, imagem = ? 
        WHERE id = ?
    `

    db.query(sql, [titulo, avaliacao, status, imagem, id], (erro, resultado) => {
        if (erro) {
            console.log('ERRO MYSQL AO EDITAR LIVRO ❌')
            console.log(erro)
            return res.status(500).json(erro)
        }
        console.log('Livro editado no banco com sucesso! 📝')
        return res.json({ sucesso: true, mensagem: 'Livro updated!' })
    })
})

// SERVIDOR
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001 🚀')
})