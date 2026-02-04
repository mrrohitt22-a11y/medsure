
import React, { useState } from 'react';
import { MOCK_MEDICINES, MOCK_PHARMACIES } from '../constants';
import { analyzePrescription } from '../services/geminiService';

interface PatientViewProps {
  isDarkMode?: boolean;
}

const PatientView: React.FC<PatientViewProps> = ({ isDarkMode }) => {
  const [screen, setScreen] = useState<'home' | 'search' | 'profile' | 'upload'>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(',')[1];
      try {
        const result = await analyzePrescription(base64String);
        setAnalysisResult(result);
        setScreen('upload');
      } catch (err) {
        alert("Failed to analyze prescription. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const renderHome = () => (
    <div className="pb-24 fade-in">
      <header className="bg-white dark:bg-slate-900 px-5 pt-12 pb-4 sticky top-0 z-20 shadow-sm rounded-b-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-medium text-slate-400 mb-0.5">Deliver to</p>
            <div className="flex items-center space-x-1 text-medical-900 dark:text-medical-100">
              <iconify-icon icon="solar:map-point-bold" class="text-medical-600 text-lg"></iconify-icon>
              <span className="font-semibold text-sm">Home, Indiranagar</span>
              <iconify-icon icon="solar:alt-arrow-down-linear"></iconify-icon>
            </div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
              <iconify-icon icon="solar:user-circle-linear" class="text-xl"></iconify-icon>
            </div>
            <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold">2</div>
          </div>
        </div>
        <div className="relative group">
          <iconify-icon icon="solar:magnifer-linear" class="absolute left-4 top-3.5 text-slate-400 text-xl"></iconify-icon>
          <input type="text" placeholder="Search medicines, doctors..." className="w-full bg-slate-50 dark:bg-slate-800 border-0 py-3.5 pl-12 pr-4 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-medical-500 focus:bg-white dark:focus:bg-slate-700 transition-all" />
        </div>
      </header>

      <div className="mt-6 px-5">
        <div className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <iconify-icon icon="solar:pill-linear" width="120"></iconify-icon>
          </div>
          <span className="bg-white/20 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">Safe Delivery</span>
          <h2 className="text-xl font-semibold leading-tight mb-1">AI Prescription Scan</h2>
          <p className="text-sm text-blue-50 mb-4 font-light">Fast medicines identification & ordering</p>
          <label className="bg-white text-medical-600 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm active:scale-95 transition-transform flex items-center gap-2 w-fit cursor-pointer">
            <iconify-icon icon="solar:camera-linear" class="text-base"></iconify-icon>
            {isAnalyzing ? 'Analyzing...' : 'Upload Now'}
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isAnalyzing} />
          </label>
        </div>
      </div>

      <div className="mt-8 px-5">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4">Categories</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: 'solar:pill-linear', label: 'Medicines', color: 'blue' },
            { icon: 'solar:heart-pulse-linear', label: 'Devices', color: 'emerald' },
            { icon: 'solar:bottle-linear', label: 'Baby Care', color: 'amber' },
            { icon: 'solar:cosmetic-linear', label: 'Personal', color: 'purple' }
          ].map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setScreen('search')}>
              <div className={`w-16 h-16 bg-${cat.color}-50 dark:bg-${cat.color}-900/20 rounded-2xl flex items-center justify-center text-${cat.color}-600 dark:text-${cat.color}-400 shadow-sm border border-${cat.color}-100 dark:border-${cat.color}-800`}>
                <iconify-icon icon={cat.icon} class="text-2xl"></iconify-icon>
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 px-5">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4">Verified Pharmacies</h3>
        <div className="space-y-4">
          {MOCK_PHARMACIES.map(p => (
            <div key={p.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-start gap-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center shrink-0">
                <iconify-icon icon="solar:shop-linear" class="text-2xl text-slate-400 dark:text-slate-500"></iconify-icon>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">{p.name}</h4>
                  <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    {p.rating} <iconify-icon icon="solar:star-bold" class="text-[8px]"></iconify-icon>
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.distance} • Open 24 Hours</p>
                <div className="flex gap-2 mt-2">
                  <span className="flex items-center gap-1 text-[10px] text-medical-600 dark:text-medical-400 bg-medical-50 dark:bg-medical-900/30 px-2 py-1 rounded-md font-medium">
                    <iconify-icon icon="solar:verified-check-bold"></iconify-icon> Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="min-h-full bg-slate-50 dark:bg-slate-900 pb-24 fade-in">
      <div className="bg-white dark:bg-slate-900 px-5 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('home')} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-slate-800">
            <iconify-icon icon="solar:arrow-left-linear" class="text-xl dark:text-slate-300"></iconify-icon>
          </button>
          <input type="text" defaultValue="Paracetamol" className="flex-1 bg-slate-50 dark:bg-slate-800 border-0 py-2.5 px-4 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-700" />
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
          {['All', 'Tablets', 'Syrup', 'Brands'].map(tag => (
            <button key={tag} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${tag === 'All' ? 'bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}>
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5 space-y-4">
        {MOCK_MEDICINES.map(m => (
          <div key={m.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex gap-4">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center shrink-0 p-2">
              <iconify-icon icon={m.category === 'Syrup' ? 'solar:bottle-linear' : 'solar:pill-linear'} class="text-4xl text-slate-300 dark:text-slate-500"></iconify-icon>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{m.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{m.manufacturer}</p>
                </div>
                {m.requiresPrescription && <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">Rx</span>}
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{m.unit}</p>
              <div className="flex justify-between items-end mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">₹{m.price.toFixed(2)}</span>
                  {m.oldPrice && <span className="text-[10px] text-slate-400 dark:text-slate-500 line-through">₹{m.oldPrice}</span>}
                </div>
                <button className="bg-white dark:bg-slate-800 border border-medical-600 dark:border-medical-500 text-medical-600 dark:text-medical-400 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-medical-50 dark:hover:bg-medical-900/20">ADD</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="min-h-full bg-slate-50 dark:bg-slate-900 pb-24 fade-in p-5">
      <div className="flex items-center gap-4 mb-6 pt-8">
        <button onClick={() => setScreen('home')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm">
          <iconify-icon icon="solar:arrow-left-linear" class="text-xl dark:text-slate-300"></iconify-icon>
        </button>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Scan Results</h2>
      </div>

      {analysisResult ? (
        <div className="space-y-6">
          <div className="bg-medical-50 dark:bg-medical-900/20 border border-medical-100 dark:border-medical-800 p-4 rounded-2xl">
            <h3 className="text-medical-900 dark:text-medical-100 font-bold text-sm mb-1 flex items-center gap-2">
              <iconify-icon icon="solar:shield-check-bold"></iconify-icon> AI Insights
            </h3>
            <p className="text-xs text-medical-800 dark:text-medical-300 leading-relaxed">{analysisResult.summary}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 px-1">Detected Medicines</h3>
            {analysisResult.medicines?.map((med: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{med.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{med.dosage || 'Dosage not specified'}</p>
                </div>
                <button className="text-medical-600 dark:text-medical-400 text-xs font-bold border border-medical-100 dark:border-medical-800 px-3 py-1 rounded-lg">Add to Cart</button>
              </div>
            ))}
          </div>

          <button onClick={() => setScreen('home')} className="w-full bg-medical-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-medical-200">
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500">
          <iconify-icon icon="solar:camera-linear" class="text-6xl mb-4"></iconify-icon>
          <p className="text-sm font-medium">No results yet. Scan a prescription!</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50 dark:bg-slate-900">
      {screen === 'home' && renderHome()}
      {screen === 'search' && renderSearch()}
      {screen === 'upload' && renderUpload()}
      {screen === 'profile' && (
        <div className="min-h-full bg-slate-50 dark:bg-slate-900 pb-24 fade-in">
          <div className="bg-medical-600 px-5 pt-16 pb-8 rounded-b-[2.5rem] text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-2xl font-bold">JD</div>
              <div>
                <h2 className="text-lg font-bold">John Doe</h2>
                <p className="text-xs text-blue-100">+91 98765 43210</p>
              </div>
            </div>
          </div>
          <div className="px-5 -mt-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
              <div className="flex items-center gap-3 py-2 cursor-pointer border-b border-slate-50 dark:border-slate-700 pb-2">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400"><iconify-icon icon="solar:bag-linear"></iconify-icon></div>
                <span className="flex-1 text-sm font-medium dark:text-slate-100">My Orders</span>
                <iconify-icon icon="solar:alt-arrow-right-linear" className="text-slate-400 dark:text-slate-500"></iconify-icon>
              </div>
              <div className="flex items-center gap-3 py-2 cursor-pointer border-b border-slate-50 dark:border-slate-700 pb-2">
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400"><iconify-icon icon="solar:document-medicine-linear"></iconify-icon></div>
                <span className="flex-1 text-sm font-medium dark:text-slate-100">Prescriptions</span>
                <iconify-icon icon="solar:alt-arrow-right-linear" className="text-slate-400 dark:text-slate-500"></iconify-icon>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="absolute bottom-0 w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 px-6 py-4 pb-8 flex justify-between items-center z-30">
        {[
          { icon: 'solar:home-smile-bold', label: 'Home', screen: 'home' },
          { icon: 'solar:shop-linear', label: 'Shop', screen: 'search' },
          { icon: 'solar:user-linear', label: 'Profile', screen: 'profile' }
        ].map(item => (
          <button key={item.label} onClick={() => setScreen(item.screen as any)} className={`flex flex-col items-center gap-1 ${screen === item.screen ? 'text-medical-600 dark:text-medical-400' : 'text-slate-400 dark:text-slate-500'}`}>
            <iconify-icon icon={item.icon} class="text-2xl"></iconify-icon>
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
        <div className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 relative">
          <label className="absolute -top-10 bg-medical-600 text-white rounded-full p-3 shadow-lg border-4 border-slate-50 dark:border-slate-900 cursor-pointer">
            <iconify-icon icon="solar:camera-linear" class="text-2xl"></iconify-icon>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
          </label>
          <span className="text-[10px] font-medium mt-6">Upload</span>
        </div>
      </div>
    </div>
  );
};

export default PatientView;
