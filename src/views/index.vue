<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <v-container>
      <v-row justify-content="center">
        <v-col cols="12" xs="12" sm="6" md="4" lg="4" align-self="center">
          <v-img :src="require('@/assets/logo.png')"></v-img>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="8" lg="8" >
          <h1 class="display-2">
            This is Cooking Recipe Online.
          </h1>
          <v-row>
            <v-col xs="12" sm="12" md="6" lg="6" 
              ><v-btn
                color="orange darken-1"
                dark
                block
                x-large
                depressed
                to="/login"
              >
                Signin
              </v-btn></v-col
            >

            <v-col xs="12" sm="12" md="6" lg="6">
              <v-btn
                color="orange darken-1"
                dark
                block
                x-large
                depressed
                to="/register"
                >Register
              </v-btn></v-col
            ></v-row
          >
        </v-col>
      </v-row>

      <v-row align-self="center" justify="center">
        <v-col cols="12" xs="12" sm="5" md="4" lg="4"> </v-col>
        <v-col cols="12" xs="12" sm="5" md="4" lg="4"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>
