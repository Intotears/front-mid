<template>
  <div>
    <div class="text-center">
      <v-rating
        :items="Stars"
        item-text="Stars"
        v-model="rate"
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
          @click="addRating(), test()"
        >
          <v-icon> mdi-heart </v-icon>
        </v-btn>
        <v-btn @click="updateRating()">
          
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline"> Rating! </v-card-title>
        <v-card-text
          >Rating Success ! <v-icon> mdi-emoticon </v-icon></v-card-text
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
      rate: "",
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
    thisUserRating() {
      return this.$store.state.viewRecipe.user_rating;
    },
  },
  methods: {
    addRating() {
      let rating = {
        rate: this.rate,
      };
      this.$store.dispatch("viewRecipe/storeID", this.$route.params.id),
        this.$store.dispatch("viewRecipe/StoreUserID", this.currentUser.userID),
        this.$store.dispatch("viewRecipe/GiveRating", rating);
      console.log("เพิ่มเรท", rating);
    },
    test() {
      console.log("test", this.thisUserRating);
      console.log("test2", this.rating);
    },

    // rate: function (star) {
    //   this.$http.post(window.BaseUrl + "/star", { star: star });
    //   this.temp_value = star;
    // },

    updateRating() {
      //เหมือนมันไม่รู้ว่าจะอัพตรงไหน
      const thisUserRating = this.thisUserRating;
      for (var i in thisUserRating) {

        if (thisUserRating[i].userID == this.currentUser.userID ) {
      console.log("editRating", thisUserRating[i]);
      this.$store.dispatch(
        "viewRecipe/StoreUser_RatingID",
        thisUserRating[i].ur_ID
      ),
        this.$store.dispatch("viewRecipe/EditRating", this.rate);
      console.log("Rate Update:", this.rate);
      }
      }
    },

    saveRating() {
      //conditionยังไม่ผ่านไม่เข้า

      const thisUserRating = this.thisUserRating;
      for (var i in thisUserRating) {
        if (thisUserRating[i].userID != this.currentUser.userID) {
          if (thisUserRating[i].ur_ID != null ) {
            console.log("editRating", thisUserRating[i]);
            this.$store.dispatch(
              "viewRecipe/StoreUser_RatingID",
              thisUserRating[i].ur_ID
            ),
              this.$store.dispatch("viewRecipe/EditRating", this.rating);
            console.log("Rate Update:", this.rating);
            console.log("UR ID:", thisUserRating[i].ur_ID);
          } else {
            

            let rating = {
              rate: this.rating,
            };
            this.$store.dispatch("viewRecipe/storeID", this.$route.params.id),
              this.$store.dispatch(
                "viewRecipe/StoreUserID",
                this.currentUser.userID
              ),
              this.$store.dispatch("viewRecipe/GiveRating", rating);
            console.log("เพิ่มเรท: ", rating);
          }
        }
      }
    },
  },
};
</script>
