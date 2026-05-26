import { useState } from 'react'

function FormLivro({ adicionarLivro }) {

  const [titulo, setTitulo] = useState('')

  const [avaliacao, setAvaliacao] = useState('')

  const [status, setStatus] = useState('favorito')

  const [imagem, setImagem] = useState('')

  function enviar(e){

    e.preventDefault()

    if(titulo.trim() === ''){

      alert('Digite um título')

      return

    }

    adicionarLivro({

      titulo,

      avaliacao,

      status,

      imagem

    })

    // LIMPAR CAMPOS

    setTitulo('')

    setAvaliacao('')

    setStatus('favorito')

    setImagem('')

  }

  return (

    <section className="formulario">

      <h2>Adicionar Livro</h2>

      <form onSubmit={enviar}>

        <input
          type="text"
          placeholder="Título do livro"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Sua avaliação"
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >

          <option value="favorito">
            Favorito
          </option>

          <option value="lendo">
            Lendo
          </option>

          <option value="abandonado">
            Abandonado
          </option>

        </select>

        <input
          type="text"
          placeholder="Link da imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
        />

   <button type="submit">Adicionar Livro</button>

      </form>

    </section>

  )

}

export default FormLivro