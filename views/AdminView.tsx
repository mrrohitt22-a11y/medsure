
import React from 'react';
import { MOCK_VERIFICATIONS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AdminViewProps {
  isDarkMode?: boolean;
}

const data = [
  { name: 'Mon', revenue: 4000, users: 2400 },
  { name: 'Tue', revenue: 3000, users: 1398 },
  { name: 'Wed', revenue: 2000, users: 9800 },
  { name: 'Thu', revenue: 2780, users: 3908 },
  { name: 'Fri', revenue: 1890, users: 4800 },
  { name: 'Sat', revenue: 2390, users: 3800 },
  { name: 'Sun', revenue: 3490, users: 4300 },
];

const AdminView: React.FC<AdminViewProps> = ({ isDarkMode }) => {
  const chartColor = isDarkMode ? '#60a5fa' : '#3b82f6';
  const barColor = isDarkMode ? '#34d399' : '#10b981';
  const tickColor = isDarkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex border border-slate-200 dark:border-slate-800 fade-in">
      <aside className="w-64 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10 text-medical-600 dark:text-medical-400">
          <iconify-icon icon="solar:shield-check-bold" class="text-3xl"></iconify-icon>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">MedSure</span>
        </div>
        <nav className="space-y-1 flex-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 text-medical-600 dark:text-medical-400 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 font-medium text-sm">
            <iconify-icon icon="solar:chart-square-bold"></iconify-icon> Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium text-sm transition-colors">
            <iconify-icon icon="solar:users-group-rounded-linear"></iconify-icon> Pharmacists
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium text-sm transition-colors">
            <iconify-icon icon="solar:bag-check-linear"></iconify-icon> Orders
          </a>
        </nav>
        <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-full bg-medical-100 dark:bg-medical-900/30 flex items-center justify-center text-medical-600 dark:text-medical-400 font-bold">A</div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-900">
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Platform Analytics</h1>
          <button className="px-4 py-2 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-lg text-sm font-medium">Export Report</button>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Active Patients', val: '24.5k', trend: '+12%', color: 'blue' },
              { label: 'Pharmacies', val: '842', trend: '+5', color: 'emerald' },
              { label: 'Daily Rx', val: '156', trend: '12 Pending', color: 'amber' },
              { label: 'Revenue', val: '₹4.2L', trend: '+8%', color: 'purple' }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">{stat.label}</p>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.val}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${i === 2 ? 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400'}`}>{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm h-80">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} stroke={tickColor} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: isDarkMode ? '#334155' : '#e2e8f0', color: isDarkMode ? '#f8fafc' : '#1e293b' }}
                    itemStyle={{ color: isDarkMode ? '#f8fafc' : '#1e293b' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke={chartColor} fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm h-80">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">User Activity</h3>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data}>
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} stroke={tickColor} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: isDarkMode ? '#334155' : '#e2e8f0', color: isDarkMode ? '#f8fafc' : '#1e293b' }}
                    itemStyle={{ color: isDarkMode ? '#f8fafc' : '#1e293b' }}
                  />
                  <Bar dataKey="users" fill={barColor} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-6">Verification Queue</h3>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 dark:text-slate-500 uppercase font-medium bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Name</th>
                  <th className="px-4 py-3">License No.</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {MOCK_VERIFICATIONS.map(req => (
                  <tr key={req.id}>
                    <td className="px-4 py-4 font-medium text-slate-800 dark:text-slate-200">{req.name}</td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{req.licenseNo}</td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{req.city}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${req.status === 'review' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-4"><button className="text-medical-600 dark:text-medical-400 font-medium hover:underline">Verify</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
