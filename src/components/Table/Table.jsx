import { useState } from 'react';
import TableHeading from '../TableHeading/TableHeading';
import ParentRow from '../TableRow/ParentRow';
import SubRow from '../TableRow/SubRow';
import SimpleRow from '../TableRow/SimpleRow';
import ChartInTable from '../Chart/Chart';
import { useDashboardData } from '../../context/DataContext';

export default function Table() {
  const { raw, getSeriesById } = useDashboardData();

  // Keep the series for the chart and the selected row
  const [selectedSeries, setSelectedSeries] = useState(getSeriesById('revenue'));
  const [selectedName, setSelectedName] = useState('Выручка');

  // Row click handler
  const handleSelectRow = (series, name) => {
    setSelectedSeries(series);
    setSelectedName(name);
  };

  // List of all simple metrics for SimpleRow
  const simpleRows = raw.filter((row) => !row.children || row.id !== 'revenue');

  // Parent row (revenue)
  const parentRow = raw.find((r) => r.id === 'revenue');
  const subRows = parentRow?.children || [];

  return (
    <table>
      <TableHeading />
      <tbody>
        {/* Parent Row */}
        {parentRow && (
          <ParentRow
            row={parentRow}
            onSelect={handleSelectRow}
            isSelected={selectedName === parentRow.name}
          />
        )}

        {/* Chart */}
        <tr>
          <td colSpan={4} className='chart'>
            <ChartInTable series={selectedSeries} title={selectedName} />
          </td>
        </tr>

        {/* Subrows */}
        {subRows.map((sub) => (
          <SubRow
            key={sub.id}
            row={sub}
            onSelect={handleSelectRow}
            isSelected={selectedName === sub.name}
          />
        ))}

        {/* Other rows */}
        {simpleRows.map((row) => (
          <SimpleRow
            key={row.id}
            row={row}
            onSelect={handleSelectRow}
            isSelected={selectedName === row.name}
          />
        ))}
      </tbody>
    </table>
  );
}
