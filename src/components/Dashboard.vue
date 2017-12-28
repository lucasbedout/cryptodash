<template>
  <div class="dashboard">
    <b-container>
      <h3 class="mb2 mt2">Wallet overview</h3>
      <b-row class="mb3">
        <b-col :sm="6">
          <div class="grid-content bg-purple">
            <Balance symbol="Total" :balance="total.current" :oldBalance="total.old" />
          </div>
        </b-col>
        <b-col :sm="6">
          <div class="grid-content bg-purple">
            <Balance symbol="Profit" :balance="profit.current" :oldBalance="profit.old" />
          </div>
        </b-col>
      </b-row>
      <h3 class="mb2 mt3">Wallet details</h3>
      <b-row class="mt2 mb2">
        <b-col :sm="3" v-for="(balance, symbol) in wallets" :key="symbol" class="mt1 mb1">
          <div class="grid-content bg-purple">
            <Balance :symbol="symbol" :balance="balance" :oldBalance="lastWallets[symbol]"/>
          </div>
        </b-col>
      </b-row>
      <h3 class="mb2 mt3">Wallet breakdown</h3>
      <b-row class="mt3 gauge">
        <b-col :sm="12">
          <b-progress class="mt-1" :max="total.current" show-value show-progress>
            <b-progress-bar
              v-for="(balance, symbol) in wallets" 
              :key="symbol" 
              :value="balance" 
              :variant="variants[symbol]">
              <strong>{{ symbol }}</strong>
            </b-progress-bar>
          </b-progress>
        </b-col>
      </b-row>
      <b-row class="online-footer">
        <OnlineOrNot :online="isOnline" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { last } from 'lodash';
import moment from 'moment';
import Balance from '@/components/Balance';
import OnlineOrNot from '@/components/ui/OnlineOrNot';

export default {
  name: 'Dashboard',
  created() {
    this.fetchWalletStatus();
    setInterval(() => this.fetchWalletStatus(), 30000);
  },
  data() {
    return {
      wallets: {},
      lastWallets: {},
      total: { current: 0, old: 0 },
      profit: { current: 0, old: 0 },
      evolution: {},
      isOnline: true,
      variants: { ETH: 'info', XRP: 'warning', LTC: 'primary', TRX: 'dark' },
    };
  },
  methods: {
    fetchWalletStatus() {
      window.axios.get('current-balance')
        .then(res => res.data)
        .then((balances) => {
          this.wallets = balances[0].wallets;
          this.lastWallets = last(balances).wallets;

          this.total = { current: balances[0].total, old: last(balances).total };
          this.profit = { current: balances[0].profit, old: last(balances).profit };

          this.isOnline = moment(balances[0].created_at) > moment().subtract(1, 'hours').subtract(1, 'minutes');

          // Update title <3
          document.title = `Crypto Wallet | ${this.profit.current.toLocaleString('FR', { style: 'currency', currency: 'EUR' })}`;
        });
    },
  },
  components: {
    Balance,
    OnlineOrNot,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 h3 {
  text-align: left;
 }

 .online-footer {
  position: absolute;
  bottom: 20px;
  left: 50%
 }
</style>
