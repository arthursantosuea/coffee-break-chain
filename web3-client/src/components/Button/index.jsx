import React from "react";

export function Button({ name, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="h-12 min-w-[490px] mt-8 bg-light-red rounded-md hover:bg-hover-red transition-colors shadow-lg disabled:cursor-not-allowed disabled:bg-white disabled:bg-opacity-20 disabled:text-gray-400"
    >
      {name}
    </button>
  );
}