
function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>

      <input
        className="border rounded w-full p-2"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;