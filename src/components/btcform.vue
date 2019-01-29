<template>

  <div class="form-holder">
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
    <div class="modal-content text-left">
      <div class="modal-header">
        <h5 class="modal-title">Binarnyj opcion</h5>
      </div>
      <div class="modal-body">
        <p>Vyberite valjutu i vvedite summu stavki</p>
        <b-row class="text-left">
          <b-col cols="8">
            <b-row>
              <b-col>
                <b-form-select v-model="currency" :options="options" class="mb-3" />

              </b-col>
              <b-col>
                <b-form-input v-model="amount"
                              type="text"
                              placeholder="Enter your name"></b-form-input>

              </b-col>
            </b-row>
          </b-col>
          <b-col>1 of 3</b-col>
        </b-row>
        <div>

        </div>
      </div>

      <div class="modal-footer">
        <p><strong>Summa: {{ amount }}</strong> {{ currency }}</p>
        <button type="button" class="btn btn-primary">Sdelat' stavku</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'btcform',
  props: {
    msg: String
  },
    data () {
        return {
            amount: '',
            currency: null,
            options: [
                { value: null, text: 'Vyberite valjutu' },
                { value: 'USD', text: 'USD' },
                { value: 'EUR', text: 'EUR' },
                { value: 'RUB', text: 'RUB' }
            ]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
