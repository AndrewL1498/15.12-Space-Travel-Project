import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ConstructPage from '../pages/ConstructPage';
import PlanetsPage from '../pages/PlanetsPage';
import SingleSpacecraftPage from '../pages/SingleSpacecraftPage';
import SpacecraftsPage from '../pages/SpacecraftsPage';

function AppRoutes () {
    return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spacecrafts" element={<SpacecraftsPage />} />
      <Route path="/spacecrafts/:id" element={<SingleSpacecraftPage />} />
      <Route path="/construct" element={<ConstructPage />} />
      <Route path="/planets" element={<PlanetsPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default AppRoutes;