import { useState, useEffect } from 'react';
import PageHeader from '../../components/shared/PageHeader';
import { Settings as SettingsIcon, Shield, Database, Bell, Loader2, Save } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'sonner';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const [settings, setSettings] = useState({ company_name: '', timezone: 'UTC' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/settings').then(res => {
      setSettings(res.data.data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', settings);
      toast.success('Settings updated');
    } catch (err) { toast.error('Failed to update settings'); }
    setSaving(false);
  };

  const tabs = [
    { icon: SettingsIcon, title: 'General', desc: 'Company info, timezone, and general preferences' },
    { icon: Shield, title: 'Security', desc: 'Manage password policies and authentication settings' },
    { icon: Database, title: 'Database', desc: 'View database connection status and statistics' },
    { icon: Bell, title: 'Notifications', desc: 'Configure email and in-app notification preferences' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="System configuration and preferences." />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 space-y-3">
          {tabs.map(item => (
            <div 
              key={item.title} 
              onClick={() => setActiveTab(item.title)}
              className={`glass-card p-4 flex items-start gap-4 cursor-pointer transition-all fade-in ${activeTab === item.title ? 'border-primary bg-primary/5' : 'hover:border-primary/30'}`}
            >
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(77, 142, 255, 0.1)', border: '1px solid rgba(77, 142, 255, 0.2)' }}>
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-on-surface text-sm">{item.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-2/3 glass-card p-6 fade-in min-h-[400px]">
          <h2 className="text-xl font-bold text-on-surface mb-6">{activeTab} Settings</h2>
          
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : activeTab === 'General' ? (
            <form onSubmit={handleSave} className="space-y-5 max-w-lg">
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-1.5">Company Name</label>
                <input 
                  value={settings.company_name || ''} 
                  onChange={e => setSettings(s => ({...s, company_name: e.target.value}))} 
                  className="input-glass w-full px-3 py-2.5 text-sm rounded-xl" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-1.5">Timezone</label>
                <select 
                  value={settings.timezone || 'UTC'} 
                  onChange={e => setSettings(s => ({...s, timezone: e.target.value}))} 
                  className="input-glass w-full px-3 py-2.5 text-sm rounded-xl appearance-none"
                >
                  <option value="UTC">UTC (Universal Coordinated Time)</option>
                  <option value="America/New_York">EST (Eastern Standard Time)</option>
                  <option value="Europe/London">GMT (Greenwich Mean Time)</option>
                  <option value="Asia/Kolkata">IST (Indian Standard Time)</option>
                </select>
              </div>
              
              <button type="submit" disabled={saving} className="btn-glow px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 flex items-center gap-2 mt-4" style={{background:'linear-gradient(135deg,#4d8eff,#571bc1)'}}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Settings
              </button>
            </form>
          ) : (
            <div className="text-center py-20 text-on-surface-variant border border-dashed border-outline rounded-xl">
              <SettingsIcon className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p>This settings module is under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
