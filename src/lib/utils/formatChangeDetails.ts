export function formatChangeDetails(details: Record<string, any> | null | string, action: string): string {
  if (typeof details === 'string') {
    try { details = JSON.parse(details); } catch { return details; }
  }
  if (!details) return '—';

  if (action === 'create') {
    const created = details.created || details;
    const name = created.title || created.name || created.event || '';
    return `Created ${name}`;
  }
  if (action === 'delete') {
    return 'Deleted';
  }
  if (action === 'update') {
    const parts: string[] = [];
    for (const [field, change] of Object.entries(details)) {
      const c = change as { old: any; new: any };
      const label = field.replace(/_/g, ' ');
      parts.push(`${label}: ${c.old ?? '(none)'} → ${c.new}`);
    }
    return parts.join('; ');
  }
  return JSON.stringify(details);
}
