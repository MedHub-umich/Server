
// var ecgGraph = {
//         title: "",
//         description: "Yearly UFO sightings from the year 1945 to 2010.",
//         // data:jsonData1,
//         width: 1100,
//         height: 250,
//         target: '#ecgGraph',
//         x_accessor: 'time',
//         y_accessor: 'data',
//         area: false,
//         markers: [{'year': 1964, 'label': '"The Creeping Terror" released'}]
//     }
// var bpGraph = {
//         title: "UFO Sightings",
//         description: "Yearly UFO sightings from the year 1945 to 2010.",
//         data: jsonData,
//         width: 500,
//         height: 250,
//         target: '#bpGraph',
//         x_accessor: 'year',
//         y_accessor: 'sightings',
//         markers: [{'year': 1964, 'label': '"The Creeping Terror" released'}]
//     }
// var breathingRateGraph = {
//         title: "UFO Sightings",
//         description: "Yearly UFO sightings from the year 1945 to 2010.",
//         data: jsonData,
//         width: 500,
//         height: 250,
//         target: '#breathingRateGraph',
//         x_accessor: 'year',
//         y_accessor: 'sightings',
//         markers: [{'year': 1964, 'label': '"The Creeping Terror" released'}]
//     }
// var heartRateGraph = {
//         title: "UFO Sightings",
//         description: "Yearly UFO sightings from the year 1945 to 2010.",
//         data: jsonData,
//         width: 500,
//         height: 250,
//         target: '#heartRateGraph',
//         x_accessor: 'year',
//         y_accessor: 'sightings',
//         markers: [{'year': 1964, 'label': '"The Creeping Terror" released'}]
//     }
// var bodyTemperatureGraph = {
//         title: "UFO Sightings",
//         description: "Yearly UFO sightings from the year 1945 to 2010.",
//         data: jsonData,
//         width: 500,
//         height: 250,
//         target: '#bodyTemperatureGraph',
//         x_accessor: 'year',
//         y_accessor: 'sightings',
//         markers: [{'year': 1964, 'label': '"The Creeping Terror" released'}]
//     }
window.onload = function() {
	


    // MG.data_graphic(ecgGraph);

    // MG.data_graphic(bpGraph);

    // MG.data_graphic(heartRateGraph);

    // MG.data_graphic(breathingRateGraph)

    // MG.data_graphic(bodyTemperatureGraph)

    ECGworker();

}

function ECGworker() {
  $.ajax({
    url: '/api/v1.0/sensor/1/ecg?amount=7500', 
    success: function(data) {
    	logData(data)
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(ECGworker, 5000);
    }
  });
}

function logData(response) {
	//console.log(response.data)
	var convertedData = ourConvert(response.data, 'time', 'data', "%Y-%m-%dT%H:%M:%S.%LZ");
	// ecgGraph.data = convertedData
	// delete ecgGraph.xax_format
  // MG.data_graphic(ecgGraph)
  var lineChartData = [
    {
      label: "ECG",
      values: convertedData
    }
  ]
  $('#ecgGraph').epoch({
    type: 'time.line',
    data: lineChartData
  });
}

ourConvert = function(data, timeAccess, dataAccess, time_format) {
  //time_format = "%Y-%m-%dT%H:%M:%S.%LZ";
  var parse_time = d3.timeParse(time_format);
  data = data.map(function(d) {
    d['time'] = Date.parse(d[timeAccess])
    d['y'] = parseInt('0x' + d[dataAccess])
    return d;
  });
  return data
}



