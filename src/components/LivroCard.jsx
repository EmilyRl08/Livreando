import React from 'react'

function LivroCard({ id, titulo, avaliacao, status, imagem, deletarLivro, editarLivro }) {

  function lidarComEdicao() {
    const novoTitulo = prompt("Digite o novo título do livro:", titulo)
    if (novoTitulo === null || novoTitulo.trim() === '') return

    const novaAvaliacao = prompt("Digite a nova avaliação:", avaliacao)

    const entradaStatus = prompt(
      "Digite o novo status (favorito, lendo, abandonado):", 
      status
    )

    let novoStatus = status 
    if (entradaStatus !== null) {
      const statusLimpo = entradaStatus.trim().toLowerCase()
      if (statusLimpo === 'favorito' || statusLimpo === 'lendo' || statusLimpo === 'abandonado') {
        novoStatus = statusLimpo
      } else {
        alert("Status inválido! O status não foi alterado. Use apenas: favorito, lendo ou abandonado.")
      }
    }

    editarLivro(id, {
      titulo: novoTitulo,
      avaliacao: novaAvaliacao !== null ? novaAvaliacao : avaliacao,
      status: novoStatus, 
      imagem: imagem
    })
  }

  return (
    <div className="card">
      <img
        src={imagem}
        alt={titulo}
        onError={(e) => {
          e.target.src = 'https://placehold.co/600x900/111827/ffffff?text=Livro'
        }}
      />

      <div className="card-content">
        <h3>{titulo}</h3>
        <p>{avaliacao}</p>
        
        <span className={`status ${status}`}>
          {status}
        </span>

        <div className="card-acoes" style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
          <button 
            onClick={lidarComEdicao}
            style={{
              flex: 1,
              padding: '8px 10px',
              backgroundColor: '#4c1d95',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px'
            }}
          >
            Editar
          </button>
          
          <button 
            onClick={() => deletarLivro(id)}
            style={{
              flex: 1,
              padding: '8px 10px',
              backgroundColor: '#991b1b',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px'
            }}
          >
            Apagar
          </button>
        </div>

      </div>
    </div>
  )
}

export default LivroCard