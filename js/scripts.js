function drawRegionsMap() {
	queryWorldBank();
};

function done(){};

function queryWorldBank() {

	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('string', 'Country');
	dataTable.addColumn('number', 'Internet Users');

	var countryCodes = ["AFG","ALB","DZA","ASM","AND","AGO","ATG","ARG","ARM","ABW","AUS","AUT","AZE","BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BIH","BWA","BRA","BRN","BGR","BFA","BDI","KHM","CMR","CAN","CPV","CYM","CAF","TCD","CHL","CHN","COL","COM","COG","COD","CRI","CIV","HRV","CUB","CYP","CZE","DNK","DJI","DMA","DOM","TMP","ECU","EGY","SLV","GNQ","ERI","EST","ETH ","FRO","FJI","FIN","FRA","PYF","GAB","GMB","GEO","DEU","GHA","GRC","GRL","GRD","GUM","GTM","GIN","GNB","GUY","HTI","HND","HKG","HUN","ISL","IND","IDN","IRN","IRQ","IRL","ISR","ITA","JAM","JPN","JOR","KAZ","KEN","KIR","PRK","KOR","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY","LIE","LTU","LUX","MAC","MKD","MDG","MWI","MYS","MDV","MLI","MLT","MHL","MRT","MUS","MEX","FSM","MDA","MCO","MNG","MNE","MAR","MOZ","MMR","NAM","NPL","NLD","NCL","NZL","NIC","NER","NGA","MNP","NOR","OMN","PAK","PLW","PAN","PNG","PRY","PER","PHL","POL","PRT","PRI","QAT","ROM","RUS","RWA","KNA","LCA","VCT","WSM","SMR","STP","SAU","SEN","SRB", "SYC", "SLE","SGP","SVK","SVN","SLB","SOM","ZAF","SSD","ESP","LKA","SDN","SUR","SWZ","SWE","CHE","SYR","TJK","TZA","THA","TGO","TON","TTO","TUN","TUR","TKM","TCA","TUV","UGA","UKR","ARE","GBR","USA","URY","UZB","VUT","VEN","VNM","VIR","YEM","ZMB","ZWE"];

	url = "http://api.worldbank.org/countries/all/indicators/IT.NET.USER.P2?per_page=5000&date=2000:2012&format=jsonP&prefix=?";
	population_url = "http://api.worldbank.org/countries/indicators/SP.POP.TOTL?per_page=5000&date=2000:2012&format=jsonP&prefix=?";
	literacy_url = "http://api.worldbank.org/countries/indicators/SE.ADT.LITR.ZS?per_page=5000&date=2000:2012&format=jsonP&prefix=?";
	gdp_per_capita = "http://api.worldbank.org/countries/indicators/NY.GDP.PCAP.CD?per_page=5000&date=2000:2012&format=jsonP&prefix=?";
	combined_url = "http://api.worldbank.org/countries/all/indicators/SP.POP.TOTL;IT.NET.USER.P2;NY.GDP.PCAP.CD?source=2&date=2000:2012&per_page=15000&format=jsonP&prefix=?";

	var combined_url = "http://api.worldbank.org/countries/AFG;ALB;DZA;ASM;AND;AGO;ATG;ARG;ARM;ABW;AUS;AUT;AZE;BHS;BHR;BGD;BRB;BLR;BEL;BLZ;BEN;BMU;BTN;BOL;BIH;BWA;BRA;BRN;BGR;BFA;BDI;KHM;CMR;CAN;CPV;CYM;CAF;TCD;CHL;CHN;COL;COM;COG;COD;CRI;CIV;HRV;CUB;CYP;CZE;DNK;DJI;DMA;DOM;TMP;ECU;EGY;SLV;GNQ;ERI;EST;ETH ;FRO;FJI;FIN;FRA;PYF;GAB;GMB;GEO;DEU;GHA;GRC;GRL;GRD;GUM;GTM;GIN;GNB;GUY;HTI;HND;HKG;HUN;ISL;IND;IDN;IRN;IRQ;IRL;ISR;ITA;JAM;JPN;JOR;KAZ;KEN;KIR;PRK;KOR;KWT;KGZ;LAO;LVA;LBN;LSO;LBR;LBY;LIE;LTU;LUX;MAC;MKD;MDG;MWI;MYS;MDV;MLI;MLT;MHL;MRT;MUS;MEX;FSM;MDA;MCO;MNG;MNE;MAR;MOZ;MMR;NAM;NPL;NLD;NCL;NZL;NIC;NER;NGA;MNP;NOR;OMN;PAK;PLW;PAN;PNG;PRY;PER;PHL;POL;PRT;PRI;QAT;ROM;RUS;RWA;KNA;LCA;VCT;WSM;SMR;STP;SAU;SEN;SRB;SYC;SLE;SGP;SVK;SVN;SLB;SOM;ZAF;SSD;ESP;LKA;SDN;SUR;SWZ;SWE;CHE;SYR;TJK;TZA;THA;TGO;TON;TTO;TUN;TUR;TKM;TCA;TUV;UGA;UKR;ARE;GBR;USA;URY;UZB;VUT;VEN;VNM;VIR;YEM;ZMB;ZWE/indicators/SP.POP.TOTL;IT.NET.USER.P2;NY.GDP.PCAP.CD?source=2&date=2000:2012&per_page=15000&format=jsonP&prefix=?";

	var country_url;

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
	               /*
	               thisCountry = countryData[0];
	               console.log(countryData);
	               console.log(thisCountry);
	               console.log(thisCountry.country.id);
	               console.log(parseInt(thisCountry.value));
	               */

	               var name;
	               var percent;
	               for(var i in countryData) {
	               	if (countryData[i].indicator.id == 'IT.NET.USER.P2' && countryData[i].date == '2012') {
	               		name = countryData[i].country.id;
	               		console.log(name);
	               		percent = parseInt(countryData[i].value);
	               		if (!isNaN(percent)) {
	               			dataTable.addRow([name, percent]);
	               			console.log(percent);
	               		}
	               	}
	               }


	               var regionOptions = {};  
	               regionOptions['width'] = '1000';  
	               regionOptions['height'] = '600'; 

	               var chart = new google.visualization.GeoChart(document.getElementById('map_div'));
	               chart.draw(dataTable, regionOptions);
	           }
	       });
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







