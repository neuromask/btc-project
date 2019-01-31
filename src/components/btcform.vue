<template>

	<div class="form-holder">

		<div class="modal-content text-left" v-if="modal == 'bidPlacing'">
			<div class="modal-header">
				<h4 class="modal-title">Бинарный опцион</h4>
			</div>
			<b-form>
				<div class="modal-body">
					<b-row class="text-left">

						<b-col md="8">
							<h5 class="my-3">Выберите валюту и введите сумму ставки:</h5>
							<b-jumbotron>
								<b-row>
									<b-col>
										<b-form-group label="Валюта">
											<b-form-select v-model="userCurrency" @input="getBidAmount" class="mb-3" :disabled="isDisabledEl()">
												<option v-for="currency in currencies" :value="currency.code" v-html="currency.symbol + ' ' + currency.code"></option>
											</b-form-select>
										</b-form-group>
									</b-col>
									<b-col class="pl-0">
										<b-form-group label="Сумма">
											<b-form-input v-model="userAmount" @input="getBidAmount" type="number" :disabled="isDisabledEl()" placeholder="Введите сумму"></b-form-input>
										</b-form-group>
									</b-col>
								</b-row>
								<b-row>
									<b-col>
										<b-form-group label="После следующей смены котировок курс биткоина пойдет:">
											<b-form-radio-group v-model="userDirection" :options="dirOptions" name="radioInline" :disabled="isDisabledEl()"></b-form-radio-group>
										</b-form-group>
									</b-col>
								</b-row>
							</b-jumbotron>
						</b-col>

						<b-col>
							<h5 class="my-3">Текущие индексы:</h5>
							<b-list-group>
								<b-list-group-item  v-for="currency in currencies">
									<div class="d-inline-block">
										<span class="text-size-2 font-weight-bold" v-html="currency.symbol"></span>
									</div>
									<div class="d-inline-block cur-block ml-2">
										<div>{{ currency.code }}</div>
										<div class="cursmall">Курс: {{ currency.rate }}</div>
									</div>
								</b-list-group-item>
							</b-list-group>
							<div class="mt-3 text-right">
								<p>По текущему курсу: <span class="font-weight-bold">{{ userBidAmount }}</span><i class="fab fa-btc ml-1"></i></p>
							</div>
						</b-col>

					</b-row>
					<b-row>
					<b-col>
						<b-form-checkbox id="userAccept" v-model="userAccept" value="accepted" unchecked-value="not_accepted" :disabled="isDisabledEl()">
							Я ознакомлен с правилами сервиса.
						</b-form-checkbox>
					</b-col>
					</b-row>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-labeled btn-success" @click="winCheck" :disabled="isDisabledButton($v.$invalid)">
						<span class="btn-label"><i class="fas fa-check"></i></span>Сделать ставку
					</button>
				</div>
			</b-form>
			<footerBar />
		</div>
		<div class="modal-content text-left" v-if="modal == 'bidWon'">
			<div class="modal-header">
				<h4 class="modal-title">Ставка выиграла </h4>
			</div>
			<div class="modal-body text-center">
				<b-row>
					<b-col>
						<i class="fas text-size-4 text-success fa-check-circle my-4"></i>
						<p>Поздравляем! Ваша ставка выиграла.<br/>
						Сумма выигрыша по обновлённому курсу: <span class="text-success font-weight-bold">{{ userBidAmount }} BTC</span></p>
					</b-col>
				</b-row>
				<b-button variant="outline-success" class="mb-4" @click="bidRefresh()">Сделать еще ставку</b-button>
			</div>
			<footerBar></footerBar>
		</div>
		<div class="modal-content text-left" v-if="modal == 'bidLose'">
			<div class="modal-header">
				<h4 class="modal-title">Ставка проиграла</h4>
			</div>
			<div class="modal-body text-center">
				<b-row>
					<b-col>
						<i class="fas text-size-4 text-danger fa-times-circle my-4"></i>
						<p>К сожалению ваша ставка проиграла.<br/>
						Сумма проигрыша по обновлённому курсу: <span class="text-danger font-weight-bold">{{ userBidAmount }} BTC</span></p>
					</b-col>
				</b-row>
				<b-button variant="outline-success" class="mb-4" @click="bidRefresh()">Сделать еще ставку</b-button>
			</div>
			<footerBar></footerBar>
		</div>

	</div>
</template>

<script>
    import footerBar from './footerBar.vue';
    import {validationMixin} from "vuelidate"
    import {required, numeric} from "vuelidate/lib/validators"
    import {mapState} from 'vuex'

    export default {
        name: 'btcform',
        components: {
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
				balanceOver: false,
                userAmount: '',
                userBidAmount: '',
                userCurrency: 'EUR',
                userDirection: 'up',
                curDirection: '',
                dirOptions: [
                    {text: '<i class="fas fa-arrow-up"></i> Вверх', value: 'up'},
                    {text: '<i class="fas fa-arrow-down"></i> Вниз', value: 'down'}
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
            isDisabledEl: function () {
                if (this.bidStatus == 'bid_accepted') {
                    return true
                }
            },
            isDisabledButton: function (not_valid) {
                if (not_valid) {
                    return true
                }
                else if (this.bidStatus == 'bid_accepted') {
                    return true
                }
                else if (this.balanceOver) {
                    return true
				}
            },
            compareBalanceAmount: function () {
                if (this.userBidAmount > this.balance) {
                    this.balanceOver = true;
                } else {
                    this.balanceOver = false;
				}
            },
            setDataStatus: function (dataStatus) {
                if (this.bidStatus == 'bid_accepted') {
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
                a = a.replace(/\,/g, '');
                a = (this.userAmount / Number(a)).toFixed(4);
                this.userBidAmount = +a;
                this.compareBalanceAmount();
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
                    //console.log(error.statusText);
                });
            },
            refreshResources: function () {
                this.intervalID1 = setInterval(() => {
                    this.getResources();
                }, 1000);
            },
            winCheck: function () {
                this.setBidStatus('bid_accepted');
                this.intervalID2 = setInterval(() => {
                    //console.log('winCheck ' + this.userDirection, this.curDirection, this.dataStatus);
                    if (this.dataStatus == 'changed') {
                        // Win / lose state
                        if (this.userDirection == this.curDirection) {
                            this.bidDestroy();
                            this.modal = 'bidWon';
                            this.$store.dispatch('changeBalance', this.userBidAmount)
                        } else {
                            this.bidDestroy();
                            this.modal = 'bidLose';
                            this.$store.dispatch('changeBalance', -this.userBidAmount)
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
            }
        }
    }
</script>