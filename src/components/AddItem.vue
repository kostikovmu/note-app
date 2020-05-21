<template>
  <router-link :to="{ name: 'Note', params: { id: -1} }" class="add-button">Add note</router-link>
</template>

<script>
  export default {
    name: "AddItem",
  }
</script>

<style scoped lang="scss">
  .add-item {
    margin-bottom: 20px;
  }

  .add-button {
    margin-left: 10px;
    color: #fff;
    padding: 10px 15px;
    background-color: #3389b9;
    text-decoration: none;
    display: inline-block;
    margin-bottom: 10px;

    &:hover {
      background-color: darken( #3389b9, 10);
    }
  }
</style>
