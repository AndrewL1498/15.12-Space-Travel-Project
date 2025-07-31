import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import Loader from '../components/Loader.jsx';
import styles from './SingleSpacecraftPage.module.css';
import FallBackImage from '../components/FallbackImage.jsx'; // Assuming you have a fallback image component


function SingleSpacecraftPage() {
    const { id } = useParams();
    const [spacecraft, setSpacecraft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchSpacecraft () {
            try {
                const res = await SpaceTravelApi.getSpacecraftById({ id });
                if (!res.isError) {
                    setSpacecraft(res.data);
                } else {
                    console.error("Error fetching spacecraft:", res.data);
                }
            } catch (error) {
                console.error("Error fetching spacecraft:", error);
                setError("Failed to load spacecraft. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchSpacecraft();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>
    if (!spacecraft) return <p>No spacecraft found.</p>;

    return (
    <div className = {styles.singleSpacecraftPage}>

       
     <FallBackImage
                    src={spacecraft.pictureUrl}
                    alt={spacecraft.name}
                    className={styles.spacecraftImage}
                    disableHover={true}
                />
        
        <div className={styles.spacecraftContent}>
            <div className={styles.spacecraftNameAndCapacity}>
                <p>{spacecraft.name}</p>
                <p>Capacity: {spacecraft.capacity}</p>
            </div>

            <div className={styles.spacecraftDescription}>
                <h3>Description:</h3>
                <p>{spacecraft.description}</p>
            </div>
        </div>
    </div>
    );
}

export default SingleSpacecraftPage;
