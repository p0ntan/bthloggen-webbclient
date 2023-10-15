<template>
    <span>Antal pr sida: </span>
    <form>
        <input type="number" :placeholder="itemsPerPage" v-model="updatedItemsPerPage">
        <button type="submit" @click.prevent="updateResultTable">Uppdatera</button>
    </form>
    <div>
        <button @click="prevPage" :disabled="currentPage <= 0">Föregående</button>
        
        <span v-for="page in pageLinks" :key="page" @click="jumpToPage(page-1)" class="page-link" :class="page == currentPage + 1 ? 'active' : ''">
            {{ page }}
        </span>

        <button @click="nextPage" :disabled="currentPage >= totalPages - 1">Nästa</button>
    </div>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Url</th>
                <th>Ip-adress</th>
                <th>Månad</th>
                <th>Dag</th>
                <th>Klockslag</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(result, index) in paginatedResults">
                <td class="shaded">{{ (index + 1) + (currentPage  * itemsPerPage) }}</td>
                <td>{{ result.url }}</td>
                <td>{{ result.ip }}</td>
                <td>{{ result.month }}</td>
                <td>{{ result.day }}</td>
                <td>{{ result.time }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'ResultTable',
    props: [
        'resultData'
    ],
    data() {
        return {
            itemsPerPage: 100,
            updatedItemsPerPage: 100,
            currentPage: 0,
            totalPages: null,
            paginatedResults: [],
            pageLinks: []
        };
    },
    beforeMount() {
        this.updateResultTable()
    },
    watch: {
        '$store.result': {
            immediate: true,
            handler() {
                this.currentPage = 0
                this.updateResultTable()
            }
        },
        currentPage() {
            this.paginateResults()
        },
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++
            }
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--
            }
        },
        jumpToPage(page) {
            this.currentPage = page;
        },
        paginateResults() {
            const start = this.currentPage * this.itemsPerPage
            const end = start + this.itemsPerPage

            this.paginatedResults = this.$store.result.slice(start, end)
        },
        updatePageLinks() {
            let startPage = Math.max(1, this.currentPage - 4)
            let endPage = Math.min(this.totalPages, startPage + 9)
            
            if (this.currentPage < 5) {
                endPage = Math.min(this.totalPages, 10)
                startPage = 1
            }

            this.pageLinks = []
 
            for (let i = startPage; i <= endPage; i++) {
                this.pageLinks.push(i)
            }
        },
        updateResultTable() {
            this.itemsPerPage = this.updatedItemsPerPage
            this.totalPages = Math.ceil(this.$store.result.length / this.itemsPerPage)
            this.updatePageLinks()
            this.paginateResults()
        }
    },
}
</script>

<style>
h2 {
    text-align: center;
}

table {
    width: 100%;
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
    text-align: center;
}
td.small {
    max-width: 100px
}

.shaded {
    color: var(--c-gray-700);
    text-align: center;
    width: 100px;
}

.page-link {
    cursor: pointer;
    padding: 0 5px;
}

.page-link.active {
    font-weight: bold;
}
</style>