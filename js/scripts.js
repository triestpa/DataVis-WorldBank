

var chart;
var motionchart;
var countryData = null;

var animating = false;

var maxyear;

var regionOptions = {};




function init() {
	maxyear = new Date().getFullYear() -2;

	var jumboHeight = $('.jumbotron').outerHeight();
	function parallax(){
		var scrolled = $(window).scrollTop();
		$('.bg').css('height', (jumboHeight-scrolled) + 'px');
	}

	$(window).scroll(function(e){
		parallax();
	});

	$('.carousel').carousel({
  			interval: 8000,
  			pause: 'false'
		});

	chart = new google.visualization.GeoChart(document.getElementById('map_div'));
	motionchart = new google.visualization.MotionChart(
		document.getElementById('visualization'));

	var options = {
		min: 1992,
		max: maxyear,
		step: 1,
		value: maxyear,
		tooltip: 'hide',
	};

	var yeariter = 1992;
	var playInterval;

	$('#year-text').text(maxyear);

	$('#year-slider').slider(options);
	
	$('#year-slider').slider()
	.on('slide', function(ev){
		animating = false;
		if (countryData != null) {
			$('#year-text').text(ev.value);
			yeariter = ev.value;
			generateGeoMap(countryData, ev.value);
		}
	});

	$("#map-button").click(function() {
		if (animating) {
			animating = false;
		}
		else {
			$("#playicon").attr('class', "glyphicon glyphicon-pause");
			animating = true;

			if (yeariter >= maxyear) {
				yeariter = 1992;
			}

			playInterval = setInterval(function() {
				if (yeariter <= maxyear && animating == true) {
					$('#year-text').text(yeariter);
					yeariter = slide(yeariter);
				}
				else {
					clearInterval(playInterval);
					animating = false;
					$("#playicon").attr('class', "glyphicon glyphicon-play");
				}
			}, 1000);
		}
	});

	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('string', 'Country');
	dataTable.addColumn('number', 'Internet Users(per 100 people)');

	regionOptions['colorAxis'] = {'minValue': 0, 'maxValue': 100, 'colors':['#FFFFFF','#E6F0FF','#CCE0FF','#B2D1FF','#99C2FF','#80B2FF','#66A3FF','#4D94FF','#3385FF','#1975FF','#0066FF','#005CE6','#0047B2','#003D99','#003380','#002966','#001F4C','#001433']};
	regionOptions['width'] = '1000';  
	regionOptions['height'] = '600'; 
	regionOptions['backgroundColor'] = 'transparent';

	chart.draw(dataTable, regionOptions);

/*
	$('#loading-modal').modal({
		keyboard: false,
		backdrop: false
	})
	$('#loading-modal').modal('show');
	*/

//	$('.alert').hide()			


loadFromCache();
queryWorldBank();
};


function slide(year) {
	$('#year-slider').slider('setValue', year);
	generateGeoMap(countryData, year);
	return year + 1;
};



function loadFromCache() {
		$('#cache-status').html('Loading From Cache . . . ');			
		$.getJSON('data/datacache.json', function(json) {
			countryData = json[1];
			if (countryData == null){
				$('.alert').html('Error Loading Data From Cache');			
			}
			else {
				generateGeoMap(countryData, '' + 2012);
				generateMotionChart(countryData);
			}
		})
		.done(function() {
				$('#cache-status').html('Cache Data Loaded Successfully');			
  })
  .fail(function() {
				$('#cache-status').html('Error Loading Data From Cache');			
  });

}

function done(){};

function queryWorldBank() {
	var combined_url = "http://api.worldbank.org/countries/AFG;ALB;DZA;ASM;AND;AGO;ATG;ARG;ARM;ABW;AUS;AUT;AZE;BHS;BHR;BGD;BRB;BLR;BEL;BLZ;BEN;BMU;BTN;BOL;BIH;BWA;BRA;BRN;BGR;BFA;BDI;KHM;CMR;CAN;CPV;CYM;CAF;TCD;CHL;CHN;COL;COM;COG;COD;CRI;CIV;HRV;CUB;CYP;CZE;DNK;DJI;DMA;DOM;TMP;ECU;EGY;SLV;GNQ;ERI;EST;ETH ;FRO;FJI;FIN;FRA;PYF;GAB;GMB;GEO;DEU;GHA;GRC;GRL;GRD;GUM;GTM;GIN;GNB;GUY;HTI;HND;HKG;HUN;ISL;IND;IDN;IRN;IRQ;IRL;ISR;ITA;JAM;JPN;JOR;KAZ;KEN;KIR;PRK;KOR;KWT;KGZ;LAO;LVA;LBN;LSO;LBR;LBY;LIE;LTU;LUX;MAC;MKD;MDG;MWI;MYS;MDV;MLI;MLT;MHL;MRT;MUS;MEX;FSM;MDA;MCO;MNG;MNE;MAR;MOZ;MMR;NAM;NPL;NLD;NCL;NZL;NIC;NER;NGA;MNP;NOR;OMN;PAK;PLW;PAN;PNG;PRY;PER;PHL;POL;PRT;PRI;QAT;ROM;RUS;RWA;KNA;LCA;VCT;WSM;SMR;STP;SAU;SEN;SRB;SYC;SLE;SGP;SVK;SVN;SLB;SOM;ZAF;SSD;ESP;LKA;SDN;SUR;SWZ;SWE;CHE;SYR;TJK;TZA;THA;TGO;TON;TTO;TUN;TUR;TKM;TCA;TUV;UGA;UKR;ARE;GBR;USA;URY;UZB;VUT;VEN;VNM;VIR;YEM;ZMB;ZWE/indicators/IT.NET.USER.P2;SP.POP.TOTL;NY.GDP.PCAP.PP.CD;IT.CEL.SETS.P2?source=2&date=1992:" + maxyear + "&per_page=25000&format=jsonP&prefix=?";
	//http://api.worldbank.org/countries/AFG;ALB;DZA;ASM;AND;AGO;ATG;ARG;ARM;ABW;AUS;AUT;AZE;BHS;BHR;BGD;BRB;BLR;BEL;BLZ;BEN;BMU;BTN;BOL;BIH;BWA;BRA;BRN;BGR;BFA;BDI;KHM;CMR;CAN;CPV;CYM;CAF;TCD;CHL;CHN;COL;COM;COG;COD;CRI;CIV;HRV;CUB;CYP;CZE;DNK;DJI;DMA;DOM;TMP;ECU;EGY;SLV;GNQ;ERI;EST;ETH ;FRO;FJI;FIN;FRA;PYF;GAB;GMB;GEO;DEU;GHA;GRC;GRL;GRD;GUM;GTM;GIN;GNB;GUY;HTI;HND;HKG;HUN;ISL;IND;IDN;IRN;IRQ;IRL;ISR;ITA;JAM;JPN;JOR;KAZ;KEN;KIR;PRK;KOR;KWT;KGZ;LAO;LVA;LBN;LSO;LBR;LBY;LIE;LTU;LUX;MAC;MKD;MDG;MWI;MYS;MDV;MLI;MLT;MHL;MRT;MUS;MEX;FSM;MDA;MCO;MNG;MNE;MAR;MOZ;MMR;NAM;NPL;NLD;NCL;NZL;NIC;NER;NGA;MNP;NOR;OMN;PAK;PLW;PAN;PNG;PRY;PER;PHL;POL;PRT;PRI;QAT;ROM;RUS;RWA;KNA;LCA;VCT;WSM;SMR;STP;SAU;SEN;SRB;SYC;SLE;SGP;SVK;SVN;SLB;SOM;ZAF;SSD;ESP;LKA;SDN;SUR;SWZ;SWE;CHE;SYR;TJK;TZA;THA;TGO;TON;TTO;TUN;TUR;TKM;TCA;TUV;UGA;UKR;ARE;GBR;USA;URY;UZB;VUT;VEN;VNM;VIR;YEM;ZMB;ZWE/indicators/IT.NET.USER.P2;NY.GDP.PCAP.CD;SP.POP.TOTL;IT.CEL.SETS.P2?source=2&date=1992:2012&per_page=20000

//	$('#loading-message').text('Downloading World Bank Data . . . ');

	$('#network-status').html('Downloading World Bank Data . . .');

	$.ajax({
		type: "GET",
		url: combined_url,
		async: true,
		cache: true,
		jsonpCallback: 'done',    
		contentType: "text/json; charset=utf-8",
		dataType: "jsonp", crossDomain: true,
		error: function(xhr, textStatus, errorThrown){ 
			$('.alert').html('Error Downloading Data');			
			console.log(textStatus + errorThrown);
			$('#loading-modal').modal('hide');
			$('.alert').show()			
		},
		success: function(data, textStatus){
			$('#network-status').html('World Bank Data Download Successful');
			
			//setTimeout(function() {$(".alert").alert('close');}, 3000);

			console.log(textStatus);
			countryData = data[1];
			if (countryData == null){
				$('.alert').html('Error Downloading World Bank Data');			
			}
			else {
				generateGeoMap(countryData, '' + maxyear);
				generateMotionChart(countryData);
			}
		}
	});
}

function generateGeoMap(data, year) {
	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('string', 'Country');
	dataTable.addColumn('number', 'Internet Users(per 100 people)');

	var name;
	var percent;
	for(var i in data) {
		if (data[i].indicator.id == 'IT.NET.USER.P2' && data[i].date == year) {
			name = data[i].country.id;
			percent = parseInt(data[i].value);
			if (!isNaN(percent)) {
				dataTable.addRow([name, percent]);
			}
		}
	}

	chart.draw(dataTable, regionOptions);
}

function generateMotionChart(data) {
	var dataTable2 = new google.visualization.DataTable();

	dataTable2.addColumn('string', 'Country');
	dataTable2.addColumn('date', 'Date');
	dataTable2.addColumn('number', 'Internet Users(per 100 people)');
	dataTable2.addColumn('number', 'Population');
	dataTable2.addColumn('number', 'GDP(PPP) per Capita');
	dataTable2.addColumn('number', 'Cellular Subscriptions(per 100 people)');


	var name;
	var date;
	var internet_users;
	var population;
	var gdp;

	for(var i in data) {
		if (data[i].indicator.id == 'IT.NET.USER.P2') {
			name = data[i].country.value;
			date = new Date(data[i].date,0,1);
			percent = parseInt(data[i].value);
			if (!isNaN(percent)) {
				dataTable2.addRow([name, date, percent,0, 0, 0]);
			}
			else 
				dataTable2.addRow([name, date, 0, 0, 0, 0]);
		}
	}
	
	var rows = dataTable2.getNumberOfRows();

	var population;
	
	for(var i = 0; i < rows; i++) {
		thisRow = i+rows;
		if (data[thisRow].indicator.id == 'SP.POP.TOTL') {
			dataTable2.setCell(parseInt(thisRow - rows), 3 , parseInt(data[thisRow].value));
		}
	}

	for(var i = 0; i < rows; i++) {
		thisRow = i+(rows*2);
		if (data[thisRow].indicator.id == 'NY.GDP.PCAP.PP.CD') {
			dataTable2.setCell(parseInt(thisRow - (rows*2)), 4 , parseInt(data[thisRow].value));
		}
	}

	for(var i = 0; i < rows; i++) {
		thisRow = i+(rows*3);
		if (data[thisRow].indicator.id == 'IT.CEL.SETS.P2') {
			dataTable2.setCell(parseInt(thisRow - (rows*3)), 5 , parseInt(data[thisRow].value));
		}
	}

	var options = {};
	options['state'] = '{"yZoomedIn":false,"nonSelectedAlpha":0.4,"xZoomedDataMax":96,"sizeOption":"3","xZoomedIn":false,"showTrails":false,"uniColorForNonSelected":false,"yZoomedDataMax":193892,"colorOption":"5","iconType":"BUBBLE","xLambda":1,"yZoomedDataMin":133,"xZoomedDataMin":0,"orderedByY":false,"dimensions":{"iconDimensions":["dim0"]},"time":"2012","xAxisOption":"2","orderedByX":false,"yLambda":0,"playDuration":15000,"iconKeySettings":[],"yAxisOption":"4","duration":{"timeUnit":"D","multiplier":1}}';
	options['width'] = 1000;
	options['height'] = 500;
	options['showAdvancedPanel'] = false;
	options['showChartButtons'] = false;

	motionchart.draw(dataTable2, options);
	$('#loading-modal').modal('hide');
}
