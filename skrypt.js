$(function(){
	var map = L.map('mapa');

	warstwa=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   	 attribution: 'Źródło danych; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 10
});
	map.setView(new L.LatLng(52,21),6);
	map.addLayer(warstwa);
	
});	