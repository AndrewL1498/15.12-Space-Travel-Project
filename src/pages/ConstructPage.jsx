import styles from './ConstructPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

function ConstructPage() {

    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [errorMessages, setErrorMessage] = useState([]);


    const navigate = useNavigate();

    async function handleBuild() {

        setErrorMessage([]); // Reset error messages before validation
        const errors = []; // Array to collect validation errors

        if (name.trim().length < 3) errors.push("Name must be at least 3 characters long."); // If the input name is less than 3 characters long, add an error message
        if (capacity.trim() === "") errors.push("Capacity is required."); // If the input capacity is empty, add an error message
        if (description.trim() === "") errors.push("Description is required."); // If the input description is empty, add an error message

        // If there are any errors, set the error messages state to the errors array and return
        if (errors.length > 0) {
            setErrorMessage(errors);
            return;
        }


      try {
        const res = await SpaceTravelApi.buildSpacecraft({ name, capacity, description, pictureUrl });
        if (!res.isError) {
          navigate('/spacecrafts'); // Navigate to the spacecrafts page after successful build
        } else {
          console.error("Error building spacecraft:", res.data);
        }
      } catch (error) {
        console.error("Error building spacecraft:", error);
      }
}

    return (

        <div className={styles.constructPageContainer}>

            <div className={styles.constructAndButtons}>

                <div className={styles.backButtonContainer} onClick={() => navigate('/spacecrafts')}>
                    <button className={styles.backButton}>Back</button>
                    </div>

                    <div className={styles.constructForm}>
                        {/* Input fields for spacecraft details. State gets updated every time something is typed, and the value displays the current state */}
                        <div className={styles.inputName}>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className={styles.inputCapacity}>
                            <input type="text" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)}/>
                        </div>

                        <div className={styles.inputDescription}>
                            <textarea type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>

                        <div className={styles.inputURL}>
                            <input type="text" placeholder="Picture URL (Optional)" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)}/>
                        </div>
                        
                    </div>

                    {/* If there are any error messages, map through them and display multiple list elements for each error within an unordered list element */}
                <div className={styles.errorMessageAndBuildButton}>
                    <div className={styles.errorMessage}>
                 {errorMessages.length > 0 && (
                            <ul>
                                {errorMessages.map((msg, idx) => (
                                <li key={idx}>{msg}</li>
                                                        ))}
                             </ul>
                             )}
                         </div>
    

                <div className={styles.buildButtonContainer}>
                    <button className={styles.buildButton} onClick={handleBuild}>Build</button>
                    </div>
                
                </div>


            </div>
        </div>
    )
}

export default ConstructPage;