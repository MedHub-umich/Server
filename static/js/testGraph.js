
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

    var ecgChart = initChart();

    ECGworker(ecgChart);

}

function bsData() {
  var date = Date.parse('2017-12-01T18:16:17.249Z')/1000
  var i = 0;
  
  const nextDataPoints = Array(250).fill().map((e, i) => {
    return i
    
  })

  const nextTime = Array(250).fill().map((e, i) => {
    var d = new Date(date + i)
    return d.toISOString()
    
  })

  // addData(date, 150)
  // Create chart for ecg Graph
  var chart = c3.generate({
    bindto: '#ecgGraph',
    data: {
        x: 'x',
        // ISO format
       xFormat: '%Y-%m-%d %H:%M:%S.%L', // 'xFormat' can be used as custom format of 'x'
       // Initial data 
       columns: [
            ['x'].concat(nextTime),
            ['ecg'].concat(nextDataPoints),
        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%S.%L', // How we want to display the time (seconds w/ milli)
                count: 10 // How many total ticks to display
            }
        }
    },
    // Don't show the dots (looks weird with 1.2k points)
    point: {
      show: false
    }
});

addData(chart, date, 150)
  
}

function addData(chart, time, distort) {
  const nextDataPoints = Array(1250).fill().map((e, i) => {
    return i % distort    
  })

  const nextTime = Array(1250).fill().map((e, i) => {
    var d = new Date(time + i)
    return d.toISOString()    
  })

  time += 1;
  distort = distort === 150 ? 250 : 150
  // Replace chart with new data
  chart.load({columns: [
                ['x'].concat(nextTime),
                ['ecg'].concat(nextDataPoints),
        ]})
  console.log(distort)
  setTimeout(addData, 1000, chart, time, distort)
}

function initChart() {
  var chart = c3.generate({
    bindto: '#ecgGraph',
    data: {
        x: 'x',
        // ISO format
       xFormat: '%Y-%m-%d %H:%M:%S.%L', // 'xFormat' can be used as custom format of 'x'
       // Initial data 
       columns: [
            // ['x'].concat(nextTime),
            // ['ecg'].concat(nextDataPoints),
        ]
    },
    axis: {
      y: {
        // max:3.3,
        // min: 0,
        label: "Volts",
        tick: {
          format: d3.format(".2f"),
          count: 5
        }
      },
      x: {
          type: 'timeseries',
          tick: {
              format: '%H:%M:%S.%L', // How we want to display the time (seconds w/ milli)
              count: 10 // How many total ticks to display
          }
      }
    },
    // Don't show the dots (looks weird with 1.2k points)
    point: {
      show: false
    },
    transition: {
      duration: 0
    }
  })

  return chart;
}

function ECGworker(chart) {
  $.ajax({
    url: '/api/v1.0/sensor/1/ecg?amount=1200', 
    success: function(data) {
    	logData(chart, data)
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(ECGworker, 500, chart);
      // bsData()
    }
  });
}

function logData(chart, response) {
  console.log(response.data)
  const timeArray = response.data.map((element) => element.time.slice(0, -3))
  const dataArray = response.data.map((element)=> element.data/1000)
	
  chart.load({columns: [
    ['x'].concat(timeArray),
    ['ecg'].concat(dataArray),
  ]})
}

ourConvert = function(data, timeAccess, dataAccess, time_format) {
  //time_format = "%Y-%m-%dT%H:%M:%S.%LZ";
  // var parse_time = d3.timeParse(time_format);
  data = data.map(function(d) {
    a = {}
    a['time'] = Date.parse(d[timeAccess])/1000
    // console.log(a['time'])
    a['y'] = parseInt('0x' + d[dataAccess])
    // console.log(a)
    return a;
  });
  console.log(data.length)
  return data.reverse()
}



