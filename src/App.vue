<template>
  <div id="app">
    <h1>Note app</h1>
    <router-view/>
    <Popup v-if="modalVisible"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Popup from "./components/Popup";

export default {
	components: {Popup},
	computed: {
    ...mapGetters('data', {
    	noteList: 'noteList'
    }),
    ...mapGetters('data', {
	    modalVisible: 'modalVisible'
    })
  },
  methods: {
    ...mapMutations('data', {
    	setNoteList: 'setNoteList'
    })
  },
  //save list on change
	watch: {
		noteList( newValue, oldValue ) {
			localStorage.setItem ( 'noteList', JSON.stringify( newValue ) )
		}
	},
  // get list from local storage or use default
	created() {
		const defaultNoteList = [
			{ id: 0, title: 'Test note', todoList: [
					{ id: 0, title: 'Todo a', complete: true },
					{ id: 1, title: 'Todo b', complete: true },
					{ id: 2, title: 'Todo c', complete: false },
					{ id: 3, title: 'Todo d', complete: false }
				]
			}
		]
    const noteList = JSON.parse(localStorage.getItem('noteList')) || defaultNoteList
    this.setNoteList(noteList)
  }
}

</script>

<style lang="scss">
  #app {
    text-align: center;
    color: #2c3e50;
    max-width: 600px;
    margin: 100px auto;
  }

  ul {
    list-style: none;
  }

  ul, li, div {
    padding: 0;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }

</style>
