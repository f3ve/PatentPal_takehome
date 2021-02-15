<template>
  <header :class="scrolled ? 'topbar scrolled' : 'topbar'">
    <router-link to="/">
      <img
        src="../assets/PatentPal_Logo.png"
        alt="PatentPal logo"
        class="mainLogo"
      />
    </router-link>
    <mq-layout mq="md+">
      <nav id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/draft">Draft</router-link>
      </nav>
    </mq-layout>
    <mq-layout mq="sm">
      <font-awesome-icon
        icon="bars"
        class="hamburger"
        @click="click"
      ></font-awesome-icon>
    </mq-layout>
  </header>
</template>

<script>
export default {
  name: 'Topbar',
  mounted: function() {
    window.addEventListener('scroll', this.handleScroll);
  },

  data() {
    return {
      scrolled: false,
    };
  },

  beforeDestroy: function() {
    window.removeEventListener('scroll', this.handleScroll());
  },
  methods: {
    click: () => {
      console.log('clicked');
    },
    handleScroll() {
      if (window.pageYOffset > 0) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    },
  },
};
</script>

<style scoped>
header.topbar {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  height: 64px;
  padding: 30px;
  z-index: 3;
  top: 0;
  width: 100%;
  transition: all 0.3s;
}

.scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

img.mainLogo {
  max-height: 40px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  margin: 0 10px;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #e04c4c;
}

.hamburger {
  color: #e04c4c;
  font-size: 20px;
}
</style>
