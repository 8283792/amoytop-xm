<template>
  <div>
    <Highstock :options="options" ref="highcharts" />
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
  props: ['data', 'history', 'query'],
  mounted(){
    let { numbereu, numberdescribe, deviceName, max, min } = this.query
    // debugger
    this.initConfig(numbereu, numberdescribe, max, min)
  },
  methods: {
    initConfig(numbereu, numberdescribe, max, min){
      this.options = {
        credits: {
          enabled: false
        },
        chart: {
          renderTo: 'lineoptions',
          marginLeft: 40
        },
        title: {
          text: ''
        },
        // 导出
        exporting: {
          enabled: true
        },
        // 范围选择器
        rangeSelector: {
          enabled: false
        },
        xAxis: [
          {
            opposite: false,
            type: 'category'
          }
        ],
        yAxis: [
          {
            opposite: false,
            title: {
              text: numbereu,
              rotation: 0,
              x: 30,
              y: -120
            },
            // labels: {
            //   x: 30
            // },
            lineColor: '#8085e9',
            lineWidth: 2,
            max: max || 300,
            min: min || -40
          }
        ],
        tooltip: {
          valueSuffix: numbereu,
          followTouchMove: false
        },
        series: [
          {
            name: numberdescribe,
            data: [],
            yAxis: 0,
            color: '#8085e9',
            negativeColor: 'red'
          },
          {
            name: numberdescribe,
            data: [],
            yAxis: 0,
            color: '#f00000',
            negativeColor: 'red'
          }
        ]
      }
    }
  },
  watch: {
    history(newVal, oldVal){
      const chart = this.$refs.highcharts.chart

      for(let i=0;i<newVal.length;i++){
        let series = chart.series[i]
        for(let j=0;j<newVal[i].length;j++){
          let points = newVal[i][j]

          let point = [Number(points['datetime']), Number(points['value'])]
          series.addPoint(point, false)
        }
      }
      chart.redraw()
    },
    data(newVal, oldVal){
      if(!history || !history.length) return
      const chart = this.$refs.highcharts.chart

      for(let i=0;i<newVal.length;i++){
        let series = chart.series[i]
        for(let j=0;j<newVal[i].length;j++){
          let points = newVal[i][j]
          let point = [Number(points['datetime']), Number(points['value'])]
          series.addPoint(point, false)
        }
      }
      chart.redraw()
    }
  }
}
</script>

<style>

</style>