<script>
  export default {

  }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand text-white" to="/home">Todo app with VueJS 3 + ASP.NET + SQL Server</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create">Create</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/edit/:id">Edit</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container custom-background">
    <router-view>

    </router-view>
  </div>
</template>

<style>
.custom-background {
  background-image: url('/src/assets/1813.jpg_wh860.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
</style>
