<template>

  <div id="app">
    <b-navbar class="navbar-expand" toggleable="md" type="dark" variant="black">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <span class="align-middle"><img src="./assets/brand.png" height="40px" alt="BV"></span>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand href="#">
              <table class="h-100"><tbody><tr>
                <td class="align-middle">
                  <i class="fas fa-user-circle text-size-2 lightgrey"></i>
                </td>
              </tr></tbody></table>
          </b-navbar-brand>
          <b-collapse class="mr-3" is-nav id="nav_text_collapse">
            <b-navbar-nav>
              <b-nav-text class="text-left user-info">
                <span class="name white font-weight-bold">Александр П.</span> Счет: #345543235<br/>Доступно средств: <span class="balance white font-weight-bold">{{ balance }}</span>
              </b-nav-text>
            </b-navbar-nav>
          </b-collapse>
          <b-navbar-brand class="left-menu" href="#">
            <table class="h-100"><tbody><tr>
              <td class="align-middle">
                <i class="fab fa-btc white text-size-15"></i>
              </td>
            </tr></tbody></table>
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <btcform />
  </div>

</template>

<script>

import btcform from './components/btcform.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
      btcform
  },
  created: function () {
       // this.$store.dispatch('changeBalance', 10)
  },
  methods: {

  },
  computed: mapState({
      balance: state => state.balance
  }),

}
</script>
