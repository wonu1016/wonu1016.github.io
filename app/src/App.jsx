import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Career from './components/Career.jsx';
import Contact from './components/Contact.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useSpecular } from './hooks/useSpecular.js';
import { useReveal } from './hooks/useReveal.js';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useSpecular();
  useReveal();
  return (
    <>
      <Nav theme={theme} onToggle={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <Projects />
        <Career />
        <Contact />
        <footer>© 2026 양원우</footer>
      </main>
    </>
  );
}
