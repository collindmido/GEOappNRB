// map class initialize
var map = L.map('map').setView([-1.2939, 36.8683], 12);
map.zoomControl.setPosition('topright');

// adding various tilelayer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var st = L.tileLayer(
  'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}',
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png',
  }
).addTo(map);

var Esri_StreetMap = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  {
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
  }
);

//add map scale
L.control.scale().addTo(map);

//Map coordinate display
map.on('mousemove', function (e) {
  $('.coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`);
});

//Geojson load city administrative wards
var nairobiwards = L.markerClusterGroup();
var wards = L.geoJSON(ward, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.WARDNAME);
    layer.setStyle({ color: "black", fillColor: "#30D5C8", fillOpacity: 0.2 });
  },
});
wards.addTo(nairobiwards);
nairobiwards.addTo(map);

//Leaflet layer control
var baseMaps = {
    OpenStreetMaps: osm,
    "Stamen Toner": st,
    "Esri StreetMap": Esri_StreetMap,
    "Esri World Imagery": Esri_WorldImagery,
};

var overlayMaps = {
    "Nairobi Villages": villages,
    "Nairobi Sublocations": sublocations,
    "Nairobi Locations": locations,
    "Nairobi Divisions": divisions,
  "Nairobi Districts": districts,
  "Nairobi Wards": ward,
  };
  
L.control
  .layers(baseMaps, overlayMaps, { collapsed: false, position: "topleft" })
  .addTo(map);
