import { Component } from 'react'
import { Link } from 'react-router-dom'

/** Isola erros: se a página de uma equipe quebrar, só ela mostra o aviso. */
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Erro na página da equipe:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1rem' }}>
          <p>Esta página encontrou um erro. As outras equipes continuam funcionando.</p>
          <p>
            <Link to="/">Voltar para o início</Link>
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
