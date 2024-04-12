import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import { ChatContextProvider } from './context/ChatContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ChakraProvider>
   <ChatContextProvider>
      <App />
    </ChatContextProvider> 
    </ChakraProvider>
  </React.StrictMode>,
)
