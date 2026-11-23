import { Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary.jsx'

export default function TeamRoute({ team }) {
  const { Component } = team
  return (
    <ErrorBoundary key={team.id}>
      <Suspense fallback={<p style={{ padding: '2rem 1rem', textAlign: 'center' }}>Carregando…</p>}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}
