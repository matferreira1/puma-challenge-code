<template>
  <div class="full-height">
    <ul>
      <li v-for="favorite in favorites" :key="favorite.login" class="user-card">
        <div class="card">
          <img :src="favorite.photo" alt="Avatar" class="avatar">
          <div class="card-body">
            <h3 class="card-title">Usuário: {{ favorite.login }}</h3>
          </div>
          <div class="card-body">
            <p class="card-text">Nome: {{ favorite.username }}</p>
          </div>
          <a :href="favorite.urlProfile" target="_blank" class="card-link">Ver Perfil</a>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import api from "@/services/api";
import { ref,onMounted } from "vue";


export default {
  name: "HomeView",
  setup(){
    const favorites = ref([]);
    const fetchFavorites = () => api.get("/users").then((response) => {
      favorites.value = response.data;
    })
    .catch((error) => {
          console.error("Erro ao buscar favoritos:", error);
    });

    onMounted(fetchFavorites);

    return {
      favorites,
    };
  },
};
</script>

<style>
.usernames{
  color: white;
}
.user-card {
  list-style: none;
  margin: 20px 0;
}
.full-height {
  height: 100vh; 
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

.card-link {
  margin-top: auto;
  margin-left: 20px;
  color: #007BFF;
  text-decoration: none;
}
.card-text {
  margin: 0;
  margin-bottom: 5px;
}
.card-link:hover {
  text-decoration: underline;
}
</style>
