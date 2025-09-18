export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">LMS</h1>
      <div>
        <button className="hover:underline">Logout</button>
      </div>
    </nav>
  );
}
