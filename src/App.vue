<template>
  <div id="app" class="wrapper">
    <div class="wrapper__content">
      <appForm />
      <appEntriesList />
    </div>
  </div>
</template>

<script>
import form from './components/form';
import entriesList from './components/entriesList';
export default {
  name: 'app',
  components: {
    appForm: form,
    appEntriesList: entriesList
  }
}
</script>

<style lang="scss">
  @import './scss/_starting';
</style>
