## Plan: Fix VNDirect screener units

Add unit-aware metadata for VNDirect screener by inspecting real responses, defining a field→unit map, and merging it into the provider so downstream consumers get consistent units.

### Steps
1) Inspect live screener response samples (e.g., via debug script) and list fields with observed magnitudes/types to infer units for price, volume, value, ratios.
2) Draft a unit map JSON (field → unit/type/value set) beside src/explorer/vndirect/info.json and cross-check against TCBS/Simplize conventions.
3) Update getScreenerFieldMetadata() in src/explorer/vndirect/screener.ts to merge the unit map into the built metadata and ensure missing fields like code/nmVolCr/nmValCr are included.
4) Extend/adjust tests that read VNDirect metadata to assert unit presence for key fields and document the unit source in README/CHANGELOG.

### Further Considerations
- Which fields should get unit math applied (raw vs already scaled)? Option A: store display-only unit; Option B: also store scale factor.
