<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from "echarts"
import { on, off } from "@/plugins/utils"
export default {
    name: "serviceRequests",
    props: ["option"],
    data () {
        return {
            dom: null
        }
    },
    methods: {
        resize () {
            this.dom.resize()
        },
        renderLine(){
            const option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
                grid: {
                    top: "20%",
                    left: "5%",
                    right: "10%",
                    bottom: "15%",
                    containLabel: true
                },
                legend: this.option.legend,
                xAxis: this.option.xAxis,
                yAxis: [{type: "value"}],
                series: this.option.series,
                color: this.option.color,
            }
            this.dom = echarts.init(this.$refs.dom)
            this.dom.setOption(option)
            on(window, "resize", this.resize)
        }
    },
    watch: {
        option(){
            this.renderLine()
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.renderLine()
        })
    },
    beforeDestroy () {
        off(window, "resize", this.resize)
    }
}
</script>
