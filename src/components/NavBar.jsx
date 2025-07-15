import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/">🌏 Home</Link>
            <Link to="/spacecrafts">🚀 Spacecrafts</Link>
            <Link to="/planets">🪐 Planets</Link>
        </nav>
    )

}

export default NavBar;