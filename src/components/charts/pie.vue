<template>
  	<div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from "echarts"
import { on, off } from "@/plugins/utils"
export default {
    name: "ChartPie",
    props: {
        value: Array,
        total: Number,
        text: String,
        subtext: String
    },
    data () {
        return {
            dom: null
        }
    },
    computed: {
        pieData(){
            let list = []
            this.value.map(item => {
                delete item.list
                list.push(item)
            })
            return list
        }
    },
    methods: {
        resize () {
            this.dom.resize()
        },
        renderPie(){
            let legend = this.value.map(_ => _.name)
            let option = {
                title: {
                    text: this.text,
                    subtext: this.subtext,
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: legend
                },
                series: [{
                    name: this.total ? "总计：" + this.total : "",
                    type: "pie",
                    radius: ["50%", "70%"],
                    avoidLabelOverlap: false,
                    data: this.pieData,
                    label: {
                        normal: {
                            show: false,
                            position: "center"
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: "20",
                                fontWeight: "bold"
                            }
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }]
            }
            this.dom = echarts.init(this.$refs.dom)
            this.dom.setOption(option)
            on(window, "resize", this.resize)
        }
    },
    watch: {
        pieData(){
            this.renderPie()
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.renderPie()
        })
    },
    beforeDestroy () {
        off(window, "resize", this.resize)
    }
}
</script>
