var i = 0;
var jsonData1 = [
  {
    "year": "1945",
    "sightings": 6
  },
  {
    "year": "1946",
    "sightings": 8
  },
  {
    "year": "1947",
    "sightings": 34
  },
  {
    "year": "1948",
    "sightings": 80000
  },
  {
    "year": "1949",
    "sightings": 15
  },
  {
    "year": "1950",
    "sightings": 25
  },
  {
    "year": "1951",
    "sightings": 20
  },
  {
    "year": "1952",
    "sightings": 48
  },
  {
    "year": "1953",
    "sightings": 34
  },
  {
    "year": "1954",
    "sightings": 50
  },
  {
    "year": "1955",
    "sightings": 31
  },
  {
    "year": "1956",
    "sightings": 38
  },
  {
    "year": "1957",
    "sightings": 67
  },
  {
    "year": "1958",
    "sightings": 40
  },
  {
    "year": "1959",
    "sightings": 47
  },
  {
    "year": "1960",
    "sightings": 64
  },
  {
    "year": "1961",
    "sightings": 39
  },
  {
    "year": "1962",
    "sightings": 55
  },
  {
    "year": "1963",
    "sightings": 75
  },
  {
    "year": "1964",
    "sightings": 77
  },
  {
    "year": "1965",
    "sightings": 167
  },
  {
    "year": "1966",
    "sightings": 169
  },
  {
    "year": "1967",
    "sightings": 178
  },
  {
    "year": "1968",
    "sightings": 183
  },
  {
    "year": "1969",
    "sightings": 138
  },
  {
    "year": "1970",
    "sightings": 126
  },
  {
    "year": "1971",
    "sightings": 110
  },
  {
    "year": "1972",
    "sightings": 146
  },
  {
    "year": "1973",
    "sightings": 209
  },
  {
    "year": "1974",
    "sightings": 241
  },
  {
    "year": "1975",
    "sightings": 279
  },
  {
    "year": "1976",
    "sightings": 246
  },
  {
    "year": "1977",
    "sightings": 239
  },
  {
    "year": "1978",
    "sightings": 301
  },
  {
    "year": "1979",
    "sightings": 221
  },
  {
    "year": "1980",
    "sightings": 211
  },
  {
    "year": "1981",
    "sightings": 146
  },
  {
    "year": "1982",
    "sightings": 182
  },
  {
    "year": "1983",
    "sightings": 132
  },
  {
    "year": "1984",
    "sightings": 172
  },
  {
    "year": "1985",
    "sightings": 192
  },
  {
    "year": "1986",
    "sightings": 173
  },
  {
    "year": "1987",
    "sightings": 193
  },
  {
    "year": "1988",
    "sightings": 203
  },
  {
    "year": "1989",
    "sightings": 220
  },
  {
    "year": "1990",
    "sightings": 217
  },
  {
    "year": "1991",
    "sightings": 210
  },
  {
    "year": "1992",
    "sightings": 228
  },
  {
    "year": "1993",
    "sightings": 285
  },
  {
    "year": "1994",
    "sightings": 381
  },
  {
    "year": "1995",
    "sightings": 1336
  },
  {
    "year": "1996",
    "sightings": 862
  },
  {
    "year": "1997",
    "sightings": 1248
  },
  {
    "year": "1998",
    "sightings": 1812
  },
  {
    "year": "1999",
    "sightings": 2906
  },
  {
    "year": "2000",
    "sightings": 2780
  },
  {
    "year": "2001",
    "sightings": 3105
  },
  {
    "year": "2002",
    "sightings": 3176
  },
  {
    "year": "2003",
    "sightings": 3896
  },
  {
    "year": "2004",
    "sightings": 4208
  },
  {
    "year": "2005",
    "sightings": 3996
  },
  {
    "year": "2006",
    "sightings": 3590
  },
  {
    "year": "2007",
    "sightings": 4195
  },
  {
    "year": "2008",
    "sightings": 4705
  },
  {
    "year": "2009",
    "sightings": 4297
  },
  {
    "year": "2010",
    "sightings": 2531
  }
]

var jsonData2 = [
  {
    "year": "1945",
    "sightings": 1000
  },
  {
    "year": "1946",
    "sightings": 8
  },
  {
    "year": "1947",
    "sightings": 34
  },
  {
    "year": "1948",
    "sightings": 8
  },
  {
    "year": "1949",
    "sightings": 15
  },
  {
    "year": "1950",
    "sightings": 25
  },
  {
    "year": "1951",
    "sightings": 200
  },
  {
    "year": "1952",
    "sightings": 48
  },
  {
    "year": "1953",
    "sightings": 340
  },
  {
    "year": "1954",
    "sightings": 50
  },
  {
    "year": "1955",
    "sightings": 31
  },
  {
    "year": "1956",
    "sightings": 38
  },
  {
    "year": "1957",
    "sightings": 67
  },
  {
    "year": "1958",
    "sightings": 40
  },
  {
    "year": "1959",
    "sightings": 47
  },
  {
    "year": "1960",
    "sightings": 64
  },
  {
    "year": "1961",
    "sightings": 39
  },
  {
    "year": "1962",
    "sightings": 500
  },
  {
    "year": "1963",
    "sightings": 75
  },
  {
    "year": "1964",
    "sightings": 77
  },
  {
    "year": "1965",
    "sightings": 167
  },
  {
    "year": "1966",
    "sightings": 169
  },
  {
    "year": "1967",
    "sightings": 178
  },
  {
    "year": "1968",
    "sightings": 183
  },
  {
    "year": "1969",
    "sightings": 138
  },
  {
    "year": "1970",
    "sightings": 126
  },
  {
    "year": "1971",
    "sightings": 110
  },
  {
    "year": "1972",
    "sightings": 146
  },
  {
    "year": "1973",
    "sightings": 209
  },
  {
    "year": "1974",
    "sightings": 241
  },
  {
    "year": "1975",
    "sightings": 279
  },
  {
    "year": "1976",
    "sightings": 246
  },
  {
    "year": "1977",
    "sightings": 239
  },
  {
    "year": "1978",
    "sightings": 301
  },
  {
    "year": "1979",
    "sightings": 221
  },
  {
    "year": "1980",
    "sightings": 211
  },
  {
    "year": "1981",
    "sightings": 146
  },
  {
    "year": "1982",
    "sightings": 182
  },
  {
    "year": "1983",
    "sightings": 132
  },
  {
    "year": "1984",
    "sightings": 172
  },
  {
    "year": "1985",
    "sightings": 192
  },
  {
    "year": "1986",
    "sightings": 173
  },
  {
    "year": "1987",
    "sightings": 193
  },
  {
    "year": "1988",
    "sightings": 203
  },
  {
    "year": "1989",
    "sightings": 220
  },
  {
    "year": "1990",
    "sightings": 217
  },
  {
    "year": "1991",
    "sightings": 210
  },
  {
    "year": "1992",
    "sightings": 228
  },
  {
    "year": "1993",
    "sightings": 285
  },
  {
    "year": "1994",
    "sightings": 381
  },
  {
    "year": "1995",
    "sightings": 1336
  },
  {
    "year": "1996",
    "sightings": 862
  },
  {
    "year": "1997",
    "sightings": 1248
  },
  {
    "year": "1998",
    "sightings": 1812
  },
  {
    "year": "1999",
    "sightings": 2906
  },
  {
    "year": "2000",
    "sightings": 2780
  },
  {
    "year": "2001",
    "sightings": 3105
  },
  {
    "year": "2002",
    "sightings": 3176
  },
  {
    "year": "2003",
    "sightings": 3896
  },
  {
    "year": "2004",
    "sightings": 4208
  },
  {
    "year": "2005",
    "sightings": 3996
  },
  {
    "year": "2006",
    "sightings": 3590
  },
  {
    "year": "2007",
    "sightings": 4195
  },
  {
    "year": "2008",
    "sightings": 4705
  },
  {
    "year": "2009",
    "sightings": 4297
  },
  {
    "year": "2010",
    "sightings": 2531
  }
]


var ecgGraph = {
        title: "",
        description: "Yearly UFO sightings from the year 1945 to 2010.",
        data:jsonData1,
        width: 1100,
        height: 250,
        target: '#ecgGraph',
        x_accessor: 'time',
        y_accessor: 'data',
        area: false,
        markers: [{'year': 1964, 'label': '"The Creeping Terror" released'}]
    }
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
	ecgGraph.data = convertedData
	delete ecgGraph.xax_format
	MG.data_graphic(ecgGraph)
}

ourConvert = function(data, timeAccess, dataAccess, time_format) {
  //time_format = "%Y-%m-%dT%H:%M:%S.%LZ";
  var parse_time = d3.timeParse(time_format);
  data = data.map(function(d) {
    d[timeAccess] = parse_time(d[timeAccess])
    d[dataAccess] = parseInt('0x' + d[dataAccess])
    return d;
  });
  return data
}



