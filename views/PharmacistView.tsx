
import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { Order } from '../types';

interface PharmacistViewProps {
  isDarkMode?: boolean;
}

const PharmacistView: React.FC<PharmacistViewProps> = ({ isDarkMode }) => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-900 px-5 pt-12 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Dashboard</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Welcome, Pharmacist Raj</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <iconify-icon icon="solar:bell-linear" class="text-slate-600 dark:text-slate-400"></iconify-icon>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase mb-1">Total Earnings</div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">₹12,450</div>
            <div className="text-[10px] text-emerald-500 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <iconify-icon icon="solar:graph-up-linear"></iconify-icon> +12% today
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase mb-1">Orders</div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{orders.length}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{pendingCount} pending</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center justify-between">
            Manage Orders 
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] px-2 py-0.5 rounded-full">{pendingCount} Pending</span>
          </h3>
          
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className={`bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 ${order.status === 'delivered' ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">#{order.id}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{order.timestamp} • {order.type}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    order.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                    order.status === 'packed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-2 mb-3">
                  <div className="text-xs font-medium text-slate-800 dark:text-slate-200">Items: {order.items.join(', ')}</div>
                </div>
                {order.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => updateOrderStatus(order.id, 'packed')} className="flex-1 bg-medical-600 dark:bg-medical-500 text-white py-2 rounded-lg text-xs font-semibold">Accept Order</button>
                    <button onClick={() => updateOrderStatus(order.id, 'rejected')} className="px-3 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30"><iconify-icon icon="solar:close-circle-linear"></iconify-icon></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">Inventory Alerts</h3>
          <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <table className="w-full text-left">
              <tbody className="text-xs">
                <tr className="border-b border-slate-50 dark:border-slate-700">
                  <td className="p-3 font-medium text-slate-700 dark:text-slate-300">Insulin Glargine</td>
                  <td className="p-3 text-red-500 dark:text-red-400 font-bold text-right">2 Units</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-700 dark:text-slate-300">Pan 40</td>
                  <td className="p-3 text-amber-500 dark:text-amber-400 font-bold text-right">15 Units</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-3 pb-8 flex justify-around items-center">
        <button className="flex flex-col items-center gap-1 text-medical-600 dark:text-medical-400">
          <iconify-icon icon="solar:widget-bold" class="text-2xl"></iconify-icon>
          <span className="text-[10px] font-semibold">Dash</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
          <iconify-icon icon="solar:box-linear" class="text-2xl"></iconify-icon>
          <span className="text-[10px] font-medium">Stock</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
          <iconify-icon icon="solar:wallet-linear" class="text-2xl"></iconify-icon>
          <span className="text-[10px] font-medium">Money</span>
        </button>
      </div>
    </div>
  );
};

export default PharmacistView;
