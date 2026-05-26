function Header({ darkMode, setDarkMode, setLogado }) {

  function scrollPara(id) {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8%', width: '100%' }}>
      <div className="logo">
        <h1>Livreando</h1>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button 
          onClick={() => scrollPara('hero')} 
          style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          Início
        </button>

        <button 
          onClick={() => scrollPara('biblioteca')} 
          style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          Biblioteca
        </button>

        <button 
          onClick={() => setLogado(false)} 
          style={{ whiteSpace: 'nowrap', color: '#ef4444', fontWeight: '500', cursor: 'pointer' }}
        >
          Mudar Conta
        </button>
      </nav>

      <button
        className="mode"
        onClick={() => setDarkMode(!darkMode)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  )
}

export default Header