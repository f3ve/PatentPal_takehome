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
      <section class="bottomBanner">
        <div>
          <img src="../assets/Drafting.webp" alt="" />
          <h4>Maximize Profit</h4>
          <p>
            Cut drafting time in half and double your output. PatentPal
            generates language directed to the topics you are writing about and
            adjusts the language to match your style.
          </p>
        </div>
        <div>
          <img src="../assets/Diagram.webp" alt="" />
          <h4>Enhance Quality</h4>
          <p>
            Our software automatically flags errors and makes proofreading
            easier. Impress your clients with work product that is more polished
            and comprehensive
          </p>
        </div>
        <div>
          <img src="../assets/Idea.webp" alt="" />
          <h4>Accelerate Training</h4>
          <p>
            Quickly access attorney-written language directed to the technology
            you are writing about. Get instant feedback on preferred language
            and styles.
          </p>
        </div>
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
.bottomBanner {
  display: flex;
  justify-content: space-between;
}

.home p {
  font-size: 16px;
  line-height: 24px;
  color: #666;
}

.bottomBanner img {
  height: 128px;
}

.bottomBanner div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  text-align: left;
}

.bottomBanner h4 {
  font-size: 20px;
  margin: 0;
  margin-top: 20px;
  font-weight: lighter;
  padding: 0;
  align-self: start;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.homeMain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 1080px;
  max-width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
}

.banner {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 27px 54px;
}

.bannerText {
  width: 450px;
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bannerText p {
  margin-bottom: 20px;
}

.bannerText h1 {
  font-size: 30px;
  margin-bottom: 0;
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
