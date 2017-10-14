<template>
    <div >
        <md-layout id="container">
            <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-flex-large="100" md-flex-xlarge="100">
                <md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <div class="label white">
                        Ice box
                    </div>
                </md-layout>
                <md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <div class="label red">
                        Emergency
                    </div>
                </md-layout>
                <md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <div class="label blue">
                        In Progress
                    </div>
                </md-layout>
                <md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <div class="label orange">
                        Testing
                    </div>
                </md-layout>
                <md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <div class="label green">
                        Complete
                    </div>
                </md-layout>
            </md-layout>


            <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-flex-large="100" md-flex-xlarge="100">
                <md-layout md-flex-xsmall="20"  md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <draggable  class="dragArea ib" :options="{group:'stories'}" @end="onEnd">
                        <md-card v-for="story in storiesIB" class="md-primary" :data-id="story.id">
                             <md-card-content>
                                {{story.description}}
                             </md-card-content>
                        </md-card>
                    </draggable>
                </md-layout>
                <md-layout md-flex-xsmall="20"  md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <draggable  class="dragArea em" :options="{group:'stories'}" @end="onEnd" >
                        <md-card v-for="story in storiesEM" class="md-primary" :data-id="story.id">
                             <md-card-content>
                                {{story.description}}
                             </md-card-content>
                        </md-card>
                </draggable>
                </md-layout>
                <md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <draggable  class="dragArea ip" :options="{group:'stories'}" @end="onEnd" >
                        <md-card v-for="story in storiesIP" class="md-primary" :data-id="story.id">
                             <md-card-content>
                                {{story.description}}
                             </md-card-content>
                        </md-card>
                    </draggable>
                </md-layout>
                <md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <draggable class="dragArea tt" :options="{group:'stories'}" @end="onEnd" >
                        <md-card v-for="story in storiesTT" class="md-primary" :data-id="story.id">
                             <md-card-content>
                                {{story.description}}
                             </md-card-content>
                        </md-card>
                    </draggable>
                </md-layout>
                <md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" md-flex-large="20" md-flex-xlarge="20">
                    <draggable class=" dragArea cp" :options="{group:'stories'}" @end="onEnd" >
                        <md-card v-for="story in storiesCP" class="md-primary" :data-id="story.id">
                             <md-card-content>
                                {{story.description}}
                             </md-card-content>
                        </md-card>
                    </draggable>
                </md-layout>
            </md-layout>
        </md-layout>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    data () {
        return {
            id: this.$route.params.id,
            storiesIB: [], // array for IceBox
            storiesEM: [], // array for Emergency
            storiesIP: [], // array for In Progress
            storiesTT: [], // array for Testing
            storiesCP: [], // array for Complete
            getProjectEndPoint: 'http://localhost:8080/project/',
            changeStatusEndPoint: 'http://localhost:8080/changestatus/'
        }
    },

    methods: {
        getStories: function() {
            function getCookie(name) {
              var value = "; " + document.cookie;
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) return parts.pop().split(";").shift();
            }

            this.$http.get(this.getProjectEndPoint + this.id + "/?access_token=" + getCookie("access_token")).then(function(response) {
                response.data.forEach((item) => {
                    if(item.status==1) this.storiesIB.push(item);
                    else if(item.status==2) this.storiesEM.push(item);
                    else if(item.status==3) this.storiesIP.push(item);
                    else if(item.status==4) this.storiesTT.push(item);
                    else if(item.status==5) this.storiesCP.push(item);
                });
            }, function(error) {
                console.log(error);
            })
        },
        onEnd: function(evt){
            var id = evt.item.getAttribute('data-id');
            var targetArea = evt.item;

            if (!evt.item.classList.contains('dragArea')){
                var targetArea = evt.item.closest('.dragArea');
            }
            var targetStatus = 0;

            if (targetArea.classList.contains('ib')) targetStatus = 1;
            else if (targetArea.classList.contains('em')) targetStatus = 2;
            else if (targetArea.classList.contains('ip')) targetStatus = 3;
            else if (targetArea.classList.contains('tt')) targetStatus = 4;
            else if (targetArea.classList.contains('cp')) targetStatus = 5;

            function getCookie(name) {
              var value = "; " + document.cookie;
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) return parts.pop().split(";").shift();
            }

            var options = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            this.$http.post(this.changeStatusEndPoint + "?access_token=" + getCookie("access_token"), {id:id,status:targetStatus}, options).then(function(response) {
                console.log('sc')
            }, function(error) {
                if(getCookie('access_token') && error.status == 401){
                    document.location= "/";
                    document.cookie= "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                }
            })
        }
    },
    created: function() {
        this.getStories();
    }

}
</script>
<style>
#container > .md-layout {
    background-color: white;
    min-height: 100px;
    border-color: black;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    padding: 8px;
}

.md-layout{
    justify-content: center;
}

.dragArea{
    min-height:100px;
    width:100%;
}
.label{
    box-shadow: 0 1px 5px rgba(0,0,0,.2),0 2px 2px rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12);
    padding: 16px 0;
    display: inline-block;
    color: rgba(255, 255, 255, .87);
    transition: all .4s cubic-bezier(.25,.8,.25,1);
    min-width:100%;
    text-align: center;
    box-sizing: border-box;
}

.label.red{
    background-color:crimson;
}
.label.green{
    background-color:#0ec40e;
}
.label.blue{
    background-color:#2196f3;
}
.label.white{
    background-color:white;
    color:#2196f3;
}
.label.orange{
    background-color:orange;
}
.md-card{
    width:100%;
    margin:7px 0;
}
.md-card-content{
    pointer-events: none;
}

</style>
