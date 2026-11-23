import { lazy } from 'react'
import info00 from '../teams/equipe-00/info.js'
import info01 from '../teams/equipe-01/info.js'
import info02 from '../teams/equipe-02/info.js'
import info03 from '../teams/equipe-03/info.js'
import info04 from '../teams/equipe-04/info.js'
import info05 from '../teams/equipe-05/info.js'

// Registro oficial das equipes e rotas (mantido pela Equipe Base).
// O Header, os cards da Home e as rotas são gerados a partir desta lista.
// Equipe nova: copie uma pasta em src/teams/ e adicione uma linha aqui.
export const teams = [
  { id: 'equipe-00', path: '/equipe-00', info: info00, isBase: true, Component: lazy(() => import('../teams/equipe-00/index.jsx')) },
  { id: 'equipe-01', path: '/equipe-01', info: info01, isBase: false, Component: lazy(() => import('../teams/equipe-01/index.jsx')) },
  { id: 'equipe-02', path: '/equipe-02', info: info02, isBase: false, Component: lazy(() => import('../teams/equipe-02/index.jsx')) },
  { id: 'equipe-03', path: '/equipe-03', info: info03, isBase: false, Component: lazy(() => import('../teams/equipe-03/index.jsx')) },
  { id: 'equipe-04', path: '/equipe-04', info: info04, isBase: false, Component: lazy(() => import('../teams/equipe-04/index.jsx')) },
  { id: 'equipe-05', path: '/equipe-05', info: info05, isBase: false, Component: lazy(() => import('../teams/equipe-05/index.jsx')) },
]
