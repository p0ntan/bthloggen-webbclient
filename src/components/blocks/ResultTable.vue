<template>
    <div class="flex-jc-center">
        <span>Antal pr sida: </span>
        <form>
            <input type="number" :placeholder="itemsPerPage" v-model="updatedItemsPerPage">
            <button type="submit" @click.prevent="updateResultTable">Uppdatera</button>
        </form>
    </div>

    <div class="flex-jc-even">
        <button @click="prevPage" :disabled="currentPage <= 0">Föregående</button>
        
        <div>
            <span v-for="page in pageLinks" :key="page" @click="jumpToPage(page-1)" class="page-link" :class="page == currentPage + 1 ? 'active' : ''">
                {{ page }}
            </span>
        </div>

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
                <td data-label="Url">{{ result.url }}</td>
                <td data-label="Ip-adress">{{ result.ip }}</td>
                <td data-label="Månad">{{ result.month }}</td>
                <td data-label="Dag">{{ result.day }}</td>
                <td data-label="Klockslag">{{ result.time }}</td>
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
                this.updateResultTable()
            }
        },
        currentPage() {
            this.paginateResults()
            this.updatePageLinks()
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
                this.pageLinks = [...this.pageLinks, i]
            }
        },
        updateResultTable() {
            this.currentPage = 0
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

.flex-jc-center {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 0.5rem;
}

.flex-jc-center form {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.flex-jc-even {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 0.5rem;
}

.flex-jc-even div {
    min-width: 210px;
    display: flex;
    justify-content: center;
}

@media (max-width: 450px) {
    .flex-jc-center,
    .flex-jc-even {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }

    .flex-jc-center > *,
    .flex-jc-even > * {
        min-height: 36px;
    }

    .flex-jc-even > div {
        justify-content: space-evenly;
        align-items: center;
    }
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

@media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
        display: block;
    }

    th,td {
        max-width: unset;
    }

    td.shaded {
        border: none;
    }

    tbody {
        display: flex;
        flex-direction: column;
    }

    thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    tr {
        margin: 0 0 1rem;
        border: none;
        border-radius: 0.25rem;
        overflow: hidden; 
    }

    td {
        border: none;
        border-bottom: 1px solid var(--c-gray-600);
        position: relative;
        padding-left: 50%;
        text-align: center;
    }

    td:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        content: attr(data-label);
    }

    td:nth-of-type(1):before { content: ""; }
    td:nth-of-type(2):before { content: "Url"; }
    td:nth-of-type(3):before { content: "Ip-adress"; }
    td:nth-of-type(4):before { content: "Månad"; }
    td:nth-of-type(5):before { content: "Dag"; }
    td:nth-of-type(6):before { content: "Klockslag"; }
}

</style>