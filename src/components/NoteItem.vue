<template>
  <li class="note-item">
    <h3>{{item.title}}</h3>
    <TodoList
      :list="firstsTodoItems"
      :edit="false"
    ></TodoList>
    <div class="controls">
      <div class="remove btn" @click="remove">&#10006;</div>
      <router-link :to="{ name: 'Note', params: {id:item.id} }" class="edit btn">&#9998;</router-link>

    </div>
  </li>
</template>

<script>
  import { mapMutations } from 'vuex'
  import TodoList from '@/components/TodoList'
  export default {
    name: 'NoteItem',
    props: {
      item: Object,
      index: Number
    },
    components: {
      TodoList
    },
    computed: {
      firstsTodoItems() {
        return this.item.todoList
          .filter( el => !el.complete && el.title )
          .slice( 0, 2 )
      }
    },
    methods: {
      remove() {
        this.modalShow({
          modalData: {
          	id: this.item.id,
            title: 'Confirm remove note'
          },
          event: 'removeNote'
        })
      },
      ...mapMutations('data', {
	      modalShow: 'modalShow'
      })
    }
  }
</script>

<style scoped lang="scss">
  .note-item {
    padding: 10px 25px;
    border-radius: 3px;
    border: 1px solid #e2e2e2;
    margin-bottom: 20px;
    position: relative;
    min-height: 81px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      .controls {
        display: block;
      }
    }
  }
  .controls {
    position: absolute;
    right: 5px;
    top: 5px;
    display: none;
  }
  .btn {
    margin-bottom: 10px;
    background-color: #f5f5f5;
    padding: 3px;
    cursor: pointer;
    user-select: none;
    color: #000;


    &:hover {
      background-color: #f0f0f0;
      box-shadow: 0 0 2px 0 #0000007d;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
