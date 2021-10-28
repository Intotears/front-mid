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
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="pink"
          v-bind="attrs"
          v-on="on"
          @click="saveRating()"
        >
          <v-icon> mdi-heart </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline"> Rating! </v-card-title>
        <v-card-text
          >Rating Success !<v-icon> mdi-emoticon </v-icon></v-card-text
        >
        <!-- <polygon :points="getStarPoints" style="fill-rule: nonzero" /> -->
        <!-- <span class="rating" :class="{ 'disable-all-rating': !!value }">
        <div v-for="RateStar in RateStars" :key="RateStar.id">
          <label
            class="radio-inline input-star"
            :class="{
              'is-selected': starValue >= RateStar.value && starValue != null,
            }"
          >
            <input
              type="radio"
              class="input-rating"
              v-model="starValue"
              @click="rate(RateStar.value)"
            />
          </label>
        </div>
      </span> -->

        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false"> Back </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false" to="/">
            Home
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
  created() {
    this.$store.dispatch("viewRecipe/loadUserRating", this.$route.params.id);
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    allUserRating() {
      return this.$store.state.viewRecipe.user_rating;
    },
    thisUserRating(){
      return this.$store.state.viewRecipe.user_rateUp;
    }
  },
  methods: {
    addRating() {
      let rating = {
        rate: this.rating,
      };
      this.$store.dispatch("viewRecipe/storeID", this.$route.params.id),
        this.$store.dispatch("viewRecipe/StoreUserID", this.currentUser.userID),
        this.$store.dispatch("viewRecipe/GiveRating", rating);
      console.log("เพิ่มเรท", rating);
    },

    // rate: function (star) {
    //   this.$http.post(window.BaseUrl + "/star", { star: star });
    //   this.temp_value = star;
    // },

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
