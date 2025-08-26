import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextApi from './ContextApi.jsx'
import { BrowserRouter } from 'react-router-dom'
import { persistor } from './app/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ContextApi>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                <ToastContainer />
                <App />
                </PersistGate>
            </Provider>
        </ContextApi>
    </BrowserRouter>
)
