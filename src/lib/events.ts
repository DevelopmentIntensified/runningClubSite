export type EventTypeConfig = {
  value: string;
  label: string;
  chipBg: string;
  chipText: string;
  chipRing: string;
};

export const eventTypes: EventTypeConfig[] = [
  { value: 'Practice', label: 'Practice', chipBg: 'bg-yellow-100', chipText: 'text-yellow-900', chipRing: 'ring-yellow-200/80' },
  { value: 'Social', label: 'Social', chipBg: 'bg-purple-100', chipText: 'text-purple-900', chipRing: 'ring-purple-200/80' },
  { value: 'Trail Race', label: 'Trail Race', chipBg: 'bg-emerald-100', chipText: 'text-emerald-900', chipRing: 'ring-emerald-200/80' },
  { value: 'Road Race', label: 'Road Race', chipBg: 'bg-teal-100', chipText: 'text-teal-900', chipRing: 'ring-teal-200/80' },
  { value: 'NIRCA Outdoor Race', label: 'NIRCA', chipBg: 'bg-red-100', chipText: 'text-red-900', chipRing: 'ring-red-200/80' },
  { value: 'NIRCA Indoor Race', label: 'NIRCA', chipBg: 'bg-red-100', chipText: 'text-red-900', chipRing: 'ring-red-200/80' },
  { value: 'NCAA Outdoor Race', label: 'NCAA', chipBg: 'bg-blue-100', chipText: 'text-blue-900', chipRing: 'ring-blue-200/80' },
  { value: 'NCAA Indoor Race', label: 'NCAA', chipBg: 'bg-blue-100', chipText: 'text-blue-900', chipRing: 'ring-blue-200/80' },
  { value: 'Alumni', label: 'Alumni', chipBg: 'bg-indigo-100', chipText: 'text-indigo-900', chipRing: 'ring-indigo-200/80' },
];

export function chipClass(type: string): string {
  const config = eventTypes.find((t) => t.value === type);
  if (config) return `${config.chipBg} ${config.chipText} ${config.chipRing}`;
  return 'bg-slate-100 text-slate-800 ring-slate-200/80';
}

export function legendItems(): { label: string; chipBg: string; chipText: string; chipRing: string }[] {
  const seen = new Set<string>();
  return eventTypes.filter((t) => {
    if (seen.has(t.label)) return false;
    seen.add(t.label);
    return true;
  }).map((t) => ({ label: t.label, chipBg: t.chipBg, chipText: t.chipText, chipRing: t.chipRing }));
}

export function typeOptions(): { value: string; label: string }[] {
  return eventTypes.map((t) => ({ value: t.value, label: t.label }));
}
