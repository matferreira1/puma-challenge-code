<template>
  <v-app class="full-height">
    <nav class="navbar">
      <img alt="Github logo" class="logo" src="../assets/logo.png" />
      <div class="title">
        <h1>Usuários Favoritos</h1>
      </div>
      <button class="order-button" @click="orderFavorites"> Ordenar </button>
      <div class="search-bar">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Pesquisar usuário do GitHub"
        />
        <button @click="addUser"> Favoritar </button>
      </div>
      <div v-if="error" class="error-message" @click="clearError">
        {{ error }}
      </div>
    </nav>
    <v-container class="user-list">
      <v-row
        v-for="favorite in favorites"
        :key="favorite.login"
        class="user-card"
      >
        <v-card class="card">
          <v-col>
            <img :src="favorite.photo" alt="Avatar" class="avatar" />
          </v-col>
          <v-col class="card-body">
            <h3 class="card-title">Usuário: {{ favorite.login }}</h3>
          </v-col>
          <v-col class="card-body">
            <p class="card-text">Nome: {{ favorite.username }}</p>
          </v-col>
          <v-col class="card-link">
            <a :href="favorite.urlProfile" target="_blank" class="card-link"
              >Ver Perfil</a
            >
          </v-col>
          <v-col>
            <fa
              icon="trash"
              class="image-buttons"
              @click="deleteUser(favorite.login)"
            />
          </v-col>
          <v-col>
            <fa
              icon="star"
              class="image-buttons"
              @click="starredUser(favorite.login)"
              :class="{ starred: favorite.starred }"
            />
          </v-col>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import api from "@/services/api";
import { ref, onMounted } from "vue";
import 'vuetify/dist/vuetify.min.css'


export default {
  name: "HomeView",
  data() {
    return {
      searchTerm: "",
      error: null,
    };
  },
  methods: {
    clearError() {
      this.error = null;
    },
    orderFavorites() {
      this.favorites.sort((a, b) => {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      });
    },
    addUser() {
      api
        .post(`/users/${this.searchTerm}`)
        .then(() => {
          this.fetchFavorites();
        })
        .catch(() => {
          this.error = "Erro ao adicionar usuário";
        });
    },
    deleteUser(login) {
      api
        .delete(`/users/${login}`)
        .then(() => {
          this.fetchFavorites();
        })
        .catch(() => {
          this.error = "Erro ao deletar usuário ";
        });
    },
    starredUser(login) {
      const user = this.favorites.find((favorite) => favorite.login === login);
      user.starred = !user.starred;
      api
        .patch(`/users/${login}/toggle-star`)
        .then(() => {
          this.fetchFavorites();
        })
        .catch(() => {
          this.error = "Erro ao estrelar usuário";
        });
    },
  },
  created() {
    document.addEventListener("click", this.clearError);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.clearError);
  },

  setup() {
    const favorites = ref([]);
    const fetchFavorites = () =>
      api
        .get("/users", { headers: { "Cache-Control": "no-cache" } })
        .then((response) => {
          favorites.value = response.data;
        })
        .catch(() => {
          this.error = "Erro ao buscar usuários favoritos ";
        });

    onMounted(fetchFavorites);

    return {
      favorites,
      fetchFavorites,
    };
  },
};
</script>

<style>
.error-message {
  color: red;
  font-weight: bold;
  margin: auto;
}
.usernames {
  color: white;
}
.order-button {
  width: 70px;
  background-color: white;
  color: #0a0c10;
  margin-top: 20px;
  margin-right: 500px;
}
.user-card {
  list-style: none;
  margin: 20px 0;
}
.full-height {
  display: flex;
  justify-content: center;
}
.card {
  display: flex;
  margin: 10px;
  width: 700px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-right: 10px;
}
.starred {
  color: #ffd700;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.card-body {
  margin-top: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  margin-left: 20px;
  font-size: 18px;
  margin: 0;
}
.image-buttons {
  margin-right: 5px;
}

.card-link {
  margin-top: auto;
  margin-left: 20px;
  color: #007bff;
  text-decoration: none;
}
.card-text {
  margin: 0;
  margin-bottom: 5px;
}
.card-link:hover {
  text-decoration: underline;
}
.title {
  float: left;
  margin-left: 50px;
  color: white;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 10px;
  z-index: 2;
}
.user-list {
  margin-top: 100px;
}
.search-bar {
  float: right;
  margin-right: 10px;
  margin-top: 20px;
}

.search-bar input {
  padding: 5px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.search-bar button {
  padding: 5px 10px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.logo {
  width: 50px;
  height: auto;
  margin: 5px;
  float: left;
}

.nav-links {
  float: right;
}
nav {
  padding: 30px;
  overflow: hidden;
}

nav a {
  font-weight: bold;
  color: #4a5764;
}

nav a.router-link-exact-active {
  color: #42b983;
}
html {
  background-color: #0a0c10;
}
</style>
