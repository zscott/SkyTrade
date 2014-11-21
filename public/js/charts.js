var charts = (function() {
  var cumulativeSeries = function(tuples, limit) {
    var points = [];

    var length = tuples.length;
    var cumulativeAmount = 0;
    var endIndex = limit > 0 ? Math.min(limit, length) : length;

    for (var i = 0; i < endIndex; i++) {
      var tuple = tuples[i];

      cumulativeAmount += tuple[1];
      points.push([tuple[0], cumulativeAmount]);
    }
    return points;
  };

  var createMarketDepthChart = function(container, marketId) {

    var maxLevels = 500;
    var chart = new Highcharts.Chart({
      chart: {
        type: 'area',
        zoomType: 'x',
        animation: false,
        renderTo: container
      },
      title: {
        text: 'Market Depth'
      },
      xAxis: {
        labels: {
          format: '{value}'
        },
        minorTickInterval: 'auto'
      },
      yAxis: {
        title: {
          text: 'Amount'
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080'
          }
        ]
      },
      rangeSelector: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      scrollbar: {
        enabled: false
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        floating: true
      },
      plotOptions: {
        series: {
          lineWidth: 1,
          animation: false,
          marker: {
            enabled: false
          }
        }
      }
    });

    var url = "/v1/market/" + marketId + "/full_depth";

    $.getJSON(url, function (data) {
      var bids = cumulativeSeries(data.bids, maxLevels).reverse();
      var asks = cumulativeSeries(data.asks, maxLevels);

      // console.log('Bids: ' + bids);
      // console.log('Asks: ' + asks);

      chart.addSeries(
        {
          name: 'Bids',
          color: 'red',
          fillColor: 'rgba(255,0,0,0.2)',
          step: 'right',
          data: bids
        });

      chart.addSeries(
        {
          name: 'Asks',
          color: 'green',
          fillColor: 'rgba(0,255,0,0.2)',
          step: 'left',
          data: asks
        });
    });

  };

  return { MarketDepthChart : createMarketDepthChart };
})();

