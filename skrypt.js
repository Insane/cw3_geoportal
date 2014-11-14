$(function(){
	var warstwa_osm=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   	 attribution: 'Źródło danych; <a href="http://openstreetmap.org">OpenStreetMap</a>',
	}),
		warstwa_esriTopo=L.esri.basemapLayer('Topographic'),
		warstwa_esriSat=L.esri.basemapLayer('Imagery');
		etykiety=  L.esri.basemapLayer('ImageryLabels');
		
	var map = L.map('mapa',{
		center: [52,18],
		zoom:6,
		zoomControl:false,
		layers:[warstwa_osm]
		});
	skala=L.control.scale({
		position:"bottomleft",
		metric: true,
		maxWidth: 100,
		updateWhenIdle:true,
		imperial:false
		});
	skala.addTo(map);
	
	var baseMaps={
		"OpenStreetMap":warstwa_osm,
		"Mapa topograficzna (ESRI)":warstwa_esriTopo,
		"Zdjęcia satelitarne (ESRI)":warstwa_esriSat
		};
	var inne={
		"Etykiety (ESRI)":etykiety
	};
	L.control.layers(baseMaps,inne,{
		collapsed:false,
		position:"topleft"
	}).addTo(map);
	
	L.control.zoom({
		position:"bottomleft",
		zoomInTitle:"Przybliż",
		zoomOutTitle:"Oddal"
	}).addTo(map);
	

	
});	