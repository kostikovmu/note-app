<template>
  <div>
    <div class="overlay"></div>
    <div class="popup">
      <p>{{modalTitle}}</p>
      <button class="btn btn-confirm" @click="modalHide(true)">Confirm</button>
      <button class="btn btn-cancel" @click="modalHide(false)">Cancel</button>
    </div>
  </div>
</template>

<script>
  import {  mapActions, mapGetters } from 'vuex'
  export default {
    name: "Popup",
    data() {
      return {

      }
    },
    methods: {
      ...mapActions('data', {
	      modalHide: 'modalHide'
      })
    },
    computed: {
      ...mapGetters('data', {
	      modalTitle: 'modalTitle'
      })
    }
  }
</script>

<style scoped lang="scss">
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(#000, .3);
  }
  .popup {
    position: absolute;
    left: 50%;
    margin-left: -150px;
    top: 10%;
    width: 300px;
    background-color: #fff;
    border: 1px solid #929292;
    border-radius: 3px;
    padding: 10px;
    z-index: 2;
    text-align: center;
  }

  .btn {
    padding: 5px 10px;
    margin-right: 10px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &-confirm {
      background-color: #3389b9;
    }
    &-cancel {
      background-color: #cbcbcb;
    }
  }
</style>
