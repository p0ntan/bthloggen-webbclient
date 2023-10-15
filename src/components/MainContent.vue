<template>
    <div class="app-body-main-content">
        <div>
            <h2 v-if="this.$store.result === -1">Sök i fältet ovan</h2>
        </div>
        <div v-if="this.$store.result.length > 0">
            <h2>Antall träffar: {{ this.$store.result.length }}</h2>
            <ResultTable :resultData="this.$store.result"/>
        </div>
        <div v-if="this.$store.result.length === 0">
            <h2>Inga resultat för sökningen.</h2>
        </div>
    </div>
</template>

<script>
import ResultTable from './blocks/ResultTable.vue'

export default {
    name: "MainContent",
    components: {
        ResultTable
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
}
</style>