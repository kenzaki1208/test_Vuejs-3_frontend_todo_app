<script>
  export default {

  }
</script>

<template>
  <nav class="navbar">
    <div class="container-1">
      <router-link class="navbar-brand" to="/">Todo app with VueJS 3 + ASP.NET + SQL Server</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li >
            <router-link class="nav-link" to="/Home">Home</router-link>
          </li>
          <li >
            <router-link class="nav-link" to="/create">Create</router-link>
          </li>
          <li >
            <router-link class="nav-link" to="/edit/:id">Edit</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-2">
    <router-view>

    </router-view>
  </div>
</template>

<style scoped>

</style>
