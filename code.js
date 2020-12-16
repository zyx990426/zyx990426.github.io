// Global constants
const DEBUG = true;
const background = 'rgba(255, 255, 255, 1)';

// Some little helpers
const log = msg => (DEBUG ? console.log(msg) : '');
const select = id => document.getElementById(id);
async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

// Set theme
Highcharts.theme = {
    colors: ['#FFCE00', '#0375B4', '#8d4654', '#7798BF', '#aaeeee',
        '#ff0066', '#eeaaee', '#55BF3B', '#DF5353'],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: 'Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;'
        }
    },
    title: {
        style: {
            color: 'black',
            fontSize: '16px',
			fontWeight: 'bold',
			backgroundColor: null,
        }
    },
    subtitle: {
        style: {
            color: 'black'
        }
    },
    tooltip: {
        borderWidth: 0
    },
    labels: {
        style: {
            color: '#6e6e70'
        }
    },
    legend: {
        backgroundColor: null,
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    yAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#404048'
        },
        map: {
            shadow: false
        }
    },
    // Highstock specific
    navigator: {
        xAxis: {
            gridLineColor: '#D0D0D8'
        }
    },
    rangeSelector: {
        buttonTheme: {
            fill: 'white',
            stroke: '#C0C0C8',
            'stroke-width': 1,
            states: {
                select: {
                    fill: '#D0D0D8'
                }
            }
        }
    },
    scrollbar: {
        trackBorderColor: '#C0C0C8'
    }
};
Highcharts.setOptions(Highcharts.theme);
Highcharts.setOptions({
	title: {
		useHTML: true
	},
	subtitle: {
		useHTML: true
	}
})


// Chart 1 - Possessions and Wining
function plotBubble(game_data, team){

	// let bubbledata = game_data['games']
	// console.log(bubbledata['games'])
	let bubbledata = game_data
	let teamname = ''

	let win = []
	let lose = []
	for (i = 0; i < bubbledata.length; i++) {
		if (bubbledata[i]['Win'] == 1){
			win.push(bubbledata[i])
		}
		else {
			lose.push(bubbledata[i])
		}
	}

	let current_id = '';
	if (team == 'barcelona'){
		current_id = 'bubble-barcelona';
		teamname = 'F.C. Barcelona'
	} else if (team == 'chelsea'){
		current_id = 'bubble-chelsea';
		teamname = 'Chelsea F.C.'
	} else {
		console.log('[ERROR] Failed to find team name:', team);
		return;
	}

	Highcharts.chart(current_id, {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
			zoomType: 'xy',
			backgroundColor: background,
			useHTML: true
        },
		legend: {
			align: 'left',
			layout: 'vertical',
			floating: true,
			verticalAlign: 'top'
		},
        title: {
			text: '<h4>' + teamname + '</h4>',
			useHTML: true
		},
		subtitle: {
			text: '<h6>(Domestic League and Cups)</h6>',
			useHTML: true
		},
        xAxis: {
			// tickInterval: 5,
            gridLineWidth: 0,
            title: {
				text: '<p>Game#</p>'
			},
			
            labels: {
				useHTML: true,
            },
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 65,
                label: {
                    rotation: 0,
                    y: 15,
                    style: {
                        fontStyle: 'italic'
                    },
                    text: 'ABC'
                },
                zIndex: 3
            }],
            accessibility: {
                rangeDescription: 'abc'
            }
        },
        yAxis: {
			gridLineWidth:0,
  			// minorGridLineWidth: 0,
			max: 120,
			min: 0,
			// tickInterval: 5,
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Possession Rate'
            },
            maxPadding: 0.2,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 1,
                value: 50,
                label: {
                    align: 'right',
                    style: {
                        fontStyle: 'italic'
                    },
                    text: '50%',
					x: -10,
					useHTML: true
                },
                zIndex: 3
            }, {
                color: 'black',
                dashStyle: 'dot',
                width: 1,
                value: 75,
                label: {
                    align: 'right',
                    style: {
                        fontStyle: 'italic'
                    },
                    text: '75%',
					x: -10,
					useHTML: true
                },
                zIndex: 3
            }],
            accessibility: {
                rangeDescription: '666'
            }
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h5>{point.x}th Game</h5></th></tr>' +
                '<tr><th>Possession Rate:</th><td>{point.y}%</td></tr>',

            footerFormat: '</table>',
            followPointer: true
        },
        plotOptions: {
			bubble: {
				minSize: 10,
				maxSize: 10
			},
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
			},
			useHTML: true
        },
        series: [{
			data: win,
			name: "Win",
		},
		{
			data: lose,
			name: "Lose",
		}]
	});
}

// Chart 2 - Possessions 
function plotHistogram(bar_games, ch_games){
	// console.log(bar_games)
	Highcharts.chart('hist-chart', {
		chart: {
			type: 'column',
			backgroundColor: background,
			useHTML: true
		},
		title: {
			text: '<h4>Possession Distribution</h4>',
			useHTML: true
		},
		subtitle: {
			text: '<h6>(Domestic League and Cups)</h6>',
		 	useHTML: true
		},
		xAxis: {
		  	categories: [
				'< 30%',
				'30%~40%',
				'40%~50%',
				'50%~60%',
				'60%~70%',
				'>70%',
		  	],
			crosshair: true,
		},
		yAxis: {
		  	min: 0,
		  	title: {
				text: ''
		  	}
		},
		tooltip: {
		  	headerFormat: '<p style="font-size:10px">{point.key}</p><table>',
		  	pointFormat: '<tr><td style="color:{series.color};padding:0"><b>{series.name}: {point.y}</b></td></tr>',
		  	footerFormat: '</table>',
		  	shared: true,
		  	useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0,
				borderWidth: 0,
				groupPadding: 0,
				shadow: false
			},
			series: {
				borderWidth: 2,
				groupPadding: 4,
			}
		},
		series: [{
			name: 'F.C. Barcelona',
			data: bar_games
		},{
			name: 'Chelsea F.C',
			data: ch_games
		}]
	});
	// console.log(groupForHist(game_data[1])); 
}
function groupForHist(data){
	// Type of data: list of object.
	// e.g. [{"x": 1, "y": 0}, {"x": 2, "y": 11}]
	// console.log(data[0])
	const key = "y";
	let less30 = 0, less40 = 0, less50 = 0, less60 = 0, less70 = 0, more70 = 0;
	for (i = 0; i < data.length; i++){
		if(data[i][key] < 30){
			less30 += 1;
		} else if (data[i][key] < 40){
			less40 += 1;
		} else if (data[i][key] < 50){
			less50 += 1;
		} else if (data[i][key] < 60){
			less60 += 1;
		} else if (data[i][key] < 70){
			less70 += 1;
		} else {
			more70 += 1;
		}
	}
	// console.log(less70);
	return [less30, less40, less50, less60, less70, more70];
}

// Chart 3 - Players Values
function plotValuePieChart(values, team){
	// console.log(values['players']);
	let current_id = '', team_name = '';
	if (team == 'barcelona'){
		current_id = 'barcelona-player-values';
		team_name = 'F.C. Barcelona';
	} else if (team == 'chelsea') {
		current_id = 'chelsea-player-values';
		team_name = 'Chelsea F.C. ';
	} else {
		console.log('[ERROR] Failed to find team name:', team);
		return;
	}
	
	Highcharts.chart(current_id, {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
			backgroundColor: background
		},
		title: {
			text: '<h4>' + team_name + '</h4>'
		},
		subtitle: {
			text: '<h6>(In Season 18-19)</h6>'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
			point: {
				valueSuffix: '%'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %'
				},
				size: 160
			}
		},
		series: [{
			name: 'Player Value',
			colorByPoint: true,
			dataSorting: {
				enabled: true,
				sortKey: 'y',
				matchByName: true
			},
			data: values
		}]
	});
	// console.log('Pie!')
}

// Chart 4 - Radar Chart
function plotRadarChart(current_id, current_plot_type, values){
	// Sample input: values = {team: {plot_type: [[values], [keys]], ...}
	
	const x_labels = values['ch'][current_plot_type][1];
	const bar_values = values['bar'][current_plot_type][0]
	const ch_values = values['ch'][current_plot_type][0]
	
	Highcharts.chart(current_id, {

		chart: {
			polar: true,
			backgroundColor: background
		},
	
		title: {
			text: '<h4>Attack and Defense</h4>'
		},
		subtitle: {
			text: '<h6>(Domestic League and Cups)</h6>'
		},
	
		pane: {
			startAngle: 0,
			endAngle: 360
		},
	
		xAxis: {
			tickInterval: 60,
			min: 0,
			max: 360,
			labels: {
				formatter: function(){
            		return x_labels[(this.value/60)];
           		}
			}
		},
	
		yAxis: {
			min: 0,
			max: 100
		},
	
		plotOptions: {
			series: {
				pointStart: 0,
				pointInterval: 60
			},
			column: {
				pointPadding: 0,
				groupPadding: 0
			}
		},
	
		series: [{
			type: 'area',
			name: 'F.C. Barcelona',
			data: bar_values
		}, {
			type: 'area',
			name: 'Chelsea F.C.',
			data: ch_values
		}]
	});
}

// Chart 5 - Parliment Chart
function plotParlimentChart(current_id, data, team_name){
	// E.g. [['Messi', 36, '#BE3075', 'Messi'], [...]]

	Highcharts.chart(current_id, {

		chart: {
			type: 'item',
			backgroundColor: background
		},
	
		title: {
			text: '<h4>' + team_name + '</h4>'
		},
	
		subtitle: {
			text: '<h6>(Domestic League Only)</h6>'
		},
	
		legend: {
			labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
		},
	
		series: [{
			name: 'Goals',
			keys: ['name', 'y'],
			data: data,
			dataLabels: {
				enabled: true,
				format: '{point.name}'
			},
	
			// Circular options
			center: ['50%', '88%'],
			size: '170%',
			startAngle: -100,
			endAngle: 100
		}]
	});
}

// Chart 6 - Heat Map
function plotHeatMap(current_id, data, team_name){
	console.log(data);
	let max_color;
	if (team_name == 'Chelsea'){
		max_color = Highcharts.getOptions().colors[1];
	} else if (team_name == 'Barcelona'){
		max_color = Highcharts.getOptions().colors[0];
	}
	
	Highcharts.chart(current_id, {
		colorAxis: {
			minColor: '#FFFFFF',
			maxColor: max_color
		},
		title:{
			text: '<h4>' + team_name + '</h4>',
			useHTML: true
		},
		subtitle: {
			text: '<h6>(Domestic League Only)</h6>'
		},
		series: [{
			type: 'treemap',
			layoutAlgorithm: 'squarified',
			data: data
		}]
	});
}

function init() {
	// Chart 1 & 2 - Bubble Chart & Histogram
	let bar_games = [], ch_games = []
	bubbleData = loadJSON('./data/possession.json');
	bubbleData.then(function(values){
		plotBubble(values['bar'], 'barcelona');
		plotBubble(values['ch'], 'chelsea');

		bar_games = groupForHist(values['bar']);
		ch_games = (groupForHist(values['ch']));
		plotHistogram(bar_games, ch_games);
	});
	

	// Chart 3 - Pie Chart
	valuePie = loadJSON('./data/value.json');
	valuePie.then(function(values){
		plotValuePieChart(values['bar'], 'barcelona');
		plotValuePieChart(values['ch'], 'chelsea');
	})

	// Chart 4 - Radar Chart
	valueRader = loadJSON('./data/radar.json');
	valueRader.then(function(values){
		// plotRadarChart('radar-absolute-val', 'summ_stats', values);
		plotRadarChart('radar-perc-val', 'summ_stats_perc', values)
	})

	// Chart 5 - Parliment Chart
	valuePar = loadJSON('./data/parliment.json');
	valuePar.then(function(values){
		plotParlimentChart('parli-barcelona', values['bar'], 'F.C. Barcelona');
		plotParlimentChart('parli-chelsea', values['ch'], 'Chelsea F.C.');
	})

	valueHeatmap = loadJSON('./data/heatmap.json');
	valueHeatmap.then(function(values){
		console.log(values)
		plotHeatMap('heatmap-barcelona', values['bar'], 'Barcelona');
		plotHeatMap('heatmap-chelsea', values['ch'], 'Chelsea')
	})
	// plotHeatMap('heatmap-bar', 'data', 'team_name')
	
}

document.addEventListener('DOMContentLoaded', init, false);



// function plotMap() {

		
// 		Highcharts.mapChart('myMap', {
    		

// 			title:{
// 				text: "World Map"
// 			},

// 			legend: {
// 				enabled: false
// 			},

// 			plotOptions:{
// 				series:{
// 					point:{
// 						events:{
// 							click: function(){
// 								plotColumn(this.series.name);
// 								plotPie(this.series.name);
// 								updateScoreCards(this.series.name);
// 							}
// 						}
// 					}
// 				}
// 			},

// 			series: mapdata
// 		});
// }

// function plotSales(sales) {
// 	data = sales;
// 	plotMap();
// }

// function plotColumn(continent) {


// 	let KnifeValues = {
// 		data: [],
// 		name: "Knife"
// 	}
// 	let ForkValues = {
// 		data: [],
// 		name: "Fork"
// 	}
// 	let sales = data[continent];
// 	for (const datum of sales) {
// 		let month = datum['Month'];
// 		let Knife = datum['Knife'];
// 		let Fork = datum['Fork'];
// 		KnifeValues['data'].push([month, Knife]);
// 		ForkValues['data'].push([month, Fork]);
// 	}



// 	Highcharts.chart('salesPerMonthChart', {
// 		chart: {
// 			type: 'column'
// 		},

// 		title: {
// 			text: 'Monthly Sales',
// 			style: {
// 				fontSize: '18px',
// 			}
// 		},

// 		credits: {
// 			enabled: false
// 		},

// 		xAxis: {
// 		  	title: {
// 				text: 'Month',
// 				style: {
// 					fontSize: '15px',
// 				}
// 		  	},
// 			categories: ['January', 'February', 'March'],
	
// 			tickLength: 7,

// 		},

// 		yAxis: {
			
// 			title: {
// 				text: 'Number of units sold',
// 				style: {
// 					fontSize: '15px',
// 				}
// 			},
// 			lineWidth: 1,
// 			tickWidth: 1,
// 			lineColor: 'black',
// 			tickColor: 'black',
// 			tickLength: 6,

// 		},

// 		series: [
// 			KnifeValues,
// 			ForkValues,
// 		],

// 		legend: {
// 			align: 'right',
// 			layout: 'vertical',
// 			floating: true,
// 			verticalAlign: 'top',

// 		},

// 		tooltip: {
// 			headerFormat: '',
// 			pointFormat: '<span style="color:white">{point.y}</span>',
// 			borderColor: 'black',
// 			backgroundColor: 'black',
// 			followPointer: true,
// 			shape: 'square',
// 		},


// 	});
// }

// function plotPie(continent) {
// 	if (continent === 'ANTARCTICA') {
// 		Highcharts.chart('totalSalesChart', {})
// 		return;
		
// 	};

// 	let KnifeValues = {
// 		values: [],
// 		text: "Knife"
// 	}
// 	let ForkValues = {
// 		values: [],
// 		text: "Fork"
// 	}
// 	let sales = data[continent];
// 	let Knifees = 0, Forks = 0;
// 	for (const datum of sales) {
// 		Knifees += datum['Knife'];
// 		Forks += datum['Fork'];
// 	}
// 	KnifeValues['values'].push(Knifees);
// 	ForkValues['values'].push(Forks);


// 	Highcharts.chart('totalSalesChart', {
// 		chart: {

// 			type: 'pie'
// 		},
// 		title: {
// 			text: 'Total Sales',
// 			style: {
// 				fontSize: '22px',
// 			}
// 		},

// 		tooltip: {
// 			headerFormat: '',
// 			pointFormat: '<span style="color:white">{point.y}</span>',
// 			borderColor: 'white',
// 			backgroundColor: 'black',
// 			followPointer: true,
// 			shape: 'square',

// 		},

// 		credits: {
// 			enabled: false
// 		},

// 		legend: {
			
// 			layout: 'vertical',
// 			floating: true,
// 			align: 'right',
// 			verticalAlign: 'top',

// 		},

// 		plotOptions: {
// 			pie: {
				
// 				startAngle: 90,
// 				dataLabels: {
// 					enabled: true,
// 					format: '{point.percentage:.1f} %',
// 					distance: -80,

// 					style: {
// 						fontSize: '18px',
						
// 					}
// 				},
				
// 				showInLegend: true
// 			},

// 		},

// 		series: [{
// 			data: [{
// 				name: 'Knife',
// 				y: Knifees,
// 			}, {
// 				name: 'Fork',
// 				y: Forks,
// 			}]
// 		}]
// 	});

// }


// function plotStocks(stocks) {
// 	let prices = [];
// 	for (datum of stocks) {
// 		//log(datum);
// 		prices.push([datum['Date'], datum['Adj Close']]);
// 	}

// 	Highcharts.chart('stockChart', {

// 		chart: {
// 			type: 'area'
			
// 		},
		
//         title: {
// 			text: 'Dynamic Growth'
// 		},

// 		subtitle: {
// 			text: 'Stock Prices of K&F Corp. from 2015-Present',
// 		},
		
// 		xAxis: {
// 			type: 'datetime',
// 			crosshair: {
// 				label: {
// 					enabled: true,
// 					formatter: (value) => Highcharts.dateFormat('%m/%d/%y', value),
					
// 				},
// 				zIndex: 3,
// 				color: 'grey'
// 			},
// 			title: {
// 				text: 'Date',
// 				style: {
// 					fontSize: '18px',
// 				}
// 			},
// 			lineColor: 'grey',
// 			tickColor: 'grey',
// 			tickLength: 3,
// 			labels: {
// 				format: '{value:%e/%m/%y}'
// 			},
			
// 		},
	
// 		credits: {
// 			enabled: false
// 		},

// 		yAxis: {

//             gridLineDashStyle: 'dot',
// 			lineColor: 'grey',
// 			tickColor: 'grey',
// 			tickLength: 6,
		
// 			gridZIndex: 4,
// 			gridLineColor: 'grey',
// 			tickInterval: 20,
// 			lineWidth: 1,
// 			tickWidth: 1,

// 			crosshair: {
// 				label: {
// 					enabled: true,
// 					formatter: (value) => value.toFixed(0)
// 				},
// 				zIndex: 3,
// 				color: 'grey'
// 			},
// 			title: {
// 				text: 'Adj Close Stock Price',
// 				style: {
// 					fontSize: '18px',
// 				}
//             }
        

// 		},

// 		series: [{
// 			data: prices,
// 			fillColor: '#C9E7F2',
//         }],

// 		legend: {
// 			enabled: false
// 		},


// 		tooltip: {
// 			formatter: function () {
// 				return '$' + this.y.toFixed(2);
// 			},
// 			borderColor: 'grey',
// 			shape: 'square',
// 			shadow: false,

// 		},


//     });
// }

// function updateScoreCards(continent) {
// 	let sales = data[continent];
// 	let Knifees = 0, Forks = 0;
// 	for (const datum of sales) {
// 		Knifees += datum['Knife'];
// 		Forks += datum['Fork'];
// 	}
// 	let revenue = Knife_PRICE * Knifees + Fork_PRICE * Forks;
// 	select('knifeSold').innerHTML = Knifees;
// 	select('forkSold').innerHTML = Forks;
// 	select('totalSales').innerHTML = revenue.toFixed(2);
// }

// Chart 1 - Bubble Chart
// function plotSales(sales) {
// 	data = sales;
// 	plotMap();
// }