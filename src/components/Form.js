import { d, useState } from 'react';

export default function Form(props) {
  const [topInput, setTopInput] = useState('');
  const [botInput, setBotInput] = useState('');
  const [memeTemplate, setMemeTemplate] = useState('aag');

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        Meme template
        <input
          value={memeTemplate}
          onChange={(event) => {
            setMemeTemplate(event.currentTarget.value);
          }}
        />
      </label>
      <label>
        Top text
        <input
          placeholder="Text shown on top"
          value={topInput}
          onChange={(event) => {
            setTopInput(event.currentTarget.value);
          }}
        />
      </label>
      <label>
        Bottom text
        <input
          placeholder="Text shown on bottom"
          value={botInput}
          onChange={(event) => setBotInput(event.currentTarget.value)}
        />
      </label>
      <div className="buttonDiv">
        <button
          onClick={() => {
            props.setTopText(topInput);
            props.setBotText(botInput);
            props.setMeme({
              alt: `${memeTemplate} ${
                props.topText ? props.topText + ' ' : ''
              }${props.botText}`,
              src: `${props.url}${memeTemplate}/${
                props.topText ? props.topText + '/' : '_/'
              }${props.botText}`,
            });
            console.log(props.meme);
          }}
        >
          Generate
        </button>
        <button className="downloadBtn" id="hallo">
          Download
        </button>
      </div>
      <button
        onClick={() => {
          console.log(props.meme);
        }}
      >
        GenerateMeme Debug
      </button>
    </form>
  );
}
