userID = $('#patientData').text()
const numBPReadings = 5
window.onload = function() {
	


    // MG.data_graphic(ecgGraph);

    // MG.data_graphic(bpGraph);

    // MG.data_graphic(heartRateGraph);

    // MG.data_graphic(breathingRateGraph)

    // MG.data_graphic(bodyTemperatureGraph)

    var ecgChart = initChart();
    ECGworker(ecgChart);

    BPworker();

    

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
      duration: 350
    }
  })
  return chart;
}

function ECGworker(chart) {
  $.ajax({
    url: '/api/v1.0/sensor/' + userID + '/ecg?amount=1250', 
    success: function(data) {
    	logData(chart, data)
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(ECGworker, 5000, chart);
      // bsData()
    }
  });
}

function BPworker() {
  $.ajax({
    url: '/api/v1.0/sensor/' + userID + '/blood_pressure?amount=' + numBPReadings, 
    success: function(response) {
    	logBP(response)
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(BPworker, 5000);
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

function logBP(response) {
  var newHTML = "<div id=bpTable>"
  newHTML += "<table class='table table-striped'>"
  newHTML += "<thead>"
  newHTML += "<th>Sys/Dia</th>"
  newHTML += "<th>HR (BPM)</th>"
  newHTML += "<th>Time of Reading</th>"
  newHTML += "</thead>"
  newHTML += "<tbody>"
  newHTML += response.data.map((element) => {
    const formattedTime = new Date(element.time).toLocaleString('en-US')
    var thisRow = "<tr>"
    thisRow += ("<td>"+ element.systolic + "/" + element.diastolic + "</td>")
    thisRow += ("<td>" + element.heart_rate + "</td>")
    thisRow += ("<td>" + formattedTime + "</td>")
    thisRow += "</tr>"
    return thisRow
  }).reduce((prev, curr) => prev + curr)
  newHTML += "</tbody>"
  newHTML += "</table>"
  newHTML += "</div>"
  console.log(newHTML)
  $('#bpTable').replaceWith(newHTML)
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



