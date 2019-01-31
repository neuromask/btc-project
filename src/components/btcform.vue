<template>

    <div class="form-holder">

        <div class="modal-content text-left" v-if="modal == 'bidPlacing'">
            <div class="modal-header">
                <h2 class="modal-title">Binarnyj opcion</h2>
            </div>
            <b-form @submit="onSubmit">
            <div class="modal-body">
                <b-row class="text-left">

                    <b-col cols="8">
                        <h5 class="mb-3">Vyberite valjutu i vvedite summu stavki</h5>
                        <b-jumbotron>
                            <b-row>
                                <b-col>
                                    <b-form-group label="Valjuta">
                                        <b-form-select v-model="userCurrency"  @input="getBidAmount" class="mb-3" :disabled="bidStatus == 'bid_accepted'">
                                            <option v-for="currency in currencies" v-bind:value="currency.code" v-html="currency.symbol + ' ' + currency.code">fds</option>
                                        </b-form-select>
                                    </b-form-group>
                                </b-col>
                                <b-col class="pl-0">
                                    <b-form-group label="Summa">
                                        <b-form-input v-model="userAmount"  @input="getBidAmount" type="number" :disabled="bidStatus == 'bid_accepted'" placeholder="Vvedite summu"></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group label="Posle sledujushej smeny kotirovok kurk bitcoina pojdet:">
                                        <b-form-radio-group v-model="userDirection"
                                                            :options="dirOptions"
                                                            name="radioInline"
                                                            :disabled="bidStatus == 'bid_accepted'">
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-jumbotron>
                        <div class="mt-3">
                            <b-form-checkbox id="userAccept"
                                             v-model="userAccept"
                                             value="accepted"
                                             unchecked-value="not_accepted"
                                             :disabled="bidStatus == 'bid_accepted'">
                                I accept the terms and use
                            </b-form-checkbox>
                        </div>
                    </b-col>

                    <b-col class="pl-0">
                        <h5 class="mb-3">Tekushie indexy</h5>
                        <b-list-group>
                            <b-list-group-item v-for="currency in currencies">
                                <div class="d-inline-block"><span class="text-size-2 font-weight-bold" v-html="currency.symbol"></span></div>
                                <div class="d-inline-block cur-block ml-2">
                                    <div>{{ currency.code }}</div>
                                    <div class="cursmall">Kurs: <span class="cur-usd">{{ currency.rate }}</span></div>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <div class="mt-3 text-right">
                            <p>Po tekushemu kursu: <strong><span class="cur-info">{{ userBidAmount }}</span><i class="fab fa-btc ml-1"></i></strong></p>
                        </div>
                    </b-col>

                </b-row>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-labeled btn-success" @click="winCheck" :disabled="$v.$invalid"><span
                        class="btn-label"><i class="fas fa-check"></i></span>Sdelat' stavku
                </button>
            </div>
            </b-form>
            <footerBar></footerBar>
        </div>
        <div class="modal-content text-left" v-if="modal == 'bidWon'">
            <div class="modal-header">
                <h2 class="modal-title">Stavka vqjgrala</h2>
            </div>
            <div class="modal-body text-center">
                <b-row>
                    <b-col>
                        <p>Pozdravljaem! Vasha stavka vqigrala.</p>
                        <p>Summa vqjgrasha po obnovljonnomu kursu: <strong><span class="cur-info"></span>{{ userBidAmount }} BTC</strong></p>
                    </b-col>
                </b-row>
                <b-button variant="outline-success" @click="bidRefresh()">Sdelat' stavku</b-button>
            </div>
            <footerBar></footerBar>
        </div>
        <div class="modal-content text-left" v-if="modal == 'bidLose'">
            <div class="modal-header">
                <h2 class="modal-title">Stavka proigrala</h2>
            </div>
            <div class="modal-body text-center">
                <b-row>
                    <b-col>
                        <p>K sozhaleniju vasha stavka proigrala.</p>
                        <p>Summa proigrqsha po obnovljonnomu kursu: <strong><span class="cur-info"></span>{{ userBidAmount }} BTC</strong></p>
                    </b-col>
                </b-row>
                <b-button variant="outline-success" @click="bidRefresh()">Sdelat' stavku</b-button>
            </div>
            <footerBar></footerBar>
        </div>

    </div>
</template>

<script>
    import footerBar from './footerBar.vue';
    import { validationMixin } from "vuelidate"
    import { required, numeric } from "vuelidate/lib/validators"
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'btcform',
        components:{
            footerBar
        },
        data() {
            return {
                origin: null,
                currencies: null,
                oldCurrencies: null,
                link: 'https://api.coindesk.com/v1/bpi/currentprice.json?t=123454',
                userAccept: 'not_accepted',
                currentRate: '',
                bidStatus: 'bid_not_accepted',
                dataStatus: 'not_changed',
                modal: 'bidPlacing',
                userAmount: '',
                userBidAmount:'',
                userCurrency: 'EUR',
                userDirection: 'up',
                curDirection: '',
                dirOptions: [
                    {text: '<i class="fas fa-arrow-up"></i> Vverh', value: 'up'},
                    {text: '<i class="fas fa-arrow-down"></i> Vniz', value: 'down'}
                ],
                form: {}
            }
        },
        created: function () {
            this.getResources();
            this.refreshResources();
        },
        mixins: [
            validationMixin
        ],
        validations: {
            userAccept: {
                async isUnique(value) {
                    if (value == 'accepted') {
                        return true
                    }
                }
            },
            userAmount: {
                required,
                numeric
            }
        },
        computed: mapState({
            balance: state => state.balance
        }),
        methods: {
            setBidStatus: function (bidStatus) {
                this.bidStatus = bidStatus;
            },
            compareBalanceAmount: function (bidStatus) {
                if(this.userBidAmount > this.balance) {
                    console.log('more');
                }
            },
            setDataStatus: function (dataStatus) {
                if (this.bidStatus === 'bid_accepted') {
                    this.dataStatus = dataStatus;
                }
            },
            setCurDirection: function (dataOld, dataNew) {
                if (dataOld[this.userCurrency].rate > dataNew[this.userCurrency].rate) {
                    this.curDirection = 'down';
                } else {
                    this.curDirection = 'up';
                }
                //console.log(dataOld[this.userCurrency].rate +' > '+ dataOld[this.userCurrency].rate, this.curDirection);
            },
            getBidAmount: function () {
                var a = origin[this.userCurrency].rate;
                a = a.replace(/\,/g,'');
                a = (this.userAmount/Number(a)).toFixed(4);
                this.userBidAmount = +a;
            },
            getResources: function () {
                this.$http.get(this.link).then(function (response) {
                    origin = response.data.bpi;
                    this.getBidAmount();
                    // First fill with data
                    if (this.currencies == null) {
                        this.currencies = origin;
                    }
                    // Check if data on remote was changed
                    if (origin[Object.keys(origin)[0]].rate != this.currencies[Object.keys(origin)[0]].rate) {
                        this.setDataStatus('changed');
                        this.setCurDirection(this.currencies, origin);
                        this.oldCurrencies = this.currencies;
                        this.currencies = origin;
                    }
                }, function (error) {
                    console.log(error.statusText);
                });
            },
            refreshResources: function () {
                this.intervalID1 = setInterval(() => {
                    this.getResources();
                    this.compareBalanceAmount();
                }, 1000);
            },
            winCheck: function () {
                this.setBidStatus('bid_accepted');
                this.intervalID2 = setInterval(() => {
                    console.log('winCheck '+ this.userDirection, this.curDirection, this.dataStatus);
                    if (this.dataStatus == 'changed') {
                        // Win / lose state
                        if (this.userDirection == this.curDirection) {
                            this.bidDestroy();
                            this.modal = 'bidWon';
                            this.$store.dispatch('changeBalance', this.userBidAmount)
                        } else {
                            this.bidDestroy();
                            this.modal = 'bidLose';
                            this.$store.dispatch('changeBalance', this.userBidAmount)
                        }
                    }
                }, 1000);
            },
            bidDestroy() {
                this.setDataStatus('not_changed');
                this.setBidStatus('bid_not_accepted');
                clearInterval(this.intervalID1);
                clearInterval(this.intervalID2);
            },
            bidRefresh() {
                this.modal = 'bidPlacing';
                this.refreshResources();
            },
            onSubmit() {
                // form submit logic
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
