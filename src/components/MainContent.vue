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

table {
    width: 100%;;
}

thead,
tbody {
    width: 100%;
}

tr {
    border: 2px solid white;
}

th,
td {
    color: white;
    max-width: 150px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border: 0;
    border-bottom: 1px solid var(--c-gray-600);
    background-color: transparent;
    padding-left: 1.5rem;
    text-align: center;
}
td.small {
    max-width: 100px
}
</style>