<template>
  <div class="balance pb2">
    <h4 class="p1 ml1">{{ symbol }}</h4>
    <div class="p1 mb1">
      {{ parseFloat(balance).toLocaleString('FR', { style: 'currency', currency: 'EUR' }) }}
      <span :class="`balance-evolution ${evolution > 0 ? 'up' : 'down'}`">
        <span v-if="evolution > 0">+</span>{{ evolution }}%
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Balance',
  props: ['symbol', 'balance', 'oldBalance'],
  computed: {
    evolution() {
      const evolution = ((this.balance - this.oldBalance) / this.balance) * 100;
      return evolution.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/_variables";

  .balance {
    background-color: white;
    border-radius: 4px;
    box-shadow: $shadow;
    font-size: 36px;
    font-weight: 500;

    h4 {
      font-size: 18px;
      text-align: left;
    }

    .balance-evolution {
      font-size: 20px;
      font-weight: 400;

      &.up {
        color: $success;
      }

      &.down {
        color: $danger;
      }
    }
  }
</style>
