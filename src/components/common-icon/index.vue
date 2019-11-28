<template>
    <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"/>
</template>

<script>
import Icons from "../icons"
export default {
    name: "CommonIcon",
    components: { Icons },
    props: {
        type: {
            type: String,
            required: true
        },
        color: String,
        size: Number
    },
    computed: {
        iconType () {
            return this.type.indexOf("icon-") === 0 ? "Icons" : "Icon"
        },
        iconName () {
            return this.type
        },
        iconSize () {
            return this.size || 14
        },
        iconColor () {
            return this.color || ""
        }
    }
}
</script>
