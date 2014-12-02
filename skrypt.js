$(function(){
	$("#czysc").hide();
	$("#wms1").hide();
	$("#wms2").hide();
	$("#wms3").hide();
	var warstwa_osm=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   	 attribution: 'Źródło danych; <a href="http://openstreetmap.org">OpenStreetMap</a>',
	}),
		warstwa_esriTopo=L.esri.basemapLayer('Topographic'),
		warstwa_esriSat=L.esri.basemapLayer('Imagery');
		etykiety=  L.esri.basemapLayer('ImageryLabels');
		
	var map = L.map('mapa',{
		center: [52.730703,15.240615],
		zoom:15,
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
var mojStyl = {
    "color": "#998350",
    "opacity": 0.8
};
var miejsca = new L.geoJson(miejscaGW, {
	onEachFeature:onEachFeature,
	style:mojStyl
   });
var licznik_miejsca=0;
    $("#miejsca").click(function(){
    	licznik_miejsca+=1;
    	if(licznik_miejsca%2==0){
    		map.removeLayer(miejsca);
    		$("#miejsca").css("opacity",1);
    	}else{
			miejsca.addTo(map);
			$("#miejsca").css("opacity",0.5);}
	});
	
	var licznik_wmsy=0;
	var l_wms1=0;
	var l_wms2=0;
	var l_wms3=0;

	$("#wms").click(function(){
		licznik_wmsy+=1;
		if (licznik_wmsy%2==0){
			$("#wms1").hide();
			$("#wms2").hide();
			$("#wms3").hide();
			$("#wms").css("opacity",1);
		}else{
			$("#wms1").show();
			$("#wms2").show();
			$("#wms3").show();
			$("#wms").css("opacity",0.5);
		}
	});
	
	var warstwaWMS1= new L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/INSPIRE_TN_TBD/guest",
	{	format:"image/png",
		transparent:true,
		layers:"TN.RoadTransportNetwork.RoadLink"});
		
	var warstwaWMS2= new L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/INSPIRE_AD/guest",
	{	format:"image/png",
		transparent:true,
		layers:"AD.Address"});
	
	var warstwaWMS3= new L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/INSPIRE_CP/guest",
	{	format:"image/png",
		transparent:true,
		layers:"CP.CadastralParcel"});
		
	$("#wms1").click(function(){
		l_wms1+=1;
		if(l_wms1%2==0){
			$("#wms1").css("opacity",1);
			map.removeLayer(warstwaWMS1);
		}else{
			warstwaWMS1.addTo(map);
			warstwaWMS1.bringToFront();
			$("#wms1").css("opacity",0.5);
		}});
	$("#wms2").click(function(){
		l_wms2+=1;
		if(l_wms2%2==0){
			$("#wms2").css("opacity",1);
			map.removeLayer(warstwaWMS2);
		}else{
			warstwaWMS2.addTo(map);
			warstwaWMS2.bringToFront();
			$("#wms2").css("opacity",0.5);
		}});
		$("#wms3").click(function(){
		l_wms3+=1;
		if(l_wms3%2==0){
			$("#wms3").css("opacity",1);
			map.removeLayer(warstwaWMS3);
		}else{
			warstwaWMS3.addTo(map);
			warstwaWMS3.bringToFront();
			$("#wms3").css("opacity",0.5);
		}});
	
	
    var punkty = new L.FeatureGroup();
    
	function markerki(){
		var markery=[];
		map.on("click",function(e){
			var marker = new L.marker(e.latlng).addTo(punkty);
			marker.bindPopup("<b>Moje współrzędne to:</b><br> Lat: "+Math.round(e.latlng.lat*1000000)/1000000 + " Lng: "+Math.round(e.latlng.lng*1000000)/1000000);
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
		punkty.clearLayers();
	});

});	