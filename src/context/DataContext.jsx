import { createContext, useContext, useMemo } from 'react';
import sampleData from './sampleData'; // import db

const DataContext = createContext(null);

export function DataProvider({ children, initialData = sampleData }) {
  const value = useMemo(() => {
    // Returns a row or group object by its unique identifier `id`.
    // Used to quickly find a specific row/parent in a data structure.
    const getItemById = (id) => initialData.find(it => it.id === id) || null;

    // Returns an array of values ​​(`values`) for the row with the specified `id`.
    // Used for plotting a graph or calculating deltas.
    const getSeriesById = (id) => {
      const item = getItemById(id);
      if (!item) return [];
      if (Array.isArray(item.children) && item.children.length > 0) {
        const n = item.children[0].values.length;
        return Array.from({ length: n }).map((_, idx) =>
          item.children.reduce((acc, ch) => acc + (Number(ch.values[idx]) || 0), 0)
        );
      }
      return (item.values || []).map(v => Number(v) || 0); // protect from undefined|null inside mapping
    };

    // Returns an array of values (`values`) for a child row with the specified `childId`.
    // Useful when you need the series of a specific child without summing parent values.
    const getSeriesByChildId = (childId) => {
      for (const it of initialData) {
        if (it.children) {
          const ch = it.children.find(c => c.id === childId);
          if (ch) return (ch.values || []).map(v => Number(v) || 0); // protect from undefined|null inside mapping
        }
      }
      return [];
    };

    // Calculates the percentage change between two numbers.
    // Formula: ((current - previous) / previous) * 100
    // The result is rounded to 1 decimal place.
    const calcDeltaPct = (current, previous) => {
      if (previous === 0 || previous === null || previous === undefined) return null;
      const pct = ((current - previous) / previous) * 100;
      return Math.round(pct * 10) / 10;
    };

    // Compares a value in an array with other elements (for example, current vs. avg for other days).
    // `series` is an array of numbers (indicator values ​​for several days).
    // `index` is the index of the element to compare (the last element by default).
    // Returns an object: { pct, avg }, where:
    // pct is the percentage difference of the selected element from the average of the others.
    // avg is the average value of the others.
    // Note: it ignores chosen element when calculating average within other days
    const calcWeekdayComparison = (series, index = 6) => {
      if (!Array.isArray(series) || series.length <= 1) return { pct: null, avg: null };
      const value = Number(series[index]) || 0;
      const others = series.filter((_, i) => i !== index).map(v => Number(v) || 0);
      const avg = others.reduce((a, b) => a + b, 0) / others.length;
      if (avg === 0) return { pct: null, avg };
      const pct = Math.round(((value - avg) / avg) * 10) / 10;
      return { pct, avg };
    };

    // Returns an array of all data series (for each indicator) in the structure.
    // Useful for looping through all indicators, for example, to create tables or graphs.
    const listAllSeries = () => {
      const out = [];
      for (const it of initialData) {
        if (Array.isArray(it.children) && it.children.length > 0) {
          out.push({ id: it.id, name: it.name, isParent: true });
          for (const ch of it.children) out.push({ id: ch.id, name: ch.name, parentId: it.id, isParent: false });
        } else {
          out.push({ id: it.id, name: it.name, isParent: false });
        }
      }
      return out;
    };

    return {
      raw: initialData,
      getItemById,
      getSeriesById,
      getSeriesByChildId,
      calcDeltaPct,
      calcWeekdayComparison,
      listAllSeries,
    };
  }, [initialData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDashboardData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useDashboardData must be used inside DataProvider');
  return ctx;
}
