import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import Header from './components/Header'
import Login from './components/Login'
import Hero from './components/Hero'
import FormLivro from './components/FormLivro'
import LivroCard from './components/LivroCard'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Livreando. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="https://github.com/EmilyRl08" target="_blank" rel="noopener noreferrer" className="github-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [logado, setLogado] = useState(false)
  const [usuarioLogado, setUsuarioLogado] = useState(null) 
  const [filtro, setFiltro] = useState('todos')
  const [livros, setLivros] = useState([])

  useEffect(() => {
    if (logado && usuarioLogado) {
      buscarLivros()
    }
  }, [logado, usuarioLogado])

  async function buscarLivros(){
    try {
      const resposta = await axios.get('http://localhost:3001/livros')
      
      // Filtra apenas os livros pertencentes ao usuário logado
      const livrosDoUsuario = resposta.data.filter(
        (livro) => livro.usuario_id === usuarioLogado.id
      )
      setLivros(livrosDoUsuario)
    } catch(erro) {
      console.log('Erro ao buscar livros:', erro)
    }
  }

  async function adicionarLivro(livro){
    try {
      await axios.post('http://localhost:3001/livros', {
        usuario_id: usuarioLogado.id, 
        titulo: livro.titulo,
        avaliacao: livro.avaliacao,
        status: livro.status,
        imagem: livro.imagem
      })
      await buscarLivros()
    } catch(erro) {
      console.log('Erro ao salvar livro:', erro)
    }
  }

  async function deletarLivro(id) {
    if (confirm("Tem certeza que deseja apagar este livro?")) {
      try {
        await axios.delete(`http://localhost:3001/livros/${id}`)
        await buscarLivros() 
      } catch (erro) {
        console.log('Erro ao deletar livro:', erro)
      }
    }
  }

  async function editarLivro(id, livroAtualizado) {
    try {
      await axios.put(`http://localhost:3001/livros/${id}`, {
        ...livroAtualizado,
        usuario_id: usuarioLogado.id
      })
      await buscarLivros() 
    } catch (erro) {
      console.log('Erro ao editar livro:', erro)
    }
  }

  const livrosFiltrados = livros.filter((livro) => {
    if(filtro === 'todos') return true
    return livro.status === filtro
  })

  if(!logado){
    return (
      <Login darkMode={darkMode} setDarkMode={setDarkMode} setLogado={setLogado} setUsuarioLogado={setUsuarioLogado} />
    )
  }

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} setLogado={setLogado} usuarioLogado={usuarioLogado} />

      <div style={{ padding: '25px 8% 10px 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--text)', margin: 0 }}>
          Olá, <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{usuarioLogado?.nome}</span>! 👋
        </p>
      </div>

      <Hero />

      <FormLivro adicionarLivro={adicionarLivro} />

      <section className="biblioteca" id="biblioteca">
        <div className="topo-biblioteca">
          <h2>Biblioteca de {usuarioLogado?.nome}</h2>
          <div className="filtros">
            <button className={filtro === 'todos' ? 'filtro-ativo' : ''} onClick={() => setFiltro('todos')}>Todos</button>
            <button className={filtro === 'favorito' ? 'filtro-ativo' : ''} onClick={() => setFiltro('favorito')}>Favoritos</button>
            <button className={filtro === 'lendo' ? 'filtro-ativo' : ''} onClick={() => setFiltro('lendo')}>Lendo</button>
            <button className={filtro === 'abandonado' ? 'filtro-ativo' : ''} onClick={() => setFiltro('abandonado')}>Abandonados</button>
          </div>
        </div>

        <section className="livros">
          {livrosFiltrados.map((livro) => (
            <LivroCard 
              key={livro.id} 
              id={livro.id} 
              titulo={livro.titulo} 
              avaliacao={livro.avaliacao} 
              status={livro.status} 
              imagem={livro.imagem} 
              deletarLivro={deletarLivro} 
              editarLivro={editarLivro} 
            />
          ))}
        </section>
      </section>

      <Footer />
    </div>
  )
}

export default App