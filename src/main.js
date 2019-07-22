import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import 'normalize.css';
import VueTextareaAutosize from 'vue-textarea-autosize';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(VueTextareaAutosize);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App)
});