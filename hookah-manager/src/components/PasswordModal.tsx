import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  title?: string;
}

const CORRECT_PASSWORD = 'suasenha';

export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Área Protegida',
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onConfirm(password);
      setPassword('');
      setError(false);
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Digite a senha para acessar esta área.
          </p>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            autoFocus
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              error 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 dark:border-dark-border focus:border-primary-500'
            } bg-white dark:bg-dark-bg text-gray-900 dark:text-white outline-none transition-colors`}
          />
          
          {error && (
            <p className="mt-2 text-sm text-red-500 animate-pulse">Senha incorreta!</p>
          )}
          
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
};
