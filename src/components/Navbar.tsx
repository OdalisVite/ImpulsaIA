import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X, Rocket } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavLink {
  id: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'perfil', label: 'Perfil' },
  { id: 'comparador', label: 'Comparador' },
  { id: 'cv', label: 'Currículum' },
  { id: 'entrevistas', label: 'Entrevistas' },
  { id: 'plan', label: 'Plan' },
  { id: 'oportunidades', label: 'Oportunidades' },
  { id: 'asistente', label: 'Asistente IA' },
  { id: 'faq', label: 'FAQ' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/85 dark:bg-navy-950/85 backdrop-blur-md border-b border-navy-100/70 dark:border-navy-800/70'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-shell flex items-center justify-between h-16 sm:h-18">
        {/* Logo */}
        <button onClick={() => handleNav('inicio')} className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-2xl bg-navy-700 dark:bg-lilac-600 text-white shadow-soft group-hover:scale-105 transition-transform">
            <Rocket className="w-5 h-5" />
          </span>
          <span className="font-display font-extrabold text-lg text-navy-900 dark:text-cream-50 tracking-tight">
            Impulsa<span className="text-lilac-500">IA</span>
          </span>
        </button>

        {/* Links desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className="px-3.5 py-2 rounded-full text-sm font-medium text-navy-700 dark:text-cream-200 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="grid place-items-center w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-cream-200 hover:border-lilac-400 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => handleNav('perfil')}
            className="hidden sm:inline-flex btn-primary text-sm px-5 py-2.5"
          >
            Comenzar
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-cream-200"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="lg:hidden section-shell pb-4">
          <ul className="card p-2 grid grid-cols-2 gap-1 animate-fade-up">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className="w-full text-left px-4 py-3 rounded-2xl text-sm font-medium text-navy-700 dark:text-cream-200 hover:bg-navy-100 dark:hover:bg-navy-700 transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="col-span-2 mt-1">
              <button onClick={() => handleNav('perfil')} className="btn-primary w-full">
                Comenzar
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
