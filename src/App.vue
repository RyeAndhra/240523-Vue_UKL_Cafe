<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </nav>
  <router-view/>
</template>

<script>

  export default {
    mounted() {
      this.$store.commit('UpdateCartFromLocalStorage')
    }
  }

</script>