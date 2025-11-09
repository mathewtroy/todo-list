export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader">
      <div className="loader__spin" aria-hidden="true"></div>
      <span>{text}</span>
    </div>
  );
}
