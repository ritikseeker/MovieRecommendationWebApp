function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Movie Recommendation App
        </div>
        <div>
          <a href="#" className="text-gray-300 hover:text-white mx-2">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
