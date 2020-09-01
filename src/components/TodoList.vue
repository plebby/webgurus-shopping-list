<template>
<v-container>
    <v-expansion-panels>
        <v-expansion-panel v-for="todo in todos" :key="todo.id">

            <v-expansion-panel-header :disabled="!todo.checked">
                <v-row no-gutters>
                    <v-col cols="2">
                        <v-checkbox v-bind:checked="todo.checked" @change="toggle(todo)"></v-checkbox>
                        <!--<input type=" checkbox" v-bind:checked="todo.checked" @change="toggle(todo)">-->
                    </v-col>
                    <v-col cols="8">
                        <span v-if="!todo.checked" class="text-decoration-line-through text--disabled">
                            {{ todo.title }}
                        </span>
                        <span v-else v-bind:class="{ checked: !todo.checked }">
                            {{ todo.title }}
                        </span>
                    </v-col>
                    <v-col cols="2">
                        <button v-on:click="remove(todo.id)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </button>
                    </v-col>
                </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-if="!todo.checked" class="text-decoration-line-through text--disabled">
                {{todo.description}}
            </v-expansion-panel-content>
            <v-expansion-panel-content v-else>
                {{todo.description}}
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mt-5">
                Add
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Hozzadas</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Title" v-model="title"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Description" v-model="description"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn @click.stop="add">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import moment from 'moment'
export default {
    data: function () {
        return {
            dialog: false,
            item: [],
            title: '',
            description: '',
            checked: true
        }
    },
    // todos.jsのactionsのinitを呼び出してfirebaseを初期化
    created: function () {
        this.$store.dispatch('init')
    },
    methods: {
        add() {
            this.item.title = this.title
            this.item.description = this.description
            this.$store.dispatch('add', this.item)
            this.title = ''
            this.description = ''
            this.dialog = false
        },
        remove(id) {
            this.$store.dispatch('remove', id)
        },
        toggle(todo) {
            this.$store.dispatch('toggle', todo)
        }
    },
    computed: {
        todos() {
            return this.$store.state['todos']
        }
    },
    filters: {
        dateFilter: function (date) {
            return moment(date).format('YYYY/MM/DD HH:mm:ss')
        }
    }
}
</script>

<style>
.container {
    width: 1000px;
    position: relative;
    display: flex;
    justify-content: space-between;
}

.container .card {
    position: relative;
    height: auto;
}

.container .card .face {
    width: 300px;
    height: 70px;
    transition: 0.5s;
}

.container .card .face.face1 {
    position: relative;
    background: #f2f2f2;
    display: flex;
    justify-content: left;
    padding-left: 15px;
    align-items: center;
    z-index: 1;
    box-sizing: border-box;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

.container .card .face.face2 {
    position: relative;
    background: white;
    display: flex;
    justify-content: left;
    padding-left: 15px;
    align-items: center;
    box-sizing: border-box;
    transform: translateY(-70px);
}

.container .card:hover .face.face2 {
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
}

.container .card .face.face2 .content p {
    margin: 0;
    padding: 0;
}

.dwn:hover {
    cursor: pointer;
}

@media screen and (max-width: 700px) {
    .container {
        width: 50vw;
        margin: 0;
        padding: 0;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .container .card {

        position: relative;
        display: flex;
        flex-direction: column;
        transition: 0.3s ease-in-out;
        margin: 20px;
        margin-top: 0;
        margin-left: -40px;
        padding: 0;
        transition: 0.5s ease-in-out;
    }

    .container .card .face {
        width: 90vw;
        padding: 0;
        margin: 0;
        transition: 0.5s;
    }

    .container .card .face.face1 {
        margin: 0;
        padding: 0;
        position: relative;
        background: #f2f2f2;
        display: flex;
        justify-content: left;
        padding-left: 15px;
        align-items: center;
        z-index: 1;
        box-sizing: border-box;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        transition: 0.5s ease-in-out;
    }

    .container .card .face.face2 {
        position: absolute;
        background: white;
        display: flex;
        justify-content: left;
        padding-left: 15px;
        align-items: center;
        box-sizing: border-box;
        transition: 0.5s ease-in-out;
        transform: translateY(-5px);
    }

    .container .card:hover .face.face2 {
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
        transform: translateY(0px);
        position: relative;
        transition: 0.5s ease-in-out;
    }

    .container .card .face.face2 .content p {
        margin: 0;
        padding: 0;
    }
}
</style>
