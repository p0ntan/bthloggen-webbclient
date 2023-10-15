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
    name: 'Header',
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

@media (max-width: 1080px) {
    .app-header {
		display: block;
    }
    .app-header-logo {
        top: 0;
        left: 20px;
        scale: 0.5;
        position: absolute;
    }
}

@media (max-width: 730px) {
    .app-header-logo {
        display: none;
        visibility: hidden;
    }
}
</style>