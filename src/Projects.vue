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
                    <md-table-cell>
                        <router-link :to="{ name: 'detail', params: {id: project.id} }">
                            {{project.name}}
                        </router-link>
                    </md-table-cell>
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
            endpoint: 'http://localhost:8080/'
        }
    },

    methods: {
        getAllProjects: function() {
            // var options = {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }
            function getCookie(name) {
              var value = "; " + document.cookie;
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) return parts.pop().split(";").shift();
            }
            this.$http.get(this.endpoint + "?access_token=" + getCookie("access_token")).then(function(response) {
                this.projects = response.data
            }, function(error) {
                if(getCookie('access_token') && error.status == 401){
                    document.location= "/";
                    document.cookie= "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                }
            })
        }
    },
    created: function() {
        this.getAllProjects();
    }

}
</script>
<style>
    .md-table .md-table-cell{
        font-size: 22px;
    }
</style>
