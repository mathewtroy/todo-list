import { useState } from "react";
import showIcon from "../assets/show-icon.svg";
import hideIcon from "../assets/hide-icon.svg";

export default function PasswordField({
  id,
  label = "Password",
  value,
  onChange,
  placeholder = "••••••••",
  required = true,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="form__group input-group">
      <label htmlFor={id} className="form__label">{label}</label>
      <input
        id={id}
        type={show ? "text" : "password"}
        className="input input-with-toggle"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
      >
        <img
          src={show ? hideIcon : showIcon}
          alt=""
          className="toggle-icon"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
