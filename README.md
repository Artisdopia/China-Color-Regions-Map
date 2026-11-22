# China-Color-Regions-Map
Interactive map of Chinese folk song recordings by color region

# China Color Regions Map

An interactive map for exploring the Project Aquarius Chinese folk song collection by color region and recording province.

## Explore the map

[Open the interactive map](https://artisdopia.github.io/China-Color-Regions-Map/)

- Hover over or select a color-region marker to explore the region.
- Select a province to see its recordings and dataset tags.
- Click a tag to find matching recordings from that province.
- Use the map controls to zoom in and out.

The map summarizes the collection’s 15 color regions for folk songs. Circle sizes represent recording counts. A province can include recordings classified in more than one color region, so the regional tags shown for a province describe the recordings collected there.

## Data and sources

- Song metadata: [ProjectAquarius/colour-regions](https://huggingface.co/datasets/ProjectAquarius/colour-regions)
- Boundary geometry: Tianditu data distributed as GeoJSON by [GeoJSON.cn](https://geojson.cn/data/atlas/tiandi). Geometry is simplified for web display.
- Song links open the associated YouTube videos; this site does not host audio.
- Some English song titles and tags are machine-translated.

## Run locally

Download and extract the map folder. Open PowerShell in the folder containing `index.html`, then run:

```powershell
py -m http.server 8001
