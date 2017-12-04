userID = $('#patientData').text()
baseURL = '/api/v1.0/sensor/' + userID
const numBPReadings = 5
window.onload = function() {
    var ecgChart = initChart('#ecgGraph', "Volts")
    var ecgURL =  baseURL + '/ecg?amount=1250'
    var ecgUpdateRate = 5000
    worker(ecgChart, ecgURL, ecgUpdateRate, "ECG", 1000);

    var tempChart = initChart('#bodyTemperatureGraph', "Degrees Celsius")
    var tempURL = baseURL + '/temperature?amount=20'
    var tempUpdateRate = 29000
    worker(tempChart, tempURL, tempUpdateRate, "Temperature", 1)

    var breathingChart = initChart('#breathingRateGraph', "Breaths Per Minute")
    var breathingURL = baseURL + '/breathing_rate?amount=20'
    var breathingUpdateRate = 29000
    worker(breathingChart, breathingURL, breathingUpdateRate, "Breathing Rate", 1)

    var heartRateChart = initChart('#heartRateGraph', "Beats Per Minute")
    var heartRateURL = baseURL + '/heart_rate?amount=30'
    var heartRateUpdateRate = 4000
    worker(heartRateChart, heartRateURL, heartRateUpdateRate, "Heart Rate", 1)




    BPworker();

    

}

function worker(chart, dataURL, timeout, type, scaling) {
  $.ajax({
    url: dataURL, 
    success: function(data) {
    	plotData(chart, data, type, scaling)
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(worker, timeout, chart, dataURL, timeout, type, scaling);
      // bsData()
    }
  });
}

function plotData(chart, response, type, scaling) {
  console.log(response.data)
  const timeArray = response.data.map((element) => element.time.slice(0, -3))
  const dataArray = response.data.map((element)=> element.data/scaling)
	
  chart.load({columns: [
    ['x'].concat(timeArray),
    [type].concat(dataArray),
  ]})
}

function initChart(chartID, label) {
  var chart = c3.generate({
    bindto: chartID,
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
        label: label,
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

  newHTML = '<div id="bp-recent">'
  newHTML += response.data[0].systolic + '/' + response.data[0].diastolic + ' S/D'
  newHTML += '</div>'
  $('#bp-recent').replaceWith(newHTML)
}


//temperature is sent 1 per minute  referesh 29 seconds  get 20
//breahing rate is sent 1 per minute referse 29 seconds get 20
//heart rate 1 per 10 seconds refresh 4 seoncs  get 30

