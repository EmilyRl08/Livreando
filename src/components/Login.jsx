import { useState } from 'react'
import axios from 'axios'

function Login({ darkMode, setDarkMode, setLogado, setUsuarioLogado }) {
  const [nome, setNome] = useState('') // <-- Novo estado para o Nome
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  async function lidarComLogin(e) {
    e.preventDefault()
    setMensagem('')

    try {
      const resposta = await axios.post('http://localhost:3001/auth', {
        nome: nome, // <-- Envia o nome digitado
        email: email,
        senha: senha
      })

      if (resposta.data.sucesso) {
        // Se a conta acabou de ser criada, precisamos simular os dados ou logar de novo.
        // O seu backend retorna resposta.data.usuario caso o login dê certo!
        if (resposta.data.usuario) {
          setUsuarioLogado(resposta.data.usuario)
          setLogado(true)
        } else {
          setMensagem('Conta criada com sucesso! Digite as credenciais para entrar. 🚀')
          setNome('')
        }
      } else {
        setMensagem(resposta.data.mensagem)
      }
    } catch (erro) {
      console.log('Erro na autenticação:', erro)
      setMensagem('Erro ao conectar ao servidor.')
    }
  }

  return (
    <div className={darkMode ? 'login dark' : 'login light'}>
      <div className="particles"></div>

      <div className="login-box">
        <h1>Livreando</h1>
        
        {mensagem && <p style={{ color: '#9391ff', textAlign: 'center', fontSize: '14px' }}>{mensagem}</p>}

        <form onSubmit={lidarComLogin}>
          {/* NOVO CAMPO DE NOME */}
          <input
            type="text"
            placeholder="Seu Nome (para novos cadastros)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Entrar / Cadastrar</button>
        </form>

        <button className="mode" onClick={() => setDarkMode(!darkMode)} style={{ margin: 'auto' }}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}

export default Login