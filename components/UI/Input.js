export default function Input({ label, type, value, onChange }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border p-2 rounded"
      />
    </div>
  );
}
