$(function(){
	$("#czysc").hide();
	var warstwa_osm=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   	 attribution: 'Źródło danych; <a href="http://openstreetmap.org">OpenStreetMap</a>',
	}),
		warstwa_esriTopo=L.esri.basemapLayer('Topographic'),
		warstwa_esriSat=L.esri.basemapLayer('Imagery');
		etykiety=  L.esri.basemapLayer('ImageryLabels');
		
	var map = L.map('mapa',{
		center: [52.731767,15.238472],
		zoom:14,
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
		collapsed:true,
		position:"topleft"
	}).addTo(map);

	L.control.zoom({
		position:"bottomleft",
		zoomInTitle:"Przybliż",
		zoomOutTitle:"Oddal"
	}).addTo(map);
	
function onEachFeature(feature,layer){
	if(feature.properties){
		layer.bindPopup("<table><tr><td><b>"+feature.properties.nazwa+"</b><br>"+feature.properties.opis+"<br></td><td><img src="+feature.properties.zdjecie+" width=100 height=100/></td></tr><tr><td></td><td></tr></table><a target=&quot;_blank&quot; href="+feature.properties.linki+"> Dowiedz się więcej o tym miejscu! </a>");
	}
}
var miejsca = new L.geoJson(miejscaGW, {
	onEachFeature:onEachFeature
   });
var licznik_miejsca=0;
    $("#miejsca").click(function(){
    	licznik_miejsca+=1;
    	if(licznik_miejsca%2==0){
    		$("#miejsca").css("opacity",1);
    		map.removeLayer(miejsca);
    	}else
			miejsca.addTo(map);
			$("#miejsca").css("opacity",0.5);
	});

    var punkty = new L.FeatureGroup();
    
	function markerki(){
		var markery=[];
		map.on("click",function(e){
			var marker = new L.marker(e.latlng).addTo(punkty);
			marker.bindPopup("Lat: "+Math.round(e.latlng.lat*1000000)/1000000 + " Lng: "+Math.round(e.latlng.lng*1000000)/1000000);
			marker.addTo(markery);
			if (markery.index(marker)==-1){
				markery.push(marker);
			}else{
				for (i=0;i<markery.length;i++){
					if (markery[i].getLatLng()==e.latlng){
							markery[i].openPopup();
				};
			}}
		});
		map.addLayer(punkty);
	}
	var licznik_markery=0;
	$("#punkt").click(function(){
		licznik_markery+=1;
		if (licznik_markery%2==0){
				$("#czysc").hide();
				$("#punkt").css("opacity",1);
		}else{		
		markerki();
		$("#czysc").show();
		$("#punkt").css("opacity",0.5);
		}
	});
	
	$("#czysc").click(function(){
		map.removeLayer(punkty);
	});
	
	
});	