<template>
    <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 600px;height: 400px;"></div>
</template>

<script>
 import echarts from 'echarts'
    export default {
        name: '',
        data () {
            return {
                charts: '',
                opinion:['WIFI','4G','Infrared','Bluetooth','Zigbee'],
                opinionData:[
                  {value:335, name:'WIFI'},
                  {value:310, name:'4G'},
                  {value:234, name:'Infrared'},
                  {value:135, name:'Bluetooth'},
                  {value:1548, name:'Zigbee'}
                ]
            }
        },
        methods:{
            drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 tooltip: {
                   trigger: 'item',
                   formatter: '{a}<br/>{b}:{c} ({d}%)'
                 },
                 legend: {
                   orient: 'vertical',
                   x: 'left',
                   data:this.opinion
                 },
                 series: [
                   {
                     name:'智能设备连接方式',
                     type:'pie',
                     radius:['50%','70%'],
                     avoidLabelOverlap: false,
                     label: {
                       normal: {
                         show: false,
                         position: 'center'
                       },
                       emphasis: {
                         show: true,
                         textStyle: {
                           fontSize: '30',
                           fontWeight: 'blod'
                         }
                       }
                     },
                     labelLine: {
                       normal: {
                         show: false
                       }
                     },
                     data:this.opinionData
                   }
                 ]
               })
            }
        },
      //调用
        mounted(){
            this.$nextTick(function() {
                this.drawPie('main')
            })
        }
    }
</script>

<style scoped>
* {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
