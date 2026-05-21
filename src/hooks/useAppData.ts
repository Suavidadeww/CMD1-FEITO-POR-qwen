import { useState, useEffect } from 'react';
import { menuItems as initialMenuItems, clients as initialClients, generateDailyStats, generateCommands } from '../data/mockData';
import { MenuItem, Client, Command, DailyStats } from '../types';

const STORAGE_KEY = 'hookah-manager-data';

interface StoredData {
  menuItems: MenuItem[];
  clients: Client[];
  commands: Command[];
  dailyStats: DailyStats[];
}

export const useAppData = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [commands, setCommands] = useState<Command[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data: StoredData = JSON.parse(stored);
        setMenuItems(data.menuItems || initialMenuItems);
        setClients(data.clients || initialClients);
        setCommands(data.commands || []);
        setDailyStats(data.dailyStats || generateDailyStats());
      } catch (e) {
        console.error('Error loading stored data:', e);
        setCommands(generateCommands());
        setDailyStats(generateDailyStats());
      }
    } else {
      setCommands(generateCommands());
      setDailyStats(generateDailyStats());
    }
    
    // Load theme
    const storedTheme = localStorage.getItem('hookah-theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
    
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;
    
    const data: StoredData = {
      menuItems,
      clients,
      commands,
      dailyStats,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [menuItems, clients, commands, dailyStats, isLoaded]);

  // Update theme class on document
  useEffect(() => {
    localStorage.setItem('hookah-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Menu operations
  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, item]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  // Client operations
  const addClient = (client: Client) => {
    setClients(prev => [...prev, client]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updates } : client
    ));
  };

  // Command operations
  const openCommand = (command: Command) => {
    setCommands(prev => [...prev, command]);
  };

  const updateCommand = (id: string, updates: Partial<Command>) => {
    setCommands(prev => prev.map(cmd => 
      cmd.id === id ? { ...cmd, ...updates } : cmd
    ));
  };

  const closeCommand = (id: string) => {
    setCommands(prev => prev.map(cmd => 
      cmd.id === id ? { ...cmd, status: 'closed', closedAt: new Date().toISOString() } : cmd
    ));
  };

  const deleteCommand = (id: string) => {
    setCommands(prev => prev.filter(cmd => cmd.id !== id));
  };

  // Getters
  const getOpenCommands = () => commands.filter(cmd => cmd.status === 'open');
  const getClosedCommands = () => commands.filter(cmd => cmd.status === 'closed');
  const getTodayCommands = () => {
    const today = new Date().toISOString().split('T')[0];
    return commands.filter(cmd => cmd.openedAt.startsWith(today));
  };

  const getClientById = (id: string) => clients.find(c => c.id === id);
  const getMenuItemById = (id: string) => menuItems.find(i => i.id === id);

  return {
    menuItems,
    clients,
    commands,
    dailyStats,
    theme,
    isLoaded,
    toggleTheme,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addClient,
    updateClient,
    openCommand,
    updateCommand,
    closeCommand,
    deleteCommand,
    getOpenCommands,
    getClosedCommands,
    getTodayCommands,
    getClientById,
    getMenuItemById,
  };
};
