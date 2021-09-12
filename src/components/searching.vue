<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    chips
    clearable
    hide-details
    hide-selected
    item-text="name"
    item-value="symbol"
    label="Search for recipes.."
    solo
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Type
          <strong>Recipe's name</strong>
          <strong>Recipe's ingredient</strong>
          <strong>Recipe's tag</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:selection="{ attr, on, item, selected }">
      <v-chip
        v-bind="attr"
        :input-value="selected"
        color="blue-grey"
        class="white--text"
        v-on="on"
      >
        <v-icon left>
          mdi-bitcoin
        </v-icon>
        <span v-text="item.name"></span>
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-avatar
        color="indigo"
        class="text-h5 font-weight-light white--text"
      >
        {{ item.name.charAt(0) }}
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
        <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>mdi-bitcoin</v-icon>
      </v-list-item-action>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Searching",
  computed: {
    ...mapState("searchRecipes", ["seached_recipe"]),
  },
  watch: {
    // val
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;

      // Lazily load input items
      // fetch(TypeSearching(val))}
      }
  },
  methods:{
     TypeSearching() {
      this.$store.dispatch("searchRecipes/loadSearchedRecipe", this.$state.searchRecipes.searchingWord)},
  }
}
</script>

<style></style>
