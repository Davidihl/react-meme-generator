import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import styles from './Form.module.css';

export default function Form(props) {
  const [topInput, setTopInput] = useState('');
  const [botInput, setBotInput] = useState('');
  const [memeTemplate, setMemeTemplate] = useState('aag');
  const [templates, setTemplates] = useState([]);

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

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Meme finder
          <select
            onChange={(event) => setMemeTemplate(event.currentTarget.value)}
          >
            <option>Please select</option>
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
        <label>
          Meme template
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
              props.setTopText(topInput);
              props.setBotText(botInput);
              props.setMeme({
                alt: `${memeTemplate} ${
                  props.topText ? props.topText + ' ' : ''
                }${props.botText}`,
                src: `${props.url}${memeTemplate}/${
                  topInput ? topInput + '/' : '_/'
                }${botInput}.jpg`,
              });
            }}
          >
            Generate
          </button>
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
