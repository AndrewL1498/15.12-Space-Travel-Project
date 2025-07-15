import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SpacecraftsPage.module.css';
import SpaceTravelApi from '../services/SpaceTravelApi';
import Loader from '../components/Loader.jsx';
import SpacecraftCard from '../components/SpacecraftCard.jsx';


function SpacecraftsPage() {
    const navigate = useNavigate();
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSpacecrafts() {
            try {
                const res = await SpaceTravelApi.getSpacecrafts();
               if (!res.isError) {
                 setSpacecrafts(res.data); //If response.error is false, set space crafts to the data contained within getSpacecrafts
               } else {
                 console.error("Error fetching spacecrafts:", res.data);
               }
            } catch (error) {
                console.error("Error fetching spacecrafts:", error);
            } finally {
                setLoading(false); //Once the async function finishes running, whether an error occurs or data is retrieved, set loading to false
            } 
        }
        fetchSpacecrafts();
    },[])

  async function destroySpacecraft(id) {
    try {
      const res = await SpaceTravelApi.destroySpacecraftById({ id });
      if (!res.isError) {
        setSpacecrafts(spacecrafts.filter(s => s.id !== id)); // If there is no error, create an array of spacecrafts that does not include the spacecraft that was destroyed
      } else {
        console.error("Error destroying spacecraft:", res.data);
      }
    } catch (error) {
      console.error("Error destroying spacecraft:", error);
    }
  }

    return (
        <div className={styles.pageContainer}>
            {loading ? ( 
                <Loader />
            ) : ( // If loading is true, show the loader, otherwise show the spacecrafts
              
            <div className={styles.cardSection}>
              <div className={styles.buildButtonWrapper}>
                <button className={styles.buildASpacecraftButton} onClick={() => navigate('/construct')}>Build A Spacecraft</button>
             </div>

            {spacecrafts.map((spacecraft) => ( // Map through the spacecrafts array and render a SpacecraftCard for each spacecraft
              <SpacecraftCard
                key={spacecraft.id}
                spacecraft={spacecraft} // Pass the spacecraft object to the SpacecraftCard component
                onDestroy={destroySpacecraft} // Pass the destroySpacecraft function to the SpacecraftCard component
              />                            
            ))}
          </div>
        )}
    </div>
  );
}

export default SpacecraftsPage;
