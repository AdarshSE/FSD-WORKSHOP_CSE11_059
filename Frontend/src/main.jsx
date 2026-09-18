// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import API_Tester from './component/API_Tester.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <API_Tester />
  </StrictMode>,
)
