<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <v-container justify-content-center>
      <v-row align-self="center" justify="center">
        <h1 class="display-2">
          This is Cooking Recipe Online that everyone trust.
        </h1>
      </v-row>

      <v-row align-self="center" justify="center">
        <v-col cols="12" xs="12" sm="5" md="4" lg="4">
          <v-btn color="primary" block x-large depressed to="/login">
            Signin
          </v-btn>
        </v-col>
        <v-col cols="12" xs="12" sm="5" md="4" lg="4">
          <v-btn color="primary" block x-large depressed to="/register"
            >Register
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>