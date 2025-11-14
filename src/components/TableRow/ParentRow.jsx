import { useDashboardData } from "../../context/DataContext";

export default function ParentRow({ row, onSelect, isSelected }) {
  const { calcDeltaPct } = useDashboardData();

  // Sum the children's values ​​(no side effects)
  const parentValues = (row.children || []).reduce((acc, ch) => {
    ch.values.forEach((val, idx) => {
      acc[idx] = (acc[idx] || 0) + (Number(val) || 0);
    });
    return acc;
  }, []);

  // flag of negative metrics by id
  const negativeIds = ["removal_after", "removal_before"];
  const isNegative = negativeIds.includes(row.id);

  // Индексы: 0 = weekAgo, 1..6 = промежутки, 7 = current
  const current = parentValues[7] ?? 0;
  const yesterday = parentValues[6] ?? 0;
  const weekAgo = parentValues[0] ?? null;

  // Для колонки "Вчера" — сравниваем вчера относительно текущего дня (yesterday vs current)
  const deltaYesterday = calcDeltaPct(yesterday, current);
  const deltaClass =
    deltaYesterday === null || deltaYesterday === 0
      ? "neutral"
      : isNegative
      ? deltaYesterday > 0
        ? "down"    // for negative metrics: yesterday > today => worse
        : "up"      // yesterday < today => better
      : deltaYesterday > 0
      ? "up"
      : "down";

  // "This week day" column — compare weekAgo vs current
  // if no weekAgo or 0 -> neutral
  const deltaWeek =
    weekAgo === null || weekAgo === 0 ? null : calcDeltaPct(current, weekAgo);
  const weekdayClass =
    deltaWeek === null || deltaWeek === 0
      ? "neutral"
      : isNegative
      ? deltaWeek > 0
        ? "down"
        : "up"
      : deltaWeek > 0
      ? "up"
      : "down";

  return (
    <tr
      onClick={() => onSelect(parentValues, row.name, row.id)}
      className={isSelected ? "selected parent" : "parent"}
      style={{ cursor: "pointer" }}
    >
      <td style={{ textAlign: "left", fontWeight: "bold", paddingLeft: 8 }}>
        {row.name}
      </td>

      {/* Current day */}
      <td style={{ textAlign: "right" }} className="current-day">
        {current}
      </td>

      {/* Yesterday */}
      <td style={{ textAlign: "right" }} className={deltaClass}>
        <span>{yesterday}</span>
        <span className="delta">
          {deltaYesterday !== null
            ? `(${deltaYesterday > 0 ? "+" : ""}${deltaYesterday}%)`
            : ""}
        </span>
      </td>

      {/* This week day */}
      <td style={{ textAlign: "right" }} className={weekdayClass}>
        <span>{current}</span>
        <span className="delta">
          {deltaWeek !== null
            ? `(${deltaWeek > 0 ? "+" : ""}${deltaWeek}%)`
            : ""}
        </span>
      </td>
    </tr>
  );
}
