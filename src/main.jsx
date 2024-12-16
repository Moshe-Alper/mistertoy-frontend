import { createRoot } from 'react-dom/client'
import { App } from './root-cmp.jsx'
// import './assets/style/main.css'
import './assets/style/main.scss'

createRoot(document.getElementById('root')).render(
    <App />
)
