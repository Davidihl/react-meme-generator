import { useState } from 'react';
import styles from './App.module.css';
import Form from './components/Form';
import Meme from './components/Meme';

export default function App() {
  // Define global variables
  const url = 'https://api.memegen.link/';
  // Define required useStates
  const [meme, setMeme] = useState({
    alt: 'Memes everywhere',
    src: 'https://api.memegen.link/images/buzz/memes/memes_everywhere.gif',
  });
  const [topText, setTopText] = useState('');
  const [botText, setBotText] = useState('');

  // Return
  return (
    <div className={styles.appContainer}>
      <div className={styles.app}>
        <Meme alt={meme.alt} src={meme.src} topText={topText} />
        <Form
          topText={topText}
          setTopText={setTopText}
          botText={botText}
          setBotText={setBotText}
          setMeme={setMeme}
          meme={meme}
          url={url}
        />
      </div>
    </div>
  );
}
