<template>
  <div>
    <div class="text-center">
      <v-rating
        :items="Stars"
        item-text="Stars"
        v-model="rating"
        :rules="Rules"
        icon-label="custom icon label text {0} of {1}"
      ></v-rating>

    </div>
    <v-dialog class="text-center" v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <div class="my-2">
          <v-btn
            color="warning"
            dark
            v-bind="attrs"
            v-on="on"
            @click="saveRating() "
          >
            Rate
          </v-btn>
        </div>
        
      </template>
      <v-card>
        <v-card-title class="headline"> Rating! </v-card-title>
        <v-card-text
          >Rating Success !<v-icon> mdi-emoticon </v-icon></v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" text @click="reloadPage()" >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//import Vue from "vue";
//import { mapState } from "vuex";
export default {
  name: "stars-rating",
  components: {},
  props: {
    value: {
      type: null,
    },
  },
  data: function () {
    return {
      Stars: [
        { value: 5 },
        { value: 4 },
        { value: 3 },
        { value: 2 },
        { value: 1 },
      ],
      Rules: [(v) => !!v || "Recipe name cannot be null"],
      rating: "",
      // temp_value: null,
      dialog: false,
      activator: null,

      
    };
  },
  async created() {
    await this.$store.dispatch("viewRecipe/loadUserRating", this.$route.params.id);
    await this.$store.dispatch("viewRecipe/StoreUserID", this.currentUser.userID);
    await this.$store.dispatch("viewRecipe/loadUserRatingUpdate", this.$route.params.id);
    this.showRating();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    allUserRating() {
      return this.$store.state.viewRecipe.user_rating;
    },
    thisUserRating(){
      return this.$store.state.viewRecipe.user_rateUp ;
    },

  },

  methods: {
    //reload
    async reloadPage() {
       this.dialog = await false;
      await window.location.reload();
    },
    showRating(){
      this.rating = this.thisUserRating.rate
    },
    async saveRating() {
      const allUserRating = this.allUserRating;
      let isUserHadReview = false;
      for (var i in allUserRating) {
        if (allUserRating[i].ur_ID != null) {
          if (
            allUserRating[i].userID == this.currentUser.userID &&
            allUserRating[i].recipeID == this.$route.params.id
          ) {
            let rating = {
              rate: this.rating,
            };
            await this.$store.dispatch(
              "viewRecipe/StoreUser_RatingID",
              allUserRating[i].ur_ID
            ),
              await this.$store.dispatch("viewRecipe/EditUserRating", rating);
            
            console.log("Rate Update:", rating);

            isUserHadReview = true;
            break;
          }
        }
      }
      if (isUserHadReview == false) {
        let rating = {
          rate: this.rating,
        };
        await this.$store.dispatch("viewRecipe/storeID", this.$route.params.id);
        await this.$store.dispatch(
          "viewRecipe/StoreUserID",
          this.currentUser.userID
        );
        await this.$store.dispatch("viewRecipe/GiveRating", rating);
        console.log("Insert : ", rating);
        await this.$store.dispatch(
          "viewRecipe/loadUserRating",
          this.$route.params.id
        );
      }
    },
  },
};
</script>
