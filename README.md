# IT302-Phase2 Backend (competitions_mfh)

**UCID:** mfh  
**Collection:** competitions_mfh

### Base URL
http://localhost:5000/api/v1/mfh/competitions

### GET filters
- text, type, areaName, plan, code
- currentMatchday (integer)
- startFrom, endUntil (ISO date)

### Examples
/api/v1/mfh/competitions?text=Belgium  
/api/v1/mfh/competitions?type=LEAGUE&areaName=Brazil  
/api/v1/mfh/competitions?plan=TIER_FOUR  
/api/v1/mfh/competitions?startFrom=2025-07-01&endUntil=2026-06-30
