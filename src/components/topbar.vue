<template>
  <div class="topbar">
    <router-link to="/">
      <img src="../assets/PatentPal_Logo.png" alt="PatentPal logo" class="mainLogo">
    </router-link>
    <nav id="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/about">About</router-link> | 
      <router-link to="/newpage">New Page</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Topbar",
  data: () => ({
    title: "poop",
    bool: false
  })
}
</script>

<style scoped>
  div.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  img.mainLogo {
    width: 100%;
    max-height: 40px;
  }

  #nav {
  padding: 30px;
}

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #e04c4c;
  }
</style>