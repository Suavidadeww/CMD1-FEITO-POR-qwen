import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './hooks/useApp';
import { PasswordModal } from './components/PasswordModal';
import CommandsPage from './pages/CommandsPage';
import ClientsPage from './pages/ClientsPage';
import MenuPage from './pages/MenuPage';
import ManagementPage from './pages/ManagementPage';

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useApp();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingPage, setPendingPage] = useState<string | null>(null);

  const handleProtectedAccess = (page: string) => {
    setPendingPage(page);
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = () => {
    if (pendingPage) {
      window.location.href = pendingPage;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <nav className="fixed bottom-0 left-0 right-0 md:left-0 md:right-auto md:top-0 md:w-64 md:h-full bg-white dark:bg-dark-card border-t md:border-t-0 md:border-r border-gray-200 dark:border-dark-border z-40">
        <div className="flex md:flex-col justify-around md:justify-start md:p-4 md:gap-2">
          <div className="hidden md:block mb-6 px-4">
            <h1 className="text-2xl font-bold text-primary-500">🌿 HookahManager</h1>
            <p className="text-xs text-gray-500 mt-1">Sistema de Gestão</p>
          </div>
          
          <a
            href="/"
            className="flex flex-col md:flex-row items-center md:gap-3 p-3 md:px-4 md:py-3 text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all"
          >
            <span className="text-xl">📋</span>
            <span className="text-xs md:text-sm font-medium mt-1 md:mt-0">Comandas</span>
          </a>
          
          <button
            onClick={() => handleProtectedAccess('/clientes')}
            className="flex flex-col md:flex-row items-center md:gap-3 p-3 md:px-4 md:py-3 text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all"
          >
            <span className="text-xl">👤</span>
            <span className="text-xs md:text-sm font-medium mt-1 md:mt-0">Clientes</span>
          </button>
          
          <button
            onClick={() => handleProtectedAccess('/cardapio')}
            className="flex flex-col md:flex-row items-center md:gap-3 p-3 md:px-4 md:py-3 text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all"
          >
            <span className="text-xl">🍽️</span>
            <span className="text-xs md:text-sm font-medium mt-1 md:mt-0">Cardápio</span>
          </button>
          
          <button
            onClick={() => handleProtectedAccess('/gestao')}
            className="flex flex-col md:flex-row items-center md:gap-3 p-3 md:px-4 md:py-3 text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all"
          >
            <span className="text-xl">📊</span>
            <span className="text-xs md:text-sm font-medium mt-1 md:mt-0">Gestão</span>
          </button>
          
          <div className="hidden md:block mt-auto pt-4 border-t border-gray-200 dark:border-dark-border">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors"
            >
              <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span className="text-sm font-medium">{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 md:hidden p-3 bg-white dark:bg-dark-card rounded-full shadow-lg z-50"
      >
        <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
      </button>

      <main className="md:ml-64 pb-20 md:pb-8 min-h-screen">
        <Routes>
          <Route path="/" element={<CommandsPage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/cardapio" element={<MenuPage />} />
          <Route path="/gestao" element={<ManagementPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPendingPage(null);
        }}
        onConfirm={handlePasswordConfirm}
        title="Área Protegida"
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout />
      </Router>
    </AppProvider>
  );
};

export default App;
