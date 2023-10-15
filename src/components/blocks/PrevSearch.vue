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
export default{
    name: "PrevSearch",
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
            let counter = 0
            let query = ''
            const objParam = {...this.$data}

            for (const [key, value] of Object.entries(objParam)) {
                if (value && counter === 0) {
                    query = `?${key}=${value}`
                    counter++;
                } else if (value) {
                    query += `&${key}=${value}`
                }
            }
            const response = await fetch(`http://localhost:1337/data` + query);
            const result = await response.json()

            this.$store.result = result
            this.$store.prevParam = {...this.$data}

            // try {
            //     const response = await fetch(this.$store.fetchUrl, {
            //         method: 'POST',
            //         mode: 'cors',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({...this.$data})
            //     })
            //     const result = await response.json()

            //     this.$store.result = result
            //     this.$store.prevSearches.push({...this.$data, hits: result.length})
            //     this.$store.prevParam = {...this.$data}
            // } catch (error) {
            //     console.error(error)
            // }
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
    cursor: pointer;

    transition: 0.25s ease;
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
    transition: 0.25s ease;
}
</style>