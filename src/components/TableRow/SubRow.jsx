import { useDashboardData } from "../../context/DataContext";

export default function SubRow({ row, onSelect, isSelected }) {
  const { calcDeltaPct } = useDashboardData();

  const negativeIds = ["removal_after", "removal_before"];
  const isNegative = negativeIds.includes(row.id);

  const current = row.values[7];
  const yesterday = row.values[6];
  const dayWeekAgo = row.values[0];


  const deltaYesterday = calcDeltaPct(current, yesterday);
  const deltaClass =
    deltaYesterday === null || deltaYesterday === 0
      ? "neutral"
      : isNegative
      ? deltaYesterday < 0
        ? "up"
        : "down"
      : deltaYesterday > 0
      ? "up"
      : "down";

// if we need to compare current week day with average value within the week, use calcWeekdayComparison(row.values, 7)
  const deltaWeek = calcDeltaPct(current, dayWeekAgo);
  const weekdayClass =
  deltaWeek === null || deltaWeek === 0
    ? 'neutral'
    : isNegative
    ? deltaWeek < 0
      ? 'up'
      : 'down'
    : deltaWeek > 0
    ? 'up'
    : 'down';

  return (
    <tr
      onClick={() => onSelect(row.values, row.name, row.id)}
      className={isSelected ? "selected" : ""}
      style={{ cursor: "pointer" }}
    >
      <td style={{ textAlign: "left", paddingLeft: 18 }}>{row.name}</td>
      <td style={{ textAlign: "right" }} className="current-day">
        {current}
      </td>
      <td style={{ textAlign: "right" }} className={deltaClass}>
        <span>{yesterday}</span>
        <span className="delta">
          {deltaYesterday !== null
            ? `(${deltaYesterday > 0 ? "+" : ""}${deltaYesterday}%)`
            : ""}
        </span>
      </td>
      <td style={{ textAlign: "right" }} className={weekdayClass}>
        <span>{current}</span>
        <span className="delta">{deltaWeek !== null ? `(${deltaWeek > 0 ? '+' : ''}${deltaWeek}%)` : ''}</span>
      </td>
    </tr>
  );
}
