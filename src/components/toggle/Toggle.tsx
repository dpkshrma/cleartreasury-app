import React from "react";

export type ToggleProps = {
  id: string;
  checked: boolean;
  onChange?: any;
  name?: string;
  disabled?: boolean;
};

const Toggle = ({
  id,
  name,
  checked,
  onChange,
  disabled,
}: ToggleProps): JSX.Element => {
  return (
    <div>
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={`block w-14 h-8 rounded-full ${
              checked ? "bg-navy-600" : "bg-navy-300"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
              checked ? "transform translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Toggle;
