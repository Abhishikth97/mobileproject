import React, { createContext, useContext, useState, useEffect } from 'react';

export type Priority = 'High' | 'Med' | 'Low';
export type TaskStatus = 'pending' | 'completed' | 'in-progress';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  category: string;
  status: TaskStatus;
  assignee: string;
  favorite: boolean;
  subtasks: Subtask[];
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'reminder' | 'success' | 'warning' | 'info';
}

export interface UserSettings {
  darkMode: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  autoLanguage: boolean;
}

export interface User {
  username: string;
  email: string;
  isPro: boolean;
  streak: number;
}

// ── Mock credential store ──────────────────────────────────────────────────────
const VALID_USERS: { email: string; password: string; username: string }[] = [
  { email: 'abhishikth@example.com', password: 'abhishikth123', username: 'Abhishikth' },
  { email: 'admin@tasktrack.com',    password: 'admin123',       username: 'Admin' },
  { email: 'demo@tasktrack.com',     password: 'demo123',        username: 'Demo User' },
];

// ── LocalStorage helpers ───────────────────────────────────────────────────────
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ignore quota errors */ }
}

// ── Seed data ──────────────────────────────────────────────────────────────────
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design homepage mockup',
    description: 'Create a detailed wireframe and high-fidelity mockup for the new company homepage. Include responsive layouts for desktop, tablet, and mobile screens.',
    dueDate: 'Mar 22, 2026',
    priority: 'High',
    category: 'Design',
    status: 'in-progress',
    assignee: 'Abhishikth',
    favorite: true,
    createdAt: 'Mar 18, 2026',
    subtasks: [
      { id: 's1', title: 'Gather requirements', completed: true },
      { id: 's2', title: 'Create wireframe sketches', completed: true },
      { id: 's3', title: 'Build high-fidelity mockup', completed: false },
      { id: 's4', title: 'Get team approval', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and approve pending pull requests from the frontend team. Ensure code quality and provide constructive feedback.',
    dueDate: 'Tomorrow',
    priority: 'Med',
    category: 'Development',
    status: 'pending',
    assignee: 'Abhishikth',
    favorite: false,
    createdAt: 'Mar 19, 2026',
    subtasks: [
      { id: 's1', title: 'Review PR #42', completed: false },
      { id: 's2', title: 'Review PR #43', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update API documentation to reflect recent endpoint changes and add examples for new features.',
    dueDate: 'Mar 22, 2026',
    priority: 'Low',
    category: 'Writing',
    status: 'completed',
    assignee: 'Abhishikth',
    favorite: false,
    createdAt: 'Mar 15, 2026',
    subtasks: [],
  },
  {
    id: '4',
    title: 'Team standup meeting',
    description: 'Daily standup to discuss progress, blockers, and plans for the day with the development team.',
    dueDate: 'Today',
    priority: 'High',
    category: 'Team',
    status: 'pending',
    assignee: 'Abhishikth',
    favorite: false,
    createdAt: 'Mar 20, 2026',
    subtasks: [],
  },
  {
    id: '5',
    title: 'Q1 planning document',
    description: 'Compile and finalize the Q1 roadmap document with department goals, KPIs, and milestones.',
    dueDate: 'Mar 30, 2026',
    priority: 'Med',
    category: 'Planning',
    status: 'completed',
    assignee: 'Abhishikth',
    favorite: true,
    createdAt: 'Mar 10, 2026',
    subtasks: [],
  },
  {
    id: '6',
    title: 'Client presentation deck',
    description: 'Prepare the slide deck for the upcoming client meeting. Include project progress, next steps, and budget overview.',
    dueDate: 'Mar 25, 2026',
    priority: 'High',
    category: 'Work',
    status: 'pending',
    assignee: 'Abhishikth',
    favorite: true,
    createdAt: 'Mar 17, 2026',
    subtasks: [
      { id: 's1', title: 'Outline slide structure', completed: true },
      { id: 's2', title: 'Add project metrics', completed: false },
    ],
  },
  {
    id: '7',
    title: 'Weekly retrospective notes',
    description: 'Document key takeaways, improvements, and action items from the weekly team retrospective session.',
    dueDate: 'Mar 21, 2026',
    priority: 'Low',
    category: 'Team',
    status: 'completed',
    assignee: 'Abhishikth',
    favorite: true,
    createdAt: 'Mar 14, 2026',
    subtasks: [],
  },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'Task due tomorrow',
    message: '"Design homepage mockup" is due tomorrow. Stay on track!',
    time: '2h ago',
    read: false,
    type: 'reminder',
  },
  {
    id: '2',
    title: 'Task completed',
    message: '"Update documentation" was successfully marked as complete.',
    time: '5h ago',
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'New task assigned',
    message: 'You have been assigned "Client presentation deck".',
    time: '1d ago',
    read: true,
    type: 'info',
  },
  {
    id: '4',
    title: 'Weekly progress',
    message: 'You completed 5 of 12 tasks this week. Keep going!',
    time: '1d ago',
    read: true,
    type: 'info',
  },
  {
    id: '5',
    title: 'Overdue task',
    message: '"Team standup meeting" was not marked complete yesterday.',
    time: '2d ago',
    read: true,
    type: 'warning',
  },
];

const INITIAL_USER: User = {
  username: 'Abhishikth',
  email: 'abhishikth@example.com',
  isPro: true,
  streak: 7,
};

const INITIAL_SETTINGS: UserSettings = {
  darkMode: false,
  pushNotifications: true,
  emailNotifications: false,
  autoLanguage: true,
};

// ── Context types ──────────────────────────────────────────────────────────────
interface AppContextType {
  isAuthenticated: boolean;
  user: User;
  tasks: Task[];
  notifications: AppNotification[];
  settings: UserSettings;
  /** Returns an error string on failure, or null on success */
  login: (email: string, password: string) => string | null;
  logout: () => void;
  /** Returns an error string on failure, or null on success */
  signup: (username: string, email: string, password: string, confirm: string) => string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  triggerTestNotification: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

// ── Email validator ────────────────────────────────────────────────────────────
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ── Provider ───────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => loadFromStorage<boolean>('ott_auth', false)
  );
  const [user, setUser] = useState<User>(
    () => loadFromStorage<User>('ott_user', INITIAL_USER)
  );
  const [tasks, setTasks] = useState<Task[]>(
    () => loadFromStorage<Task[]>('ott_tasks', INITIAL_TASKS)
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(
    () => loadFromStorage<AppNotification[]>('ott_notifications', INITIAL_NOTIFICATIONS)
  );
  const [settings, setSettings] = useState<UserSettings>(
    () => loadFromStorage<UserSettings>('ott_settings', INITIAL_SETTINGS)
  );

  // Persist to localStorage whenever state changes
  useEffect(() => { saveToStorage('ott_auth', isAuthenticated); }, [isAuthenticated]);
  useEffect(() => { saveToStorage('ott_user', user); }, [user]);
  useEffect(() => { saveToStorage('ott_tasks', tasks); }, [tasks]);
  useEffect(() => { saveToStorage('ott_notifications', notifications); }, [notifications]);
  useEffect(() => { saveToStorage('ott_settings', settings); }, [settings]);

  // ── Auth actions ─────────────────────────────────────────────────────────────
  const login = (email: string, password: string): string | null => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass  = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      return 'Please enter both email and password.';
    }
    if (!isValidEmail(trimmedEmail)) {
      return 'Please enter a valid email address.';
    }
    if (trimmedPass.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    const match = VALID_USERS.find(
      u => u.email.toLowerCase() === trimmedEmail && u.password === trimmedPass
    );

    if (!match) {
      return 'Invalid email or password. Please try again.';
    }

    setUser({ username: match.username, email: match.email, isPro: true, streak: 7 });
    setIsAuthenticated(true);
    return null; // success
  };

  const logout = () => {
    setIsAuthenticated(false);
    saveToStorage('ott_auth', false);
  };

  const signup = (
    username: string,
    email: string,
    password: string,
    confirm: string
  ): string | null => {
    const trimmedUser  = username.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass  = password.trim();

    if (!trimmedUser || !trimmedEmail || !trimmedPass || !confirm.trim()) {
      return 'All fields are required.';
    }
    if (trimmedUser.length < 3) {
      return 'Username must be at least 3 characters.';
    }
    if (!isValidEmail(trimmedEmail)) {
      return 'Please enter a valid email address.';
    }
    if (trimmedPass.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (trimmedPass !== confirm.trim()) {
      return 'Passwords do not match.';
    }
    if (VALID_USERS.some(u => u.email.toLowerCase() === trimmedEmail)) {
      return 'An account with this email already exists.';
    }

    // Register (in memory only — no backend)
    VALID_USERS.push({ email: trimmedEmail, password: trimmedPass, username: trimmedUser });
    setUser({ username: trimmedUser, email: trimmedEmail, isPro: false, streak: 0 });
    setIsAuthenticated(true);
    return null; // success
  };

  // ── Task actions ─────────────────────────────────────────────────────────────
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newTask: Task = { ...task, id: String(Date.now()), createdAt: today };
    setTasks(prev => [newTask, ...prev]);

    // Add notification
    const notif: AppNotification = {
      id: String(Date.now() + 1),
      title: 'New task created',
      message: `"${task.title}" has been added to your task list.`,
      time: 'Just now',
      read: false,
      type: 'info',
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, favorite: !t.favorite } : t)));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );
    // Add a completion notification
    const task = tasks.find(t => t.id === id);
    if (task && task.status !== 'completed') {
      const notif: AppNotification = {
        id: String(Date.now()),
        title: 'Task completed! 🎉',
        message: `"${task.title}" has been marked as complete.`,
        time: 'Just now',
        read: false,
        type: 'success',
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map(s =>
                s.id === subtaskId ? { ...s, completed: !s.completed } : s
              ),
            }
          : t
      )
    );
  };

  // ── Notification actions ─────────────────────────────────────────────────────
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const triggerTestNotification = () => {
    const testNotif: AppNotification = {
      id: String(Date.now()),
      title: '🔔 Test Alert',
      message: 'This is a test notification triggered manually from Notification Settings.',
      time: 'Just now',
      read: false,
      type: 'reminder',
    };
    setNotifications(prev => [testNotif, ...prev]);
  };

  // ── Settings actions ─────────────────────────────────────────────────────────
  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        tasks,
        notifications,
        settings,
        login,
        logout,
        signup,
        addTask,
        updateTask,
        deleteTask,
        toggleFavorite,
        toggleTaskComplete,
        toggleSubtask,
        markNotificationRead,
        markAllRead,
        updateSettings,
        triggerTestNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
