<template>
  <div>
    <Highcharts :options="options" ref="speed" />
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
export default {
  data(){
    return {
      options: {}
    }
  },
  props: ['query', 'data', 'config'],
  mounted(){
    const { numbereu, numberdescribe, deviceName } = this.query
    this.initConfig(numbereu)
  },
  methods: {
    initConfig(numbereu){
      this.options = {
        credits: {
          enabled: false
        },
        chart: {
          type: 'gauge',
          height: '200px',
          width: 200
        },
        title: {
          text: ''
        },
        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#FFF'],
                [1, '#333']
              ]
            },
            borderWidth: 0,
            outerRadius: '109%'
          }, {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#333'],
                [1, '#FFF']
              ]
            },
            borderWidth: 1,
            outerRadius: '107%'
          }, {
            // default background
          }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
          }]
        },
        // the value axis
        yAxis: {
          min: this.config.min,
          max: this.config.max,
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',
          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
            step: 2,
            rotation: 'auto'
          },
          title: {
            text: numbereu
          },
          plotBands: [{
            from: this.config.min || -200,
            to: (this.config.min + this.config.max) / 3 || 0,
            color: '#55BF3B' // green
          }, {
            from: (this.config.min + this.config.max) / 3 || 0,
            to: (2 * (this.config.min + this.config.max)) / 3 || 100,
            color: '#DDDF0D' // yellow
          }, {
            from: (2 * (this.config.min + this.config.max)) / 3 || 100,
            to: this.config.min + this.config.max || 999,
            color: '#DF5353' // red
          }]
        },
        series: [{
          name: 'Speed',
          data: [0]
        }]
      }
    }
  },
  watch: {
    data(newVal, oldVal){
      const speed = this.$refs.speed.chart
      //       speedPoint = speed.series[0].points[0]
      // speedPoint.update(newVal)

      for(let i=0;i<newVal.length;i++){
        let series = speed.series[0]['points'][i]
        for(let j=0;j<newVal[i].length;j++){
          let points = newVal[i][j]
          series.update(Number(points['rtvalue']))
        }
      }
    }
  }
}
</script>

<style>

</style>