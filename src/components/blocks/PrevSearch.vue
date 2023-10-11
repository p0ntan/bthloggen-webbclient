<template>
    <div @click="repeatSearch" class="wrapper">
        <div>
            <div class="domain">
                <div class="url">Url: {{ url }}</div>
                <div class="ip">Ip: {{ ip }}</div>
            </div>
            <div class="time">
                <div>Månad: {{ month }}</div>
                <span>Dag: {{ day }}, Tid: {{ time }}</span>
            </div>
        </div>
        <span class="hits">Träffar: {{ hits }}</span>
    </div>
</template>

<script>
const searchUrl ='http://localhost:1337/data';

export default{
    props: ['search'],
    data() {
        return {
            url: this.search.url,
            ip: this.search.ip,
            month: this.search.month,
            day: this.search.day,
            time: this.search.time,
            hits: this.search.hits
        }
    },
    methods: {
        async repeatSearch() {
            const objParam = {...this.$data}
            delete objParam.hits
            let counter = 0
            let query = ''

            for (const [key, value] of Object.entries(objParam)) {
                if (value && counter === 0) {
                    query = `?${key}=${value}`
                    counter++
                } else if (value) {
                    query += `&${key}=${value}`
                }
            }

            const respons = await fetch(searchUrl+query)
            const result = await respons.json()

            this.$store.result = result
        }
    }
}
</script>

<style scoped>
.wrapper {
    display: block;
    padding: 0.5rem;
    background-color: #bdbbb7;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.domain,
.time {
    text-align: end;
}

.time div,
.time span {
    font-size: 0.6rem;
    margin-bottom: -0.5rem;
    color: var(--c-gray-600);
}

.url {
    color: var(--c-gray-900);
}

.ip {
    color: var(--c-gray-800);
    font-size: 0.8rem;
}

.hits {
    text-align: start;
    color: var(--c-gray-900);
}

.wrapper:hover,
.wrapper:focus {
    transform: translateX(5px);
    cursor: pointer;
    transition: 0.25s ease;
}
</style>