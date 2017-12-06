userID = $('#patientData').text()
baseURL = '/api/v1.0/sensor/' + userID
const numBPReadings = 5
window.onload = function() {
    var ecgChart = initChart('#ecgGraph', "Volts", 1.3, 2.3)
    var ecgURL =  baseURL + '/ecg?amount=1250'
    var ecgUpdateRate = 1000
    worker(ecgChart, ecgURL, ecgUpdateRate, "ECG", 1000, function (data) {
    })
    var tempChart = initChart('#bodyTemperatureGraph', "Degrees Celsius", 30, 36)
    var tempURL = baseURL + '/temperature?amount=20'
    var tempUpdateRate = 29000
    worker(tempChart, tempURL, tempUpdateRate, "Temperature", 1, function (data) {
      var updateStr = data + "˚ Celsius"
      $('#tempUpdate').text(updateStr)
    })

    var breathingChart = initChart('#breathingRateGraph', "Breaths Per Minute", 7, 16)
    var breathingURL = baseURL + '/breathing_rate?amount=20'
    var breathingUpdateRate = 29000
    worker(breathingChart, breathingURL, breathingUpdateRate, "Breathing Rate", 1, function (data) {
      var updateStr = data + " BPM"
      $('#brUpdate').text(updateStr)
    })
    var heartRateChart = initChart('#heartRateGraph', "Beats Per Minute", 40, 100)
    var heartRateURL = baseURL + '/heart_rate?amount=30'
    var heartRateUpdateRate = 3000
    worker(heartRateChart, heartRateURL, heartRateUpdateRate, "Heart Rate", 1, function (data) {
      var updateStr = data + " BPM"
      $('#hrUpdate').text(updateStr)
    })


    BPworker();
    WaitForPanicWorker();
}

function worker(chart, dataURL, timeout, type, scaling, updateFcn) {
  $.ajax({
    url: dataURL, 
    success: function(data) {
    	plotData(chart, data, type, scaling, updateFcn)
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(worker, timeout, chart, dataURL, timeout, type, scaling, updateFcn);
      // bsData()
    }
  });
}

function plotData(chart, response, type, scaling, updateFcn) {
  const timeArray = response.data.map((element) => element.time.slice(0, -3))
  const dataArray = response.data.map((element)=> element.data/scaling)
	
  chart.load({columns: [
    ['x'].concat(timeArray),
    [type].concat(dataArray),
  ]})
  updateFcn(dataArray[0])
}

function initChart(chartID, label, ymin, ymax) {
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
        max: ymax,
        min: ymin,
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
    },
    error: function() {
      var newHTML = "<div id=bpTable>"
      newHTML += "<p>No User Data found for Blood Pressure</p>" 
      newHTML += '</div>'
      $('#bpTable').replaceWith(newHTML)

      newHTML = '<div id="bp-recent">'
      newHTML += 'No Data'
      newHTML += '</div>'
      $('#bp-recent').replaceWith(newHTML)
    }
  });
}

function WaitForPanicWorker() {
  $.ajax({
    url: '/api/v1.0/alert/panic/' + userID, 
    success: function(response) {
      if (response.panic == true) {
        showPanicToast()
      }
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(WaitForPanicWorker, 1000);
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
  $('#bpTable').replaceWith(newHTML)

  newHTML = '<div id="bp-recent">'
  newHTML += response.data[0].systolic + '/' + response.data[0].diastolic + ' S/D'
  newHTML += '</div>'
  $('#bp-recent').replaceWith(newHTML)
}

$('#mh-alert').click(function() {
  console.log("RUN TOM RUN!")
  const dataToSend = JSON.stringify({
    'data': "000102"
  })
  $.ajax({
    url: '/api/v1.0/alert/' + userID, 
    method: "POST",
    data: dataToSend,
    dataType: "json",
    contentType: "application/json"
  });
  this.blur()
})

$('#mh-schedule').click(function() {
  const dataToSend = JSON.stringify({
    'data': "000101"
  })
  $.ajax({
    url: '/api/v1.0/alert/' + userID, 
    method: "POST",
    data: dataToSend,
    dataType: "json",
    contentType: "application/json"
  });
  this.blur()
})

$('#mh-monitor').click(function() {
  const dataToSend = JSON.stringify({
    'data': "010100"
  })
  $.ajax({
    url: '/api/v1.0/alert/' + userID, 
    method: "POST",
    data: dataToSend,
    dataType: "json",
    contentType: "application/json"
  });
  this.blur()
})

function showPanicToast(){
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "0",
    "timeOut": "0",
    "extendedTimeOut": "0",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  toastr.error("This patient has recent pressed their panic button!", "Panic button enabled")  
}
//temperature is sent 1 per minute  referesh 29 seconds  get 20
//breahing rate is sent 1 per minute referse 29 seconds get 20
//heart rate 1 per 10 seconds refresh 4 seoncs  get 30

