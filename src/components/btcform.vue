<template>

    <div class="form-holder">
        <!--    <div class="hello">
              <h1>{{ msg }}</h1>
            </div>-->
        <div class="modal-content text-left">
            <div class="modal-header">
                <h2 class="modal-title">Binarnyj opcion</h2>
            </div>
            <div class="modal-body">
                <b-row class="text-left">

                    <b-col cols="8">
                        <h5 class="mb-3">Vyberite valjutu i vvedite summu stavki</h5>
                        <b-jumbotron>
                            <b-row>
                                <b-col>
                                    <b-form-group label="Valjuta">
                                        <b-form-select v-model="currency" :options="curoptions" class="mb-3"/>
                                    </b-form-group>
                                </b-col>
                                <b-col class="pl-0">
                                    <b-form-group label="Summa">
                                        <b-form-input v-model="amount" type="text"
                                                      placeholder="Vvedite summu"></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group label="Posle sledujushej smeny kotirovok kurk bitcoina pojdet:">
                                        <b-form-radio-group v-model="curdirection"
                                                            :options="diroptions"
                                                            name="radioInline">
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-jumbotron>
                        <div class="mt-3">
                            <b-form-checkbox id="checkbox1"
                                             v-model="status"
                                             value="accepted"
                                             unchecked-value="not_accepted">
                                I accept the terms and use
                            </b-form-checkbox>
                        </div>
                    </b-col>

                    <b-col class="pl-0">
                        <h5 class="mb-3">Tekushie indexy</h5>
                        <b-list-group>
                            <b-list-group-item>
                                <div class="d-inline-block"><i class="fas fa-dollar-sign text-size-2"></i></div>
                                <div class="d-inline-block cur-block ml-2">
                                    <div>USD</div>
                                    <div class="cursmall">Kurs:<span class="cur-usd">123</span></div>
                                </div>
                            </b-list-group-item>
                            <b-list-group-item>
                                <div class="d-inline-block"><i class="fas fa-euro-sign text-size-2"></i></div>
                                <div class="d-inline-block cur-block ml-2">
                                    <div>EUR</div>
                                    <div class="cursmall"><span class="cur-eur">123</span></div>
                                </div>
                            </b-list-group-item>
                            <b-list-group-item>
                                <div class="d-inline-block"><i class="fas fa-ruble-sign text-size-2"></i></div>
                                <div class="d-inline-block cur-block ml-2">
                                    <div>RUB</div>
                                    <div class="cursmall"><span class="cur-rub">123</span></div>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <div class="mt-3 text-right">
                            <p>Po tekushemu kursu: <strong><span class="cur-info">0.123</span></strong></p>
                        </div>
                    </b-col>

                </b-row>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-labeled btn-success" :disabled="status !== 'accepted'"><span class="btn-label"><i class="fas fa-check"></i></span>Sdelat' stavku</button>
            </div>
            <p>{{ origin | json }}</p>
            <div>
                <!-- As a link -->
                <b-navbar type="dark" variant="dark" toggleable class="dark-footer">
                    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                    <b-collapse is-nav id="nav_dropdown_collapse">
                        <b-navbar-nav>
                            <b-nav-item href="#">Home</b-nav-item>
                            <b-nav-item href="#">Link</b-nav-item>
                            <b-nav-item href="#">Home</b-nav-item>
                            <b-nav-item href="#">Link</b-nav-item>
                            <b-nav-item href="#">Home</b-nav-item>
                            <b-nav-item href="#">Link</b-nav-item>
                        </b-navbar-nav>
                        <b-navbar-nav class="ml-auto">
                            <b-navbar-brand href="#" class="mr-0">
                                <i class="fab fa-facebook-square nav-link"></i>
                            </b-navbar-brand>
                            <b-navbar-brand href="#" class="mr-0">
                                <i class="fab fa-vk nav-link"></i>
                            </b-navbar-brand>
                            <b-navbar-brand href="#" class="mr-0">
                                <i class="fab fa-youtube-square nav-link"></i>
                            </b-navbar-brand>
                            <b-navbar-brand href="#" class="mr-0">
                                <i class="fab fa-instagram nav-link"></i>
                            </b-navbar-brand>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
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
        data() {
            return {
                origin: '',
                status : 'not_accepted',
                amount: '',
                currency: null,
                curoptions: [
                    {value: null, text: 'Vyberite valjutu'},
                    {value: 'USD', text: 'USD'},
                    {value: 'EUR', text: 'EUR'},
                    {value: 'RUB', text: 'RUB'}
                ],
                curdirection: 'first',
                diroptions: [
                    {text: '<i class="fas fa-arrow-up"></i> Vverh', value: 'first'},
                    {text: '<i class="fas fa-arrow-down"></i> Vniz', value: 'second'}
                ]
            }
        },
        ready: function() {

            // GET request
            this.$http.get('http://httpbin.org/ip', function (data) {
                // set data on vm
                this.$set('origin', data)

            }).error(function (data, status, request) {
                // handle error
            })

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
