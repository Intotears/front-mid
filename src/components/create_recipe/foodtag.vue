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
  </v-container>
</template>

<script>
import { mapState } from "vuex";
//import {mapGetters} from "vuex";
export default {
  name: "Foodtag",
  data() {
    return {

    };
  },
  computed: {
    //...mapState("showFoodtag", ["foodtag"]),
    ...mapState("showFoodtag", ["selectTag"]),
    thisFoodtag() {
      return this.$store.state.showFoodtag.foodtag;
    },
    // thisSelectTag : function(){
    //   return this.selectTag;
    // },
    // thisFoodtag() {
    //   return this.foodtag.find((v) => v.tagName);
    // },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.$store.dispatch("showFoodtag/loadFoodtag");
  },

  methods: {
    // addSelectTag() {
    //   const selectTag = this.selectTag;
    //   console.log(this.selectTag);
    //   this.$store.dispatch("showFoodtag/selectFoodTag", selectTag);
    //   console.log(this.$store.state.selectTag);
    // },
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
    },
  },
};
</script>

<style></style>
