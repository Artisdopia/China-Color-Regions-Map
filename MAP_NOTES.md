# China Color Regions interactive map

An audio-free, browser-based map of the Color Regions collection. The map data is built from `data/recordings.parquet` in the public [ProjectAquarius/colour-regions Hugging Face dataset](https://huggingface.co/datasets/ProjectAquarius/colour-regions). Province borders come from Tianditu national-standard vector geometry, distributed in GeoJSON format by [GeoJSON.cn](https://geojson.cn/data/atlas/tiandi). The included GeoJSON is drawn as an interactive SVG, so no mapping library, CDN, or basemap service is needed. Readers can switch between Chinese and English. The overview shows the dataset's 15 color regions for folk songs; each circle represents recordings assigned to one color region. Selecting a circle zooms in to its contributing provinces, where province profiles show songs and color-coded metadata tags.

The 15 color-region categories come directly from the dataset's `region` field. A region may span several provinces, and a province may contain recordings associated with several color regions. Circles are placed near the weighted center of their contributing provinces; connector lines indicate when a marker has been nudged to reduce overlap. Circle size represents recordings assigned to that color region. Region names are labeled beside their circles. Province fills are neutral so they do not imply that each province belongs to only one color region. The map geometry is fit with balanced whitespace and centered within the map panel. The beige page texture uses the supplied `emboss-pattern.png` as a repeating background tile, tuned to the lighter paper shade `#F6F4EE`.

Tags are built only from the dataset's `region`, `genre`, `ethnicGroup`, `performance`, and named `place` fields. Generic place placeholders such as `province` and place-field metadata noise are omitted. Click any tag to open the Tag Explorer, which lists every recording with that exact dataset value from the current province, with links to the source videos and a button to return to the province. The bundle includes English translations for the current dataset's tag values and 1,442 distinct song titles; hovering a translated tag or title shows its original value. These translations work locally without live translation requests.

## Run locally

Download `data/recordings.parquet` from the Hugging Face dataset to a local path. Install the `pyarrow` reader, regenerate the summary bundle, then serve the folder over HTTP:

```powershell
python -m pip install pyarrow
python build_data.py 'C:\path\to\recordings.parquet'
python -m http.server 8001
```

Open `http://localhost:8001`. The site uses the included boundary GeoJSON and data file. Fonts fall back to local system fonts when web fonts are unavailable.

## Data policy

- The fill counts recordings whose `province` in the Hugging Face Parquet export exactly maps to a province-level geometry.
- Cross-province, non-standard, blank, and otherwise ambiguous province labels are not allocated to a polygon. The page reports the number excluded from the province layer.
- The collection's color-region classification is separate; the selected province profile shows a count breakdown by color region.
- The page links out to the recording's source URL. It does not download, embed, or redistribute audio.
- The local Parquet file is an input to the build and is not included in this website folder; only the fields needed for the map are written to `data.json`.
- Boundary line features are excluded; the 34 provincial-level administrative units are rendered.

The source geometry is derived from public Tianditu/GeoJSON.cn vectors and simplified for web display. For research requiring legally authoritative boundaries or survey-grade precision, cite and obtain the relevant official dataset directly from the National Geomatics Center of China. See [China's public map-data portal](https://www.webmap.cn/main.do?method=index1).

The Hugging Face dataset is public under CC BY-NC-SA 4.0. The map uses only its metadata and links; it does not include audio.
