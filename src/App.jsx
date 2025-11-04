import Navbar from "./components/navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Applayout from "./components/AppLayout/Applayout";
import Projects from "./components/MyProjects/Projects";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  
  return (
    <>
      <Navbar />
      <Applayout>
        <Hero />
        <About />
        <Projects />
        <Footer/>
      </Applayout>
    </>
  );
}

export default App;
