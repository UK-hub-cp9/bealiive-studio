import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showreel from './components/Showreel';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import AllWork from './components/AllWork';

// Simple path-based routing without react-router
const isAllWork = window.location.pathname === '/all-work';

export default function App() {
  if (isAllWork) {
    return (
      <>
        <CustomCursor />
        <AllWork />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Showreel />
      <About />
      <Projects />
      <Footer />
    </>
  );
}
