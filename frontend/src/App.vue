<template>
  <nav class="navbar">
    <img alt="Github logo" class="logo" src="../src/assets/logo.png" />
    <div class="title">
      <h1>Usuários Favoritos</h1>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Pesquisar..." />
      <button @click="pesquisar">Pesquisar</button>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      termoDePesquisa: '', 
    };
  },
  methods: {
    pesquisar() {
      console.log('Termo de pesquisa:' + this.termoDePesquisa);
    },
  },

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #0A0C10;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.title{
  float: left;
  margin-left: 50px;
  color: white;
}
.navbar {
  background-color: #1f2833;
  
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
  color: bla;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.logo{
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
</style>
