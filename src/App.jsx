import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import CoursePage from './pages/CoursePage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import ProjectPage from './pages/ProjectPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path=":courseId" element={<CoursePage />} />
        <Route path=":courseId/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
