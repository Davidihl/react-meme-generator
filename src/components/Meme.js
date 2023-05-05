import styles from './Meme.module.css';

export default function Meme(meme) {
  // Show Image
  return (
    <img
      className={styles.meme}
      alt={meme.alt}
      src={meme.src}
      data-test-id="meme-image"
    />
  );
}
