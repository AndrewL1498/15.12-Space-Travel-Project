import styles from './SpacecraftCard.module.css';
import { useNavigate } from 'react-router-dom';
import FallBackImage from './FallbackImage.jsx'; // Assuming you have a fallback image component


function SpacecraftCard ({ spacecraft, onDestroy }) {
 const navigate = useNavigate();


return (
    <div className={styles.spacecraftCard}>
        <div> {/* Render the spacecraft image with a fallback option */ }
                <FallBackImage
                    src={spacecraft.pictureUrl}
                    className={styles.spacecraftImage}
                    onClick={() => navigate(`/spacecrafts/${spacecraft.id}`)}
                />
        </div>
            
            <div className={styles.spacecraftDetails}>
            <p>Name: {spacecraft.name}</p>
            <p>Capacity: {spacecraft.capacity}</p>
            </div>
        

            <div className={styles.destroyButtonContainer}>
                <button className={styles.destroyButton} onClick={() => onDestroy(spacecraft.id)}>💥Destroy</button>
            </div>
        </div>
    );
}

export default SpacecraftCard;