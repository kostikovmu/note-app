<template>
  <form class="todo-item" @submit.prevent="$emit('todo-remove')">
    <input
      type="checkbox"
      class="todo-checkbox"
      :checked="item.complete"
      @change="$emit('todo-checkbox')"
    >
    <input
      placeholder="todo title"
      type="text"
      class="todo-text"
      :class="{complete: complete }"
      :value="item.title"
      @change="changeText"
    >
    <button class="todo-remove">&#10006;</button>
  </form>
</template>

<script>
  export default {
    name: "TodoItem",
    props: {
      item: Object,
      index: Number
    },
    computed: {
      complete() {
        return this.item.complete
      }
    },
    methods: {
      changeText() {
        const data = {
          value: event.target.value,
          index: this.index
        }
        this.$emit('todo-text', data)
      }
    }
  }
</script>

<style scoped lang="scss">
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }
  .todo-text {
    border: none;
    padding: 3px;
    border-radius: 3px;

    &:focus {
      background-color: #cbcbcb;
    }
  }

  .complete {
    text-decoration: line-through;

    &:focus {
      text-decoration: none;
    }
  }

  .todo-remove {
    border: none;
    border-radius: 50%;
    background-color: #f5f5f5;
    color: #909090;
    cursor: pointer;
    margin-left: 5px;
    height: 23px;
    width: 23px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: darken(#f5f5f5, 10%);
    }
  }
</style>
