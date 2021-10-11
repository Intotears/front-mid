<template>
  <v-container fluid>
    <h3>Choose your Foodtag</h3>
    <v-row>
      <v-col cols="12">
        <v-combobox
          label="Maximum of 5 tags"
          multiple
          outlined
          dense
          v-model="selectTag"
          :items="thisFoodtag"
          item-text="tagName"
          name="selectTag"
        >
        </v-combobox>
      </v-col>
    </v-row>
    <!-- <v-btn elevation="2" color="blue" fab dark @click="next()">
      next
    </v-btn> -->
    <v-spacer> </v-spacer>
    <v-btn
      elevation="2"
      color="success"
      fab
      dark
      @click="selectFoodTag()"
    >
      <v-icon> mdi-content-save </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import router from "@/router";

export default {
  name: "Foodtag",
  data() {
    return {
      selectTag: [],
    };
  },
  computed: {
    thisFoodtag() {
      return this.$store.state.editFoodtag.foodtag;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    loadSelectedFoodtag() {
      return this.$store.state.editFoodtag.selectedFoodtag;
    },
  },
  async created() {
    await this.$store.dispatch(
      "editFoodtag/loadSelectedFoodtag",
      router.currentRoute.params.id
    );
    await this.$store.dispatch("editFoodtag/loadFoodtag");
    
    this.getSelectedFoodtag();
  },
  methods: {
    save() {
      this.$store.dispatch("editFoodtag/deleteSelectedFoodtag", router.currentRoute.params.id);
      console.log("save", this.selectTag)
    },
    getSelectedFoodtag() {
      const tag = this.loadSelectedFoodtag;
      for (var i in tag) {
        this.selectTag.push({
          tagID: tag[i].tagID,
          tagName: tag[i].tagName,
        });
      }
      console.log("selectTag", this.selectTag);
    },
    async selectFoodTag() {   
      const selectTag = await this.selectTag;
      await this.$store.dispatch("editFoodtag/storeRecipeID",  router.currentRoute.params.id);
      await this.$store.dispatch("editFoodtag/deleteSelectedFoodtag", router.currentRoute.params.id);
      await console.log("1",this.selectTag);
      this.$store.dispatch("editFoodtag/selectFoodTag", selectTag);
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;
      const hasValue = (val) => (val != null ? val : "");
      const text = hasValue(itemText);
      const query = hasValue(queryText);
      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  },
  watch: {
    model(val, prev) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
      if (val.length === prev.length) return;
      this.model = val.map((v) => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          };
          this.thisFoodtag.tagName.push(v);
          this.nonce++;
        }
        return v;
      });
      if (this.click == true) {
        const tag = this.loadSelectedFoodtag;
        for (var i in tag) {
          this.selectTag.push({
            tagID: tag[i].tagID,
            tagName: tag[i].tagName,
          });
        }
        console.log("selectTag", this.selectTag);
      }
    },
  },
};
</script>

<style></style>