import { useState } from 'react';
import Form from './components/Form';
import Meme from './components/Meme';

export default function App() {
  // Define global variables
  const url = 'https://api.memegen.link/templates/';
  // Define required useStates
  const [meme, setMeme] = useState({
    alt: 'Memes everwhere',
    src: 'https://api.memegen.link/images/buzz/memes/memes_everywhere.gif',
  });
  const [topText, setTopText] = useState('');
  const [botText, setBotText] = useState('');

  // Return
  return (
    <>
      <Meme alt={meme.alt} src={meme.src} topText={topText} />
      <Form
        topText={topText}
        setTopText={setTopText}
        botText={botText}
        setBotText={setBotText}
        url={url}
      />
      <div> It works</div>
      <button
        onClick={() => {
          console.log(topText);
          console.log(botText);
        }}
      >
        App Debug
      </button>
    </>
  );
}
