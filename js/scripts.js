

var chart;
var countryData = null;


function drawRegionsMap() {
	chart = new google.visualization.GeoChart(document.getElementById('map_div'));

		var options = {
		min: 1992,
		max: 2012,
		step: 1,
		value: 2000,
		tooltip: 'show',
	};

	$('#year-slider').slider(options);
	
	$('#year-slider').slider()
  		.on('slide', function(ev){
  			if (countryData != null) {}
  				console.log(countryData);
  			  	console.log(ev.value);

   				generateGeoMap(countryData, ev.value);
  });
	
	queryWorldBank();

};

function done(){};



function queryWorldBank() {
	var countryCodes = ["AFG","ALB","DZA","ASM","AND","AGO","ATG","ARG","ARM","ABW","AUS","AUT","AZE","BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BIH","BWA","BRA","BRN","BGR","BFA","BDI","KHM","CMR","CAN","CPV","CYM","CAF","TCD","CHL","CHN","COL","COM","COG","COD","CRI","CIV","HRV","CUB","CYP","CZE","DNK","DJI","DMA","DOM","TMP","ECU","EGY","SLV","GNQ","ERI","EST","ETH ","FRO","FJI","FIN","FRA","PYF","GAB","GMB","GEO","DEU","GHA","GRC","GRL","GRD","GUM","GTM","GIN","GNB","GUY","HTI","HND","HKG","HUN","ISL","IND","IDN","IRN","IRQ","IRL","ISR","ITA","JAM","JPN","JOR","KAZ","KEN","KIR","PRK","KOR","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY","LIE","LTU","LUX","MAC","MKD","MDG","MWI","MYS","MDV","MLI","MLT","MHL","MRT","MUS","MEX","FSM","MDA","MCO","MNG","MNE","MAR","MOZ","MMR","NAM","NPL","NLD","NCL","NZL","NIC","NER","NGA","MNP","NOR","OMN","PAK","PLW","PAN","PNG","PRY","PER","PHL","POL","PRT","PRI","QAT","ROM","RUS","RWA","KNA","LCA","VCT","WSM","SMR","STP","SAU","SEN","SRB", "SYC", "SLE","SGP","SVK","SVN","SLB","SOM","ZAF","SSD","ESP","LKA","SDN","SUR","SWZ","SWE","CHE","SYR","TJK","TZA","THA","TGO","TON","TTO","TUN","TUR","TKM","TCA","TUV","UGA","UKR","ARE","GBR","USA","URY","UZB","VUT","VEN","VNM","VIR","YEM","ZMB","ZWE"];

	url = "http://api.worldbank.org/countries/all/indicators/IT.NET.USER.P2?per_page=5000&date=2000:2012&format=jsonP&prefix=?";
	population_url = "http://api.worldbank.org/countries/indicators/SP.POP.TOTL?per_page=5000&date=2000:2012&format=jsonP&prefix=?";
	gdp_per_capita = "http://api.worldbank.org/countries/indicators/NY.GDP.PCAP.CD?per_page=5000&date=2000:2012&format=jsonP&prefix=?";

	var combined_url = "http://api.worldbank.org/countries/AFG;ALB;DZA;ASM;AND;AGO;ATG;ARG;ARM;ABW;AUS;AUT;AZE;BHS;BHR;BGD;BRB;BLR;BEL;BLZ;BEN;BMU;BTN;BOL;BIH;BWA;BRA;BRN;BGR;BFA;BDI;KHM;CMR;CAN;CPV;CYM;CAF;TCD;CHL;CHN;COL;COM;COG;COD;CRI;CIV;HRV;CUB;CYP;CZE;DNK;DJI;DMA;DOM;TMP;ECU;EGY;SLV;GNQ;ERI;EST;ETH ;FRO;FJI;FIN;FRA;PYF;GAB;GMB;GEO;DEU;GHA;GRC;GRL;GRD;GUM;GTM;GIN;GNB;GUY;HTI;HND;HKG;HUN;ISL;IND;IDN;IRN;IRQ;IRL;ISR;ITA;JAM;JPN;JOR;KAZ;KEN;KIR;PRK;KOR;KWT;KGZ;LAO;LVA;LBN;LSO;LBR;LBY;LIE;LTU;LUX;MAC;MKD;MDG;MWI;MYS;MDV;MLI;MLT;MHL;MRT;MUS;MEX;FSM;MDA;MCO;MNG;MNE;MAR;MOZ;MMR;NAM;NPL;NLD;NCL;NZL;NIC;NER;NGA;MNP;NOR;OMN;PAK;PLW;PAN;PNG;PRY;PER;PHL;POL;PRT;PRI;QAT;ROM;RUS;RWA;KNA;LCA;VCT;WSM;SMR;STP;SAU;SEN;SRB;SYC;SLE;SGP;SVK;SVN;SLB;SOM;ZAF;SSD;ESP;LKA;SDN;SUR;SWZ;SWE;CHE;SYR;TJK;TZA;THA;TGO;TON;TTO;TUN;TUR;TKM;TCA;TUV;UGA;UKR;ARE;GBR;USA;URY;UZB;VUT;VEN;VNM;VIR;YEM;ZMB;ZWE/indicators/SP.POP.TOTL;IT.NET.USER.P2;NY.GDP.PCAP.CD?source=2&date=1992:2012&per_page=20000&format=jsonP&prefix=?";


	$.ajax({
		type: "GET",
		url: combined_url,
		async: true,
		cache: false,
		jsonpCallback: 'done',    
		contentType: "text/json; charset=utf-8",
		dataType: "jsonp",crossDomain: true,
		error: function(xhr, textStatus, errorThrown){ 
			console.log(textStatus + errorThrown);
		},
		success: function(data, textStatus){
			console.log(textStatus);
			countryData = data[1];
			generateGeoMap(countryData, '2012');
		}
	});
}

function generateGeoMap(data, year) {
	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('string', 'Country');
	dataTable.addColumn('number', 'Internet Users');

	var name;
	var percent;
	for(var i in data) {
		if (data[i].indicator.id == 'IT.NET.USER.P2' && data[i].date == year) {
			name = data[i].country.id;
			console.log(name);
			percent = parseInt(data[i].value);
			if (!isNaN(percent)) {
				dataTable.addRow([name, percent]);
				console.log(percent);
			}
		}
	}

	var regionOptions = {};
	regionOptions['colorAxis'] = {'minValue': 0, 'maxValue': 100};
	regionOptions['width'] = '1000';  
	regionOptions['height'] = '600'; 

	chart.draw(dataTable, regionOptions);
}



/*
  					var dataTable2 = new google.visualization.DataTable();

					//console.log(dataTable);

					dataTable2.addColumn('string', 'Country');
					dataTable2.addColumn('date', 'Date');
					dataTable2.addColumn('number', 'Internet Users');
  					dataTable.addColumn('number', 'Population');
  					dataTable.addColumn('number', 'GDP');

					var name;
					var percent;
					var date;
					var region;

					  for(var i in countryData) {
					  	name = countryData[i].country.value;
					  	console.log(name);
					  	percent = parseInt(countryData[i].value);
					  	date = new Date(countryData[i].date,0,1)
					  	if (!isNaN(percent)) {
					    	dataTable2.addRow([name, date, percent]);
					    }
					}
					}
				})
			}


  					var options = {};
					options['state'] = {"yZoomedIn":false,"xZoomedDataMax":96,"nonSelectedAlpha":0.4,"sizeOption":"2","xAxisOption":"2","orderedByY":false,"orderedByX":false,"iconKeySettings":[],"yZoomedDataMax":96,"iconType":"BUBBLE","xZoomedIn":false,"xLambda":1,"yZoomedDataMin":0,"yLambda":1,"dimensions":{"iconDimensions":["dim0"]},"showTrails":true,"uniColorForNonSelected":false,"yAxisOption":"2","colorOption":"2","playDuration":15000,"time":"2000","xZoomedDataMin":0,"duration":{"timeUnit":"D","multiplier":1}};
					options['width'] = 800;
					options['height'] = 400;
					//options['showSidePanel'] = false;

					var motionchart = new google.visualization.MotionChart(
						document.getElementById('visualization'));
						motionchart.draw(dataTable2, options);
						*/







