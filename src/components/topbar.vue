<template>
  <header :class="scrolled ? 'topbar scrolled' : 'topbar'">
    <router-link to="/">
      <img
        src="../assets/PatentPal_Logo.png"
        alt="PatentPal logo"
        class="mainLogo"
      />
    </router-link>

    <!-- Nav Manu for large screens -->
    <mq-layout mq="md+">
      <nav id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/draft">Draft</router-link>
      </nav>
    </mq-layout>
    <!-- End large screen menu -->

    <!-- Nav Menu for smalls screens -->
    <mq-layout mq="sm">
      <nav class="dropdown">
        <button class="hamburger" @click="toggleDropdown">
          <font-awesome-icon icon="bars" />
        </button>
        <transition name="slide-fade">
          <ul class="dropdown-menu" v-if="dropDown">
            <router-link to="/">Home</router-link>
            <router-link to="/draft">Draft</router-link>
          </ul>
        </transition>
      </nav>
    </mq-layout>
    <!-- End large screen menu -->
  </header>
</template>

<script>
export default {
  name: 'Topbar',
  mounted: function() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('click', this.handleClick);
  },

  data() {
    return {
      scrolled: false,
      dropDown: false,
    };
  },

  beforeDestroy: function() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('click', this.handleClick);
  },
  methods: {
    toggleDropdown(e) {
      e.stopPropagation();
      this.dropDown = !this.dropDown;
    },
    handleClick() {
      /*
        if user clicks anywhere on screen while dropdown is open, closes dropdown
      */
      if (this.dropDown) {
        this.dropDown = false;
      }
    },
    handleScroll() {
      // checks if user is at the top of the page on scroll
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

a {
  font-weight: bold;
  text-decoration: none;
  margin: 0 10px;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #e04c4c !important;
}

.hamburger {
  color: #e04c4c;
  font-size: 20px;
  border: none;
  background-color: transparent;
}

.hamburger:hover {
  cursor: pointer;
}

.dropdown-menu {
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 10px;
  right: 20px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  border-top: 3px solid #e04c4c;
  background-color: white;
}

.dropdown-menu a {
  margin: 5px;
}

.slide-fade-enter-active {
  transition: all 0.3s;
}
.slide-fade-leave-active {
  transition: all 0.3s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
