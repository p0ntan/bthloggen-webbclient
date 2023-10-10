<template>
    <div class="app-body-main-content">
        <div>
            <h2 v-if="this.$store.result === -1">Sök i fältet ovan</h2>
        </div>
        <div v-if="this.$store.result.length > 0">
            <p>Antall träffar i loggen: {{ this.$store.result.length }}</p>
            <table>
                <thead>
                    <tr>
                        <th scope="col url">Url</th>
                        <th scope="col ip">Ip-adress</th>
                        <th scope="col month">Månad</th>
                        <th scope="col day">Dag</th>
                        <th scope="col time">Klockslag</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="result in this.$store.result">
                        <td>{{ result.url }}</td>
                        <td>{{ result.ip }}</td>
                        <td>{{ result.month }}</td>
                        <td>{{ result.day }}</td>
                        <td>{{ result.time }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="this.$store.result.length === 0">
            <h2>Inga resultat för sökningen.</h2>
        </div>

        <!-- <section class="service-section">
            <div class="tiles">
                <article class="tile">
                    <div class="tile-header">
                        <i class="ph-lightning-light"></i>
                        <h3>
                            <span>Electricity</span>
                            <span>UrkEnergo LTD.</span>
                        </h3>
                    </div>
                    <a href="#">
                        <span>Go to service</span>
                        <span class="icon-button">
                            <i class="ph-caret-right-bold"></i>
                        </span>
                    </a>
                </article>
                <article class="tile">
                    <div class="tile-header">
                        <i class="ph-fire-simple-light"></i>
                        <h3>
                            <span>Heating Gas</span>
                            <span>Gazprom UA</span>
                        </h3>
                    </div>
                    <a href="#">
                        <span>Go to service</span>
                        <span class="icon-button">
                            <i class="ph-caret-right-bold"></i>
                        </span>
                    </a>
                </article>
                <article class="tile">
                    <div class="tile-header">
                        <i class="ph-file-light"></i>
                        <h3>
                            <span>Tax online</span>
                            <span>Kharkov 62 str.</span>
                        </h3>
                    </div>
                    <a href="#">
                        <span>Go to service</span>
                        <span class="icon-button">
                            <i class="ph-caret-right-bold"></i>
                        </span>
                    </a>
                </article>
            </div>
        </section> -->
    </div>
</template>

<script>
export default {
}
</script>