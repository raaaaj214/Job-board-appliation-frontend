import { Inter } from 'next/font/google'
import './globals.css'
import Header from './_components/Header/Header'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from 'react';
import loading from './loading';
import { AuthProvider } from './_hooks/authContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'apply to jobs',
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="en" className='overflow-auto'>
      <body className='overflow-x-hidden' >
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="dark"
        />
        <AuthProvider>
        <Header/>
        {children}
        </AuthProvider>
        </body>
    </html>
  )
}
