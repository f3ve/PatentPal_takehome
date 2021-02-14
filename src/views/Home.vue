<template>
  <div class="home">
    <main class="homeMain">
      <section class="banner">
        <div class="bannerText">
          <div>
            <h1>
              PatentPal Graph Editor Demo. Build Awesome Graphs.
            </h1>
            <p>
              This is a demo created by Freedom Evenden. This project has been a
              lot of fun and I look forward to working on some more projects for
              PatentPal. Thank you very much for considering me for this role
              and I hope you like what I've built.
            </p>
          </div>
          <router-link to="/draft" class="linkButton">Get Started</router-link>
        </div>
        <img
          src="../assets/Robot-Figure.webp"
          alt="Big PatentPal logo"
          class="bigLogo"
        />
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.homeMain {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1080px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
}

.banner {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 27px 54px;
}

.bannerText {
  width: 450px;
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bannerText h1 {
  font-size: 30px;
}

.bigLogo {
  max-height: 420px;
}

.linkButton {
  background-color: #e04c4c;
  width: fit-content;
  height: 50px;
  color: white;
  padding: 15px;
  border-radius: 50px;
  text-decoration: none;
}
</style>
