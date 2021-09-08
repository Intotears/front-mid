<template>

      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="2"
            color="success"
            fab
            dark
            v-bind="attrs"
            v-on="on"
            @click="addRecipe"
          >
            <v-icon> mdi-content-save </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Create success!
          </v-card-title>
          <v-card-text
            >You just create this recipe.
            <v-icon> mdi-emoticon </v-icon></v-card-text
          >
          <v-card-actions>
            <v-btn color="primary" text @click="dialog = false">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false" to="/">
              Go to Home
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
  name: "Savebutton",
  data() {
    return {
      dialog: false,
      activator: null,
    };
  },
  methods: {
    addRecipe(){}
  },
};
</script>

<style></style>
