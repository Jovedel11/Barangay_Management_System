import React from "react";

export const RadioGroup = ({ value, onChange, children, className = "" }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => onChange(child.props.value),
        })
      )}
    </div>
  );
};

export const RadioGroupItem = ({ value, checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <span
        className={`w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center
          peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-300`}
      >
        {checked && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
      </span>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};
