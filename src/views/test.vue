<template>
  <v-card
    class="mx-auto elevation-5"
    color="purple"
    dark
    style="max-width: 550px;"
    ><v-card-actions class="pa-4">
      Rate this album
      <v-spacer></v-spacer>
      <span class="grey--text text--lighten-2 text-caption mr-2">
        ({{ rating }})
      </span>
      <v-rating
        v-model="rating"
        background-color="white"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="18"
        icon
      ></v-rating>
      
        <v-btn icon>
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
      
    </v-card-actions>
    <v-divider dark class="mb-2"></v-divider>

    <v-row justify="space-between">
      <v-img
        class="shrink ma-2"
        height="150px"
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        style="flex-basis: 150px"
        tile
      ></v-img>

      <v-col cols="8">
        <v-card-title>
          <div>
            <div class="text-h5">
              Halycon Days
            </div>
            <div>Ellie Goulding</div>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div>(2013)</div>
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "test",
  
};

</script>

<style></style>
