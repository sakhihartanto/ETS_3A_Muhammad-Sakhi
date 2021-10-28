<template>
  <v-container>
    <v-row align="center">
      <v-col cols="4">
        <v-text-field
          v-model="search"
          single-line
          label="Search Country"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="country"
          :search="search"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="country_id"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Expandable Table</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-switch
                v-model="singleExpand"
                label="Single expand"
                class="mt-2"
              ></v-switch>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              This Country is {{ item.country }}
            </td>
          </template>
          <template v-slot:top>
            <div class="text-center">
              <v-toolbar flat>
                <v-divider class="mx-4" inset vertical> </v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }} </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.country"
                              label="Country Name"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px" text-center>
                  <v-card>
                    <v-card-title
                      class="headline text-center mx-auto"
                      text-center
                      >Delete ?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn color="error" text @click="deleteItemConfirm"
                        >Delete</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn color="warning" fab x-small>
            <v-icon small  @click="editItem(item)"> mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="error" fab x-small dark>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    search: "",
    expanded: [],
    singleExpand: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Country ID", value: "country_id" },
      { text: "Country", value: "country" },
      { text: "Last Update", value: "last_update" },
      { text: "Actions", value: "actions" },
    ],
    country: [],
    editedIndex: -1,
    editedItem: {
      country: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Edit Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.country.indexOf(item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.selectedItemIndex = this.country.indexOf(item);
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.selectedItemIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.selectedItemIndex = -1;
      });
    },

    deleteItemConfirm() {
      const deleteCountry = this.country[this.selectedItemIndex];
      axios
        .delete(`http://localhost:3000/api/country/${deleteCountry.country_id}`)
        .then((response) => {
          this.country.splice(this.selectedItemIndex, 1);
          this.closeDelete();
          console.log("DELETE SUCCESS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    save() {
      const update = this.country[this.editedIndex];
      const name = this.editedItem.country
      axios
        .put(`http://localhost:3000/api/country/${update.country_id}`, {country: name})
        .then((response) => {
          this.editItem(name)
          this.close();
          console.log("UPDATE SUCCESS", response.data);
        })
        .catch((error) => {
          console.log(error);
          console.log("UPDATE GAGAL", error);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/country/")
      .then((response) => {
        this.country = response.data;
        // console.log(response.data)
      })
      .catch((error) => console.log(error));
  },
};
</script>
