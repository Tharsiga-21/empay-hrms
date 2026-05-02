import { Inbox } from 'lucide-react';

export default function EmptyState({ message = 'No data found', icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
      <Icon className="w-12 h-12 mb-4 opacity-30" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
