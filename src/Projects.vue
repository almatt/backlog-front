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
                    <div class="delete"  :data-id="project.id" @click="deleteProject">
                        <md-icon class="no-click">
                            delete_forever
                        </md-icon>
                    </div>
                </md-table-cell>
            </md-table-row>
        </md-table-body>
    </md-table>

    <md-dialog md-open-from="#create" md-close-to="#create" ref="dialog">
        <md-dialog-title>Create</md-dialog-title>
        <md-dialog-content>
            <form @submit.stop.prevent="submitCreateProject">
                <md-input-container>
                    <label>Project name</label>
                    <md-input required placeholder="Name" v-model="name"></md-input>
                </md-input-container>
            </form>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="dialog('dialog', 'close')">Cancel</md-button>
            <md-button class="md-primary" @click="submitCreateProject">Create</md-button>
        </md-dialog-actions>
    </md-dialog>

    <md-button class="md-fab md-fab-bottom-right" id="create" @click="dialog('dialog', 'open')">
        <md-icon>add</md-icon>
    </md-button>
</div>
</template>

<script>
export default {
    data() {
        return {
            projects: [],
            endpoint: 'http://localhost:8080/',
            createProjectEndPoint: 'http://localhost:8080/create/',
            deleteProjectEndPoint: 'http://localhost:8080/delete/',
            name: ""
        }
    },

    methods: {
        dialog: function(ref, type) {
            if (this.$refs[ref]) {
                if (type == 'open')
                    this.$refs[ref].open();
                else
                    this.$refs[ref].close();
            }
        },
        submitCreateProject: function() {
            function getCookie(name) {
                var value = "; " + document.cookie;
                var parts = value.split("; " + name + "=");
                if (parts.length == 2) return parts.pop().split(";").shift();
            }
            if (this.name != '') {
                this.$http.post(this.createProjectEndPoint + "?access_token=" + getCookie("access_token"), {name: this.name}).then(function(response) {
                    this.dialog('dialog', 'close');
                    this.getAllProjects();
                    this.name='';
                }, function(error) {
                    if (getCookie('access_token') && error.status == 401) {
                        document.location = "/";
                        document.cookie = "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    }
                })
            }
        },
        deleteProject: function(event){
            var id = event.target.getAttribute('data-id');
            function getCookie(name) {
                var value = "; " + document.cookie;
                var parts = value.split("; " + name + "=");
                if (parts.length == 2) return parts.pop().split(";").shift();
            }
            var options = {
                body:{
                    id:id
                }
            }

            this.$http.delete(this.deleteProjectEndPoint + "?access_token=" + getCookie("access_token"),options).then(function(response) {
                this.getAllProjects();
            }, function(error) {
                if (getCookie('access_token') && error.status == 401) {
                    document.location = "/";
                    document.cookie = "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                }
            })
        },
        getAllProjects: function() {
            function getCookie(name) {
                var value = "; " + document.cookie;
                var parts = value.split("; " + name + "=");
                if (parts.length == 2) return parts.pop().split(";").shift();
            }
            this.$http.get(this.endpoint + "?access_token=" + getCookie("access_token")).then(function(response) {
                this.projects = response.data
            }, function(error) {
                if (getCookie('access_token') && error.status == 401) {
                    document.location = "/";
                    document.cookie = "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                }
            });
        }
    },
    created: function() {
        this.getAllProjects();
    }

}
</script>
<style>
.md-table .md-table-cell {
    font-size: 22px;
}

.delete{
    cursor: pointer;
}

.no-click{
    pointer-events: none;
}

</style>
