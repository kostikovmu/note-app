<template>
  <ul>
    <li
      v-for="( todo, index) of list"
      :key="todo.id"
      :index="index"
    >
      <span v-if="!edit">{{todo.title}}</span>
      <TodoItem
        v-if="edit"
        :item="todo"
        :index="index"
        @todo-checkbox="$emit('todo-checkbox', index)"
        @todo-remove="$emit('todo-remove', index)"
        @todo-text="textChange"
      ></TodoItem>
    </li>
  </ul>
</template>

<script>
  import TodoItem from '@/components/TodoItem'
  export default {
    name: "TodoList",
    props: {
      list: Array,
      edit: Boolean
    },
    components: {
      TodoItem
    },
    methods: {
      textChange(data){
      	this.$emit('todo-text', data)
      }

    }
  }
</script>

<style scoped>

</style>
