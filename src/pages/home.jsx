import Footer from "../component/footer";
import Navbar from "../component/navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-indigo-800">Welcome to MediaBookmarkHub</h1>
          <p className="text-indigo-600 mt-4">Organize and save your favorite media easily!</p>
        </div>
        {/* Add more homepage content here */}
      </main>
      <Footer />
    </>
  );
};

export default Home;
