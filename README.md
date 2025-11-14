# Dashboard Table Component

## Overview
This project is a dynamic, interactive dashboard table built with React.  
It allows visualizing key business metrics (like revenue, payments, average check, etc.) over a week, with inline comparison and charting functionality.  
The goal is to provide a clear and concise overview of daily and weekly changes in metrics.

## Data Source
- All data is provided via a **React Context (`DataProvider`)**, such as methods calcDeltaPct, calcWeekdayComparison, and listAllSeries
- Each row (parent or simple metric) contains an array of numeric values for 8 days:  
  - Index 0: week-ago value  
  - Index 1..6: intermediate days  
  - Index 7: current day  
- Parent rows (e.g., "Revenue") can have child rows ("Cash", "Card", etc.).  
- Child rows are accessed directly via `row.children`, so `getSeriesByChildId` is optional.


## Column Calculations

### Current Day
- Displays the last value in the `values` array (index 7).  

### Yesterday
- Displays the second-to-last value (`index 6`).
- Percentage change is calculated relative to **current day** using `calcDeltaPct(yesterday, current)`.
- Styling:
  - Positive → `up` (green)
  - Negative → `down` (red)
  - Zero or null → `neutral`
- Metrics flagged as negative (like "Удаления из чека") have inverted coloring.

### This Week Day
- Compares **current day** with the value one week ago (`index 0`).
- Uses `calcDeltaPct(current, weekAgo)` for percentage change.
- Styling logic same as "Yesterday", with inversion for negative metrics.

## TODO
- Extract logic for handling negative metrics, current/yesterday/week calculations into a separate helper module for reusability
- Extend charts to optionally display more days dynamically.
- Add unit tests for delta calculations and negative metric handling.

