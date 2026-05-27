import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';

import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AdminPage from '@/pages/admin/Page';
import AdminLayout from '@/pages/admin/Layout';

// Shell that selectively renders Navbar, Footer, and Floating WhatsApp
const AppShell = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHomeRoute = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollToTop />
      <Navbar />
      <main className={`flex-grow ${isHomeRoute ? 'pt-[15px]' : 'pt-[80px]'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          } />
        </Routes>
      </main>
      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppShell />
    </Router>
  );
};

export default App;
