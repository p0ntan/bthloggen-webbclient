<template>
    <div class="app-body-sidebar">
        <p>Senaste 5 sökningar:</p>
        <p v-if="this.$store.prevSearches.length === 0">
                Inget att visa.
        </p>
        <ul v-else class="prev-search">
            <li v-for="search in lastFive">
                <PrevSearch :search="search"/>
            </li>
        </ul>
        <footer class="footer">
            <div>
                Gjord av poak22
            </div>
        </footer>
    </div>
</template>

<script>
import PrevSearch from './blocks/PrevSearch.vue'
export default {
    name: "SideBar",
    components: {
        PrevSearch
    },
    computed: {
        lastFive() {
            const lastFive = [...this.$store.prevSearches.slice(-5)]
            return lastFive
        }
    }
}
</script>

<style scoped>
.app-body-sidebar {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: 1200px) {
		display: none;
	}
}
.prev-search {
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-start;
	color: var(--c-text-tertiary);
}

ul {
    padding: 0;;
}

li {
    list-style-type: none;
    width: 100%;
}
</style>