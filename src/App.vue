<template>
  <div class="grey lighten-1">
    <div class="container">
      <H1 style="margin-top:0px; color:white ;text-shadow: 0 0 5px #424242;">My GitHub repositories</H1>
  
      <div class="col">
        <div class="z-depth-2 card small grey darken-3">
          <div class="row card-content white-text">
            <img class="col S6" style="height:250px;" :src="users.avatar_url" alt />
            <div class="col S6">
              <span class="card-title">{{users.login}}</span>
              <p>followers: {{users.followers}}</p>
              <hr />
              <p>{{users.bio}}</p>
              <br />
              <p>Public repositories: {{users.public_repos}}</p>
              <br />
              <p>
                email:
                <a style="color:#FFAB40" v-bind:href="userEmail">{{users.email}}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
  <hr>
      <p>
        Columns:
        <a v-on:click="oneColumnButton" class="waves-effect waves-light btn grey darken-3" style="color:#FFAB40; margin-right:6px">1</a>
        <a v-on:click="twoColumnButton" class="waves-effect waves-light btn grey darken-3" style="color:#FFAB40; margin-right:6px">2</a>
        <a v-on:click="threeColumnButton" class="waves-effect waves-light btn grey darken-3" style="color:#FFAB40; margin-right:6px">3</a>
      </p>
  
      <div style="margin-bottom:0" class="row">
        <div :class="columns" v-for="repo in repos" v-bind:key="repo.full_name">
          <div class="z-depth-3 card small grey darken-3">
            <div class="card-content white-text">
              <span class="card-title">{{ repo.full_name}}</span>
              <hr />
              <p>{{repo.description}}</p>
              <br />
              <p>Language: {{repo.language}}</p>
            </div>
            <div class="card-action">
              <a :href="repo.html_url">Go to page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import "materialize-css";
import "materialize-css/dist/css/materialize.css";

export default {
  data: function() {
    return {
      repos: [],
      users: [],
      userEmail: "mailto: ",
      columns: 'col s4'
    };
  },
  mounted: function() {
    /*eslint-disable no-console*/
    this.getRepos();
    this.getUsers();
  },
  methods: {
    getRepos: function() {
      axios
        .get("https://api.github.com/user/repos", {
          headers: { Authorization: "Bearer " + process.env.VUE_APP_TOKEN }
        })
        .then(
          response => {
            this.repos = response.data;
            console.log(this.Repos);
          },
          error => {
            console.log(error);
          }
        );
    },
    getUsers: function() {
      axios
        .get("https://api.github.com/user", {
          headers: { Authorization: "Bearer " + process.env.VUE_APP_TOKEN }
        })
        .then(
          response => {
            this.users = response.data;
            this.userEmail += response.data.email;
          },
          error => {
            console.log(error);
          }
        );
    },
    oneColumnButton() {
      this.columns = 'col s12';
    },
    twoColumnButton() {
      this.columns = 'col s6';
    },
    threeColumnButton() {
      this.columns = 'col s4';
    }
  }
};
</script>

<style>
</style>
