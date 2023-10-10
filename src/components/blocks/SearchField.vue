<template>
    <h2>Sök efter logdata</h2>
    <div class="header-search-field">
        <form @submit.prevent="search" class="search-field">
            <input type="text" placeholder="Url" v-model="url">
            <input type="text" placeholder="Ip-adress" v-model="ip">
            <input type="text" class="small" placeholder="Månad" v-model="month">
            <input type="text" class="small" placeholder="Dag" v-model="day">
            <input type="text" class="small" placeholder="Tid" v-model="time">
            <button @click="search" class="flat-button">
                Sök
            </button>
        </form>
    </div>
</template>

<script>
const searchUrl ='http://localhost:1337/data';

export default {
    name: "SearchField",
    data() {
        return {
            url: null,
            ip: null,
            month: null,
            day: null,
            time: null
        }
    },
    methods: {
        async search() {
            const params = Object.entries(this.$data)
            let counter = 0
            let query = ''

            params.forEach(param => {
                if (param[1] && counter === 0) {
                    query = `?${param[0]}=${param[1]}`
                    counter++
                } else if (param[1]) {
                    query += `&${param[0]}=${param[1]}`
                }
            });

            const respons = await fetch(searchUrl+query)
            const result = await respons.json()

            console.log(result);

            this.$store.result = result
        }
    },
}
</script>

<style scoped>
.header-search-field {
	display: flex;
	align-items: center;
	justify-content: space-between;
	& > * + * {
		margin-left: 1.25rem;
	}
}
.search-field {
    display: flex;
    position: relative;
    gap: 0.5rem;
    input {
        color: white;
        max-width: 150px;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border: 0;
        border-bottom: 1px solid var(--c-gray-600);
        background-color: transparent;
        padding-left: 1.5rem;
    }

    input.small {
        max-width: 100px
    }
}

@media screen and (max-width: 1070px) {
    .search-field {
        flex-direction: column;
    }
}
</style>