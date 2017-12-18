<style lang="scss" scoped>
  @import "../../assets/scss/_variables";

  .dot {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    display: inline-block;

    &.online {
      background-color: $success;
    }

    &.offline {
      background-color: $danger;
    }
  }

  .online-legend {
    vertical-align: top;
    font-size: 15px;
    color: $grey-6;
  }
</style>


<template>
  <div>
    <div :class="`dot ${online ? 'online' : 'offline'}`"></div>
    <span class="online-legend">{{ online ? 'online' : 'offline' }}</span>
  </div>
</template>

<script>

export default {
  name: 'OnlineOrNot',
  props: ['online'],
};
</script>