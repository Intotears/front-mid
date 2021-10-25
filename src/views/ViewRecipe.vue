<template>
  <v-app style="background-color: #fff3e0">
    <v-container style="background-color: #ffff">
      <div style="margin-top: 10px">
        <v-container>
          <viewDetail />
        </v-container>
      </div>

      <br />

      <div style="margin-top: 10px">
        <v-container>
          <v-card-title>
            <h3>ส่วนผสม</h3>
          </v-card-title>

          <viewMainingre />

          <v-divider></v-divider>

          <viewSubingre />

          <v-divider></v-divider>

          <viewFlavoring />
          <v-divider></v-divider>
        </v-container>
      </div>

      <br />

      <div style="margin-top: 10px">
        <v-container>
          <v-card-title>
            <h3>วิธีทำ</h3>
          </v-card-title>
          <viewProcess />
        </v-container>
      </div>

      <br />
      <div class="text-center">
        <h3>ให้คะแนนได้ตรงนี้!</h3>
        <rating />
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "EditRecipe",
  data() {
    return {
      todos: [],
      step: 1,
    };
  },
  components: {
    rating: () => import("../components/view_recipe/Rating.vue"),
    viewDetail: () => import("../components/view_recipe/view-detail.vue"),
    viewMainingre: () => import("../components/view_recipe/view-mainingre.vue"),
    viewSubingre: () => import("../components/view_recipe/view-subingre.vue"),
    viewFlavoring: () => import("../components/view_recipe/view-flavoring.vue"),
    viewProcess: () => import("../components/view_recipe/view-process.vue"),
  },
};
</script>

<style>
</style>
