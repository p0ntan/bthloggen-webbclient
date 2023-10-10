<template>
    <header class="app-header">
        <div class="app-header-logo">
            <div class="logo">
                <span class="logo-icon">
                    <img src="/slack.svg" />
                </span>
                <h1 class="logo-title">
                    <span>Log</span>
                    <span>Data</span>
                </h1>
                <!-- <button class="user-profile">
                    <span>Pontus Åkerberg</span>
                    <span>
                        <img src="/me.png" />
                    </span>
                </button> -->
            </div>
        </div>
        <div class="app-header-search">
            <SearchField />
        </div>
    </header>
</template>

<script>
import SearchField from './blocks/SearchField.vue';
export default {
    components: {
        SearchField
    }
}
</script>

<style scoped>
.app-header {
	display: grid;
	grid-template-columns: minmax(min-content, 175px) minmax(max-content, 1fr);
	column-gap: 4rem;
	align-items: flex-end;
}

@media (max-width: 1200px) {
    .app-header {
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--c-gray-600);
    }
}
</style>