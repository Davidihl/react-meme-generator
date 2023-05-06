import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import styles from './Form.module.css';

export default function Form(props) {
  const [topInput, setTopInput] = useState('');
  const [botInput, setBotInput] = useState('');
  const [memeTemplate, setMemeTemplate] = useState('aag');
  const [templates, setTemplates] = useState([]);

  // Fetch templates and store it into an array
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(props.url + 'templates');
      const templateObjects = await response.json();
      setTemplates(templateObjects);
    }

    fetchData()
      .then(() => {})
      .catch((err) => console.error(err));
  }, [props.url]);

  function getValidUrl(topText, botText) {
    if (topText) {
      if (botText) {
        return '/' + topText + '/' + botText;
      }
      return '/' + topText;
    } else if (botText) {
      return '/_/' + botText;
    } else {
      return '';
    }
  }

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        {/* Custom styled select */}
        <div className={styles.labelSelect}>
          <svg
            className={styles.labelSelectArrow}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24"
          >
            <path d="M480 684.077 267.692 471.769 296 443.461l184 184 184-184 28.308 28.308L480 684.077Z" />
          </svg>
          <label>
            Meme finder
            {/* Update id string in input field below */}
            <select
              onChange={(event) => setMemeTemplate(event.currentTarget.value)}
            >
              <option>Please select</option>
              {/* Map templates into options */}
              {templates.map((template) => {
                return (
                  <option
                    key={`template-option-${template.id}`}
                    value={template.id}
                  >
                    {template.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <label hidden>
          Meme template
          {/* input fields for meme */}
          <input
            value={memeTemplate}
            onFocus={(event) => (event.currentTarget.value = '')}
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
        <div className={styles.buttonDiv}>
          <button
            data-test-id="generate-meme"
            onClick={() => {
              // Validate inputs
              let topText = topInput;

              topText = topText.replace('/', '~s');
              topText = topText.replace(' ', '_');
              topText = topText.replace('#', '~h');
              topText = topText.replace('<', '~l');
              topText = topText.replace('>', '~g');
              topText = topText.replace('"', "'");
              topText = topText.replace('?', '~q');
              topText = topText.replace('\\', '~b');
              topText = topText.toLocaleLowerCase();

              let botText = botInput;

              botText = botText.replace('/', '~s');
              botText = botText.replace(' ', '_');
              botText = botText.replace('#', '~h');
              botText = botText.replace('<', '~l');
              botText = botText.replace('>', '~g');
              botText = botText.replace('"', "'");
              botText = botText.replace('?', '~q');
              botText = botText.replace('\\', '~b');
              botText = botText.toLowerCase();

              const validUrl = getValidUrl(topText, botText);
              console.log(validUrl);

              // Lift up alt-text and img-src
              props.setMeme({
                alt: `${memeTemplate} ${topText ? topText : ''} ${botText}`,
                src: `${props.url}images/${memeTemplate}${validUrl}.jpg`,
              });
            }}
          >
            Generate
          </button>
          {/* Download Button */}
          <button
            className={styles.downloadBtn}
            onClick={() => saveAs(props.meme.src, `${props.meme.alt}.jpg`)}
          >
            Download
          </button>
        </div>
      </form>
    </div>
  );
}
