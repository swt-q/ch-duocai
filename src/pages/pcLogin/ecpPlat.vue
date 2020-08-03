<template>
  <div></div>
</template>
<script>
export default {
  name: 'ecp',
  data () {
    return {};
  },
  methods: {
    fromEcp (params) {
      this.$post('user/fromEcpLogin', {data:this.$route.query} ).then((res) => {
        if (res.data.code == 0) {
          sessionStorage.setItem("role","user");
          sessionStorage.removeItem("save_search_b");
          this.$store.commit('savePhone', res.data.user.phone);
          this.toPage();
        }
      }).catch((error) => {
      })
    },
    toPage () {
      this.$post('orderInfo/hasOrder').then((res) => {
        const result = res.data;
        if (result.data == 'true') {
          //需求列表页面
          this.$router.push({name: 'duocailist',params:{flag:"user"}})
        } else {
          //新建需求页面
          this.$router.push({name: 'detail',query:{role:"user"}})
        }
      }).catch((error) => {
      })
    }
  },
  created () {
    this.fromEcp();
  }
}
</script>
