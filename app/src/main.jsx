import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// 첫 페인트 전에 테마를 정해서 깜빡임을 없앱니다.
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
document.documentElement.dataset.theme = saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

createRoot(document.getElementById('root')).render(<App />);
