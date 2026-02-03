import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LearnPage from './pages/LearnPage';
import ChallengesPage from './pages/ChallengesPage';
import ChallengePage from './pages/ChallengePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="learn/:lessonId" element={<LearnPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="challenge/:id" element={<ChallengePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
