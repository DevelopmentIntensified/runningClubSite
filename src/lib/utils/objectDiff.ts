export function objectDiff(oldObj: Record<string, any>, newObj: Record<string, any>): Record<string, { old: any; new: any }> {
  const changes: Record<string, { old: any; new: any }> = {};
  for (const key of Object.keys(newObj)) {
    if (newObj[key] !== undefined && newObj[key] !== oldObj[key]) {
      changes[key] = { old: oldObj[key] ?? null, new: newObj[key] };
    }
  }
  return changes;
}
