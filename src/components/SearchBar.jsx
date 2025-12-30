export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full flex justify-center my-6">
      <input
        type="text"
        placeholder="Search for a tablet..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 p-3 rounded-lg border border-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}