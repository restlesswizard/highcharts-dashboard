export default function TableHeading() {
  return (
    <thead>
      <tr>
        <th style={{ textAlign: 'left', padding: '8px' }}>Показатель</th>
        <th style={{ textAlign: 'right', padding: '8px' }} className="current-day">Текущий день</th>
        <th style={{ textAlign: 'right', padding: '8px' }}>Вчера</th>
        <th style={{ textAlign: 'right', padding: '8px' }}>Этот день недели</th>
      </tr>
    </thead>
  );
}
