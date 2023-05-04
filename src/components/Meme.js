export default function Meme(meme) {
  return <img alt={meme.alt} src={meme.src} data-test-id="meme-image" />;
}
