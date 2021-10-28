<template>
    <div>
        <v-app-bar dark>
            <v-app-bar-nav-icon  @click.stop="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
            <v-toolbar-title>Country Database</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer app dark temporary v-model ="isDrawerOpen">
            <v-toolbar class="secondary">
               <v-toolbar-title class="title"> Menu</v-toolbar-title>
            </v-toolbar>
            <v-list>
                <v-list-item-group>
                    <v-list-item v-for="(item, index) in items" :key="index" :to="item.route">
                        <v-list-item-icon> 
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isDrawerOpen: false,
            items: [
                {icon: 'mdi-database', title: 'List Country', route:'/'},
            ]
        }
    },
}
</script>