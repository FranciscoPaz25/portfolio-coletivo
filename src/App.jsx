import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import TeamRoute from './components/TeamRoute.jsx'
import { teams } from './data/teamsConfig.js'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {teams.map((team) => (
          <Route key={team.id} path={`${team.path}/*`} element={<TeamRoute team={team} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
