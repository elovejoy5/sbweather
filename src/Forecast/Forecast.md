# UI

- Render cards for each day and night for which a NWS forecast is available.

# Data sources

- NWS forecast & tide precitions are retrieved from S3 cache (see sbweather-server)
- Astronomical data is caclulated using suncalc

# Data structure

Forecasts are for periods of times (days and nights), while tides and astronomicla data occur at points in time.

- NWS forecast contains predictions for 14 periods, where each period consists of either a day or a night.
  - day periods typically span from 0600 to 1800
  - night periods typically span from 1800 to 0600 the following day
  - the first period may be truncated, so that for exmaple at 0900 the first period will run from 0900 to 1800
- Tide predictions contain an array of tide predictions ( e.g. `{ "t": "2025-02-01 05:01", "v": "1.381", "type": "L" }`) with each prediction being for a high or low tide at a point in time.
- Astronomical data:
  - old: organized by day
  - new: use similar format as tide production, where each event (sunrise, sunset, moonrise) occurs at a point in time.
