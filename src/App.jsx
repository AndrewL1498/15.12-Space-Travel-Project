import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";

function App ()
{
  return (
  <BrowserRouter>
    <div className={styles.app}>
      <NavBar />
      <AppRoutes />
    </div>
  </BrowserRouter>
  );
}

export default App;
