import { useEffect, useState } from 'react';
import styles from './GenerateMeme.modules.css';

export default function GenerateMeme(props) {
  const [topInput, setTopInput] = useState('');
  const [botInput, setBotInput] = useState('');
  const [templates, setTemplates] = useState([]);
  const [meme, setMeme] = useState('');

  useEffect(() => {
    const getTemplates = async () => {
      const response = await fetch(props.url);
      const templateObject = await response.json();
      setTemplates(templateObject);
    };

    getTemplates()
      .then(() => {})
      .catch((err) => console.error(err));
  }, [props.url]);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        Meme Finder
        <select selected>
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
        <input />
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
      <button
        onClick={() => {
          props.setTopText(topInput);
          console.log(templates);
          props.setBotText(botInput);
        }}
      >
        Generate
      </button>
      <button>Download</button>
      <button
        onClick={() => {
          console.log('debug');
          console.log(templates);
        }}
      >
        GenerateMeme Debug
      </button>
    </form>
  );
}
