import React from "react";

export function InputField({ label, value, onChange }) {
  return (
    <div className="flex flex-col mt-12 w-[490px]">
      <label htmlFor={label} className="mb-2 text-sm">
        {label}
      </label>
      <input
        type="text"
        id={label}
        value={value}
        placeholder="Ex. 0122041"
        onChange={onChange}
        className="h-12 shadow-lg bg-white bg-opacity-20 rounded-md pl-2 outline-none w-full"
      />
    </div>
  );
}