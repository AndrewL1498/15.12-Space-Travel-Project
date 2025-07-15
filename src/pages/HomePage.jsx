import styles from './HomePage.module.css';

function HomePage() {
return ( 
<div className={styles.homePage}>

    <h1>Space Travel: Expanding Horizons Beyond Earth</h1>

 <div className={styles.sectionWrapper}>
        <h2>☑ Journey Into The Future</h2>
        <div className={styles.section}>
          <p>In a world where the impossible has become reality, where the stars are no longer out of reach, welcome to the future of humanity's survival and exploration. Witness the evolution of technology as it transforms barren planets into thriving havens, all made possible by the wonder of innovation and human determination.</p>
        </div>
      </div>

   <div className={styles.sectionWrapper}>
        <h2>🌎From Neglect To Innovation</h2>
        <div className={styles.section}>
          <p>Once the cradle of civilization, Earth now stands as a solemn reminder of the consequences of neglect and environmental decline. But fear not, for the ingenuity of mankind has soared to new heights. With our relentless pursuit of advancement, we have not only healed our scars but extended our reach across the cosmos.</p>
        </div>
      </div>

      <div className={styles.sectionWrapper}>
        <h2>🚀Enter Space Travel: When Dreams Take Flight</h2>
        <div className={styles.section}>
          <p>Embark on an extraordinary journey with our groundbreaking web application, aptly named "Space Travel." As a commander engineer, the fate of humanity's exodus rests in your capable hands. Prepare to face the ultimate challenge. evacuating humankind from their birthplace and guiding them toward s afuture among the stars.</p>
        </div>
      </div>

     <div className={styles.sectionWrapper}>
        <h2>🔧Engineer. Explorer. Leader.</h2>
        <div className={styles.section}>
          <p>Space Travel empowers you to engineer, design, and even dismantle spacecraft. Craft vessels that defy the boundaries of imagination, envisioning a future where life flourishes beyond the stars. But remember, your role extends beyond construction - you are a leader, and explorer, a commander steering humanity's destiny.</p>
        </div>
      </div>

     <div className={styles.sectionWrapper}>
        <h2>⭐A Universe Of Possibilities Awaits</h2>
        <div className={styles.section}>
          <p>Immerse yourself in the thrill of exploration as you chart interplanetary courses within our solar system. Seamlessly navigate your fleet of spacecraft, hurtling through the cosmic void from one celestial body to another. The universe becomes your playground, and every planet a potential new home.</p>
        </div>
      </div>


</div>

)}

export default HomePage;