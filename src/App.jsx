import AppRoutes from "./routes/AppRoutes";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";

function App ()
{
  return (

    <div className={styles.app}>
      <NavBar />
      <AppRoutes />
    </div>
 
  );
}

export default App;
