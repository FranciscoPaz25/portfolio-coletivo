import { Suspense } from 'react'
import styles from '../pages/NotFound.module.css'
import ErrorBoundary from './ErrorBoundary.jsx'

export default function TeamRoute({ team }) {
  const { Component } = team
  return (
    <ErrorBoundary key={team.id}>
      <Suspense fallback={<p className={styles.loading}>Carregando…</p>}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}
