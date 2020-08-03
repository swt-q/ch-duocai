<template>
  <div class="time-wrap">
    <span class="orange">{{ str }}</span>
  </div>
</template>

<script>
export default {
  name: 'countdown',
  data () {
    return {
      str: '0分0秒',
      timer: null,
      alltime:this.time
    }
  },
  props: {
    time: {
      type: String,
      default: '60000'
    }
  },
  methods: {
    countTime: function () {
      clearInterval(this.timer);
       this.timer = setInterval(() => { 
        　　 this.alltime -= 1000;
        let Hours = 60 * 60 * 1000,
          Minutes = 60 * 1000,
          Seconds = 1000;
        let hour = Math.floor(this.alltime / Hours),
          minu = Math.floor((this.alltime % Hours) / Minutes),
          sec = Math.floor(((this.alltime % Hours) % Minutes) / Seconds);
        this.str = parseInt(hour * 60) + parseInt(minu) + '分' + sec + '秒';
        if (this.alltime == 0) {
          clearInterval(this.timer);
          this.$emit('alltimeout');
        }
      },1000);
      
    }
  }
}
  </script>

<style lang="less" scoped>
.time-wrap {
  display: inline-block;
}
</style>

