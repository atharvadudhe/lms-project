export default function CourseCard({ title, description }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
