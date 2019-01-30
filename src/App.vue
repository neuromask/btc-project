<template>

  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="black">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">
        <img src="./assets/brand.png" height="40px" alt="BV">
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-navbar-brand href="#">
            <i class="fas fa-user-circle text-size-2 lightgrey"></i>
          </b-navbar-brand>

          <b-collapse class="mr-3" is-nav id="nav_text_collapse">
            <b-navbar-nav>
              <b-nav-text class="text-left user-info"><span class="name white font-weight-bold">Innokenty F.</span> Schet: #345543235<br/>Dostupno sredstv
                <span v-on:updateBalance="newBalance" class="balance white font-weight-bold">{{ balance }}</span>
              </b-nav-text>
            </b-navbar-nav>
          </b-collapse>

          <b-navbar-brand class="left-menu" href="#">
            <i class="fab fa-btc white text-size-2"></i>
          </b-navbar-brand>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <!-- navbar-1.vue -->

    <btcform><div v-on:updateBalance="newBalance">asd</div></btcform>

  </div>

</template>

<script>

import btcform from './components/btcform.vue'

export default {
  name: 'app',
  components: {
      btcform
  },
  data() {
      return {
          balance: '120',
      }
  },
  methods: {
      newBalance: function (balance) {
          this.balance = '10';
          console.log('bupd');
      },
      removeFromList() {
          console.log('rem');
      }
  }
}
</script>
