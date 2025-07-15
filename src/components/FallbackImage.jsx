import { useState } from 'react';
import styles from './FallbackImage.module.css'; 

function FallBackImage ({ src, fallbackEmoji = "🚀", className, ...props}) { //Passed props to collect any other parameters. In this case, we only have onClick
    const [imageError, setImageError] = useState(false);

    const isValidUrl = (url) => { //Function to check if the pictureUrl is a valid URL
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    if (!src || imageError || !isValidUrl(src)) { // If there is no src, if the imageError is true, or if the src is not a valid URL, show the fallback emoji, but if they are all false, show the image

        return (
            <div className={`${styles.spacecraftEmoji} ${className || ''}`} onClick={props.onClick}> {/* Applies styling from both SpacecraftCard CSS and the FallbackImage CSS to the emoji*/}
                {fallbackEmoji}
            </div>
        );

    }

    console.log((props.onClick))

    return (

        // Passes the props down if the image loads successfully. Sets imageError to true if the image fails to load then re-renders the component to replace the image with an emoji
        <img
            src={src}
            className={className}
            onError={() => setImageError(true)}  
            {...props}
        />
    );

}

export default FallBackImage;