import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-gray-50 border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Checkpoint : frontend</h1>
        <Link 
          to="/" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Countries
        </Link>
      </div>
    </header>
  );
}
