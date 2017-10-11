<template>
<div>
    <md-table md-sort="name">
        <md-table-header>
            <md-table-row>
                <md-table-head md-sort-by="name">Project name</md-table-head>
            </md-table-row>
        </md-table-header>

        <md-table-body>
            <md-table-row v-for="project in projects">
                <md-table-cell>{{project.name}}</md-table-cell>
            </md-table-row>
        </md-table-body>
    </md-table>

</div>
</template>

<script>
export default {
    data() {
        return {
            projects: [],
            endpoint: 'http://localhost:8080'
        }
    },

    methods: {
        getAllProjects: function() {
            var options = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            this.$http.get(this.endpoint, options).then(function(response) {
                this.projects = response.data
            }, function(error) {
                console.log(error);
            })
        }
    },
    created: function() {
        this.getAllProjects();
    }

}
</script>
<style>

</style>
