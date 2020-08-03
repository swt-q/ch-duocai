<template>
  <section>
    <div id="vue-login-done"></div>
  </section>
</template>
<script>
export default {
  name: 'sync-logout',
  data () {
    return {};
  },
  methods: {
    logout () {
      this.axios.post('user/logout', {
      }).then((res) => {
      }).catch((error) => {
      })
    }
  },
  mounted () {
    window.name = 'done';
    this.logout();
  }
};
</script>
