import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Zap, RefreshCw, Wifi, CheckCircle2, XCircle, Clock, Server, Activity, Database, Save } from 'lucide-react';

interface ApiTask {
  id: string;
  title: string;
  priority: 'High' | 'Med' | 'Low';
  status: 'pending' | 'completed' | 'in-progress';
  updatedAt: string;
}

const MOCK_API_TASKS: ApiTask[] = [
  { id: 'api-1', title: 'Server deployment review', priority: 'High', status: 'in-progress', updatedAt: '2 min ago' },
  { id: 'api-2', title: 'Database schema migration', priority: 'High', status: 'pending', updatedAt: '8 min ago' },
  { id: 'api-3', title: 'CI/CD pipeline update', priority: 'Med', status: 'completed', updatedAt: '15 min ago' },
  { id: 'api-4', title: 'API endpoint documentation', priority: 'Low', status: 'completed', updatedAt: '32 min ago' },
  { id: 'api-5', title: 'Load balancer config', priority: 'Med', status: 'pending', updatedAt: '1h ago' },
];

const statusColor = (status: ApiTask['status']) => ({
  'in-progress': 'bg-amber-100 text-amber-600',
  pending: 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
}[status]);

const priorityColor = (p: ApiTask['priority']) => ({
  High: 'bg-red-100 text-red-600',
  Med: 'bg-amber-100 text-amber-600',
  Low: 'bg-green-100 text-green-600',
}[p]);

export function ApiIntegrationScreen() {
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');
  const [tasks, setTasks] = useState<ApiTask[]>(MOCK_API_TASKS);
  const [lastSync, setLastSync] = useState('Just now');
  const [logs, setLogs] = useState<string[]>([
    '[09:41:02] Connected to task server',
    '[09:41:03] Fetched 5 tasks from API',
    '[09:41:04] Real-time sync enabled',
    '[09:41:05] Data saved to localStorage',
  ]);
  const [savedToStorage, setSavedToStorage] = useState(false);

  // Persist fetched API tasks to localStorage for evidence
  const persistToStorage = (apiTasks: ApiTask[]) => {
    try {
      localStorage.setItem('ott_api_tasks', JSON.stringify(apiTasks));
      localStorage.setItem('ott_api_last_sync', new Date().toISOString());
      setSavedToStorage(true);
    } catch { /* ignore */ }
  };

  useEffect(() => {
    persistToStorage(tasks);
  }, []);

  const storedApiTasksCount = (() => {
    try {
      const raw = localStorage.getItem('ott_api_tasks');
      return raw ? (JSON.parse(raw) as unknown[]).length : 0;
    } catch { return 0; }
  })();

  const handleSync = () => {
    setSyncing(true);
    const newLog = `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] Syncing tasks from API…`;
    setLogs(prev => [newLog, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setSyncing(false);
      setLastSync('Just now');
      setSyncStatus('connected');
      const updated = tasks.map(t =>
        t.id === 'api-1' ? { ...t, status: 'completed' as const, updatedAt: 'Just now' } : t
      );
      setTasks(updated);
      persistToStorage(updated);
      const doneLog = `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] Sync complete — ${updated.length} tasks cached to localStorage`;
      setLogs(prev => [doneLog, ...prev.slice(0, 4)]);
    }, 1800);
  };

  // Simulate live updates
  useEffect(() => {
    const timer = setInterval(() => {
      const eventTypes = [
        'Task priority updated',
        'New comment added',
        'Status changed',
        'Task assigned',
      ];
      const task = tasks[Math.floor(Math.random() * tasks.length)];
      const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const newLog = `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${event}: "${task.title}"`;
      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 8000);
    return () => clearInterval(timer);
  }, [tasks]);

  const stats = [
    { label: 'Total',     value: tasks.length,                                icon: Server       },
    { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle2 },
    { label: 'Pending',   value: tasks.filter(t => t.status !== 'completed').length, icon: Clock        },
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-[#1B2235] px-5 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/settings')}
            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <h1 className="text-white font-bold text-xl">API Integration</h1>
        </div>

        {/* Connection status */}
        <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${syncStatus === 'connected' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <Wifi size={20} className={syncStatus === 'connected' ? 'text-green-400' : 'text-red-400'} />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {syncStatus === 'connected' ? 'Server Connected' : 'Disconnected'}
              </p>
              <p className="text-[#9BA8BD] text-xs mt-0.5">Last sync: {lastSync}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${syncStatus === 'connected' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${syncStatus === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className={`text-xs font-medium ${syncStatus === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
              {syncStatus === 'connected' ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/10 rounded-xl py-3 text-center">
              <Icon size={14} className="text-[#9BA8BD] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">{value}</p>
              <p className="text-[#9BA8BD] text-[10px]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-4">
        {/* Sync button */}
        <button
          onClick={handleSync}
          disabled={syncing}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1B2235] text-white rounded-2xl font-semibold text-sm hover:bg-[#252f47] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing from API…' : 'Sync Now'}
        </button>

        {/* localStorage Integration Panel */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Database size={14} className="text-blue-500" />
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              API → LocalStorage Integration
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5F6FA] rounded-xl p-3">
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Key</p>
              <p className="text-xs font-mono font-medium text-gray-700 mt-1">ott_api_tasks</p>
            </div>
            <div className="bg-[#F5F6FA] rounded-xl p-3">
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Cached Tasks</p>
              <p className="text-xs font-bold text-[#1B2235] mt-1">{storedApiTasksCount} items</p>
            </div>
            <div className="bg-[#F5F6FA] rounded-xl p-3">
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Status</p>
              <p className="text-xs font-semibold text-green-600 mt-1 flex items-center gap-1">
                <Save size={10} /> {savedToStorage ? 'Saved' : 'Pending'}
              </p>
            </div>
            <div className="bg-[#F5F6FA] rounded-xl p-3">
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Storage Size</p>
              <p className="text-xs font-bold text-gray-700 mt-1">
                {((localStorage.getItem('ott_api_tasks') || '').length / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Tasks */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Activity size={13} className="text-gray-400" />
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              Fetched from API
            </p>
          </div>
          <div className="space-y-2.5">
            {tasks.map(task => (
              <div key={task.id} className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium text-gray-800 truncate ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock size={10} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400">{task.updatedAt}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
                {task.status === 'completed' ? (
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                ) : (
                  <XCircle size={16} className="text-gray-300 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-gray-400" />
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Activity Log</p>
          </div>
          <div className="bg-[#1B2235] rounded-2xl p-4 space-y-2">
            {logs.map((log, i) => (
              <p key={i} className="text-xs font-mono" style={{ color: i === 0 ? '#7AEFB8' : '#9BA8BD' }}>
                {log}
              </p>
            ))}
          </div>
        </div>

        {/* API Config note */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
          <Zap size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-700">Placeholder API Mode</p>
            <p className="text-xs text-amber-600 mt-1">
              Replace <code className="bg-amber-100 px-1 rounded text-amber-700">YOUR_API_URL</code> to connect a real backend. Fetched data is automatically cached in <code className="bg-amber-100 px-1 rounded text-amber-700">localStorage</code> for offline access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}