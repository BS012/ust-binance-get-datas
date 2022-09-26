import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Navbar/>
            <div className="container">
                <Home/>
                <Footer/>
            </div>
        </>
    );
}

export default App;
