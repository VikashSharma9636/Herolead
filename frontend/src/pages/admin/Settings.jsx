import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Settings</h1>
        <p className="text-slate-500 mt-1">Manage system preferences and configurations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-secondary">Theme Preference</h4>
              <p className="text-sm text-slate-500">Choose how LeadFlow looks to you.</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                theme === 'dark' ? 'bg-primary' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'New Lead Assignment', desc: 'Get notified when a new lead is assigned to you.' },
            { title: 'Activity Updates', desc: 'Get notified when someone comments on your lead.' },
            { title: 'Weekly Reports', desc: 'Receive a weekly email digest of your performance.' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0 last:pb-0">
              <div>
                <h4 className="text-sm font-medium text-secondary">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
