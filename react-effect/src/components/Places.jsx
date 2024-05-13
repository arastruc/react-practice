export default function Places({ title, places, fallbackText, onSelectPlace }) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map(({ id, title, image: { src, alt } }) => (
            <li key={id} className="place-item">
              <button onClick={() => onSelectPlace(id)}>
                <img src={src} alt={alt} />
                <h3>{title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
