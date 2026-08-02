function Input({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">
        {label}
      </label>

      <input
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder={placeholder}
        type={type}
        name={name}          // ✅ Added
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