// map class initialize
var map = L.map('map').setView([-1.2939, 36.8683], 12);
map.zoomControl.setPosition('topright');

// adding various tilelayer
var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer(
  'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
  {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }
);

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});

//add map scale
L.control.scale().addTo(map);

//Map coordinate display
map.on('mousemove', function (e) {
  $('.coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`);
});

//Geojson load zoning centroids
var centroids = L.markerClusterGroup();
var data = L.geoJSON(data, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.Zone_ID);
  },
});
data.addTo(centroids);
centroids.addTo(map);

//Geojson load city boundary
const cBoundary = L.markerClusterGroup();
const bdata = L.geoJSON(boundary, {
  onEachFeature: function (feature, layer) {
    layer.setStyle({ color: 'red', fillColor: '#30D5C8' });
  },
});
bdata.addTo(cBoundary);
cBoundary.addTo(map);

//Geojson load city administrative wards
var adminwards = L.markerClusterGroup();
var wardadmin = L.geoJSON(wards, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.ward);
    layer.setStyle({ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 });
  },
});
wardadmin.addTo(adminwards);
adminwards.addTo(map);

//Geojson load city survey blocks 2020
var surveyblocks = L.markerClusterGroup();
var surv = L.geoJSON(survey, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.Name);
    layer.setStyle({ color: 'purple', fillColor: 'grey', fillOpacity: 0.3 });
  },
});
surv.addTo(surveyblocks);
surveyblocks.addTo(map);

//Geojson load Nairobi villages
var nairobiVillages = L.markerClusterGroup();
var vill = L.geoJSON(villages, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.EANAME);
    layer.setStyle({ color: 'black' });
  },
});
vill.addTo(nairobiVillages);
nairobiVillages.addTo(map);

//Geojson load Nairobi SUBLOCATIONS
var nairobiSublocs = L.markerClusterGroup();
var sublocs = L.geoJSON(sublocations, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.SLNAME);
    layer.setStyle({ color: 'Purple', fillColor: '#17436E', fillOpacity: 0.3 });
  },
});
sublocs.addTo(nairobiSublocs);
nairobiSublocs.addTo(map);

//Geojson load city zoning polys
var cityzones = L.markerClusterGroup();
var zones = L.geoJSON(zoning, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.Name);
    layer.setStyle({ color: 'blue', fillColor: '#13433E', fillOpacity: 0.3 });
  },
});
zones.addTo(cityzones);
cityzones.addTo(map);

//Leaflet layer control
var baseMaps = {
  'Google Hybrid': googleHybrid,
  'Google Streets': googleStreets,
  'Google Satelite': googleSat,
  'Google Terrain': googleTerrain,
};

var overlayMaps = {
  'City Boundary': cBoundary,
  'City Villages': nairobiVillages,
  'City Sublocations': nairobiSublocs,
  'City Wards': adminwards,
  'Zoning Controls': cityzones,
  'Zoning Centroids': centroids,
  'Survey Blocks': surveyblocks,
};

L.control
  .layers(baseMaps, overlayMaps, { collapsed: false, position: 'topleft' })
  .addTo(map);
