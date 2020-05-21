<template>
  <div>
    <input
      class="title"
      type="text"
      :value="title"
      @change="noteTitle"
      placeholder="Note title"
    />
    <div class="control-panel">
      <button class="btn btn-primary" @click="save">Save</button>
      <button class="btn" @click="quite">Quite</button>
      <button class="btn btn-danger" @click="removeNote" :disabled="newNote">Remove</button>
      <button class="btn" @click="undo" :disabled="!canUndo">Undo</button>
      <button class="btn" @click="returnUndo" :disabled="!canReturnUndo">Return undo</button>
    </div>
    <button class="btn add-todo" @click="addTodo">Add todo</button>
    <div>
      <TodoList
        :list="note.todoList"
        :edit="true"
        @todo-checkbox="todoCheckbox"
        @todo-remove="todoRemove"
        @todo-text="todoText"
      ></TodoList>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'
  import TodoList from '@/components/TodoList'
  export default {
    name: "Note",
    data() {
      return {
        noteHistory: [],
        tempHistory: [],
        historyIndex: 0
      }
    },
    props: {
      id: Number
    },
    components: {
      TodoList
    },
    computed: {
      title() {
        return this.note.title
      },
      note() {
        return this.noteHistory[this.historyIndex]
      },
      newNote() {
        return ( this.id < 0 )
      },
	    canUndo() {
		    return this.historyIndex > 0
	    },
	    canReturnUndo() {
		    const length = this.noteHistory.length
		    const index = this.historyIndex
		    return length - 1 > index
	    },
      ...mapGetters('data', {
        noteList: 'noteList'
      })
    },
    methods: {
    	noteTitle(event) {
    		const title = event.target.value
		    let changedNote = this.clone( this.note )
		    changedNote.title = title
        this.refreshHistory(changedNote)
      },
      addTodo() {
        const lastTodo = [ ...this.note.todoList].pop()
    		const id = lastTodo ? lastTodo.id + 1 : 0
    		const todo = { id: id, title: '', complete: false }
	      let changedNote = this.clone( this.note )
        changedNote.todoList.push(todo)
	      this.refreshHistory(changedNote)
      },
      todoCheckbox(index) {
        let changedNote = this.clone( this.note )
        changedNote.todoList[index].complete = !changedNote.todoList[index].complete
	      this.refreshHistory(changedNote)
      },
      todoRemove(index) {
        let changedNote = this.clone( this.note )
        changedNote.todoList.splice(index, 1)
	      this.refreshHistory(changedNote)
      },
      todoText(data) {
      	const { index, value } = data
	      let changedNote = this.clone( this.note )
        changedNote.todoList[index].title = value
        this.refreshHistory(changedNote)
      },
      undo() {
        if ( this.canUndo ) {
          const undoIndex = this.historyIndex - 1
          this.historyIndex = undoIndex
          const undoNote = this.noteHistory[undoIndex]
          this.tempHistory.push(undoNote)
        }
      },
      returnUndo() {
        if ( this.canReturnUndo ) {
          const returnUndoIndex = this.historyIndex +=  1
          const returnUndoNote = this.noteHistory[returnUndoIndex]
          this.tempHistory.push(returnUndoNote)
        }
      },
      pushTemp() {
        this.noteHistory = [ ...this.noteHistory, ...this.tempHistory ]
        this.tempHistory = []
      },
      refreshHistory(changedNote) {
	      this.pushTemp()
	      this.noteHistory.push(changedNote)
	      this.historyIndex = this.noteHistory.length - 1
      },
      save() {
    		const note = this.note
        if( this.id === -1 ) {
	        const issetTodoTitle = note.todoList.find( el => el.title !== '')

          if( note.title || issetTodoTitle ) {
	          this.addNote( note )
	          this.$router.replace( { name: 'Note', params: { id: note.id } } )
          }

        } else {
	        this.saveNote( note )
        }
      },
      quite() {
    		this.modalShow({
          event: 'quite',
          modalData: { title : 'Confirm return to list' }
        })
      },
	    removeNote() {
		    this.modalShow({
			    modalData: {
				    id: this.id,
				    title: 'Confirm remove note',
            quite: true
			    },
			    event: 'removeNote'
		    })
	    },
      clone(src) {
        return JSON.parse( JSON.stringify( src ) )
      },
      ...mapMutations('data', {
        saveNote: 'saveNote'
      }),
      ...mapMutations('data', {
	      addNote: 'addNote'
      }),
      ...mapMutations('data', {
      	modalShow: 'modalShow'
      })
    },
    //added note to history
    beforeMount() {
    	let note = {}
    	if( this.id === -1 ) {
    		const nextId = this.noteList.length ? ( [ ...this.noteList].pop().id + 1 ) : 0
    		note = { id: nextId, title: '', todoList: [] }
      } else {
		    note = this.noteList.find( el => el.id === +this.id )
	    }
      this.noteHistory.push(note)
    }
  }

</script>

<style scoped lang="scss">
  .btn {
    padding: 5px 10px;
    text-decoration: none;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &-danger {
      background-color: #e8252c;
    }

    &-primary {
      background-color: #3389b9;
    }
  }
  .btn[disabled] {
    cursor: not-allowed;
  }
  .title {
    border: none;
    padding: 3px;
    border-radius: 3px;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: .5rem;

    &:focus {
      background-color: #cbcbcb;
    }
  }
  .control-panel {
    margin-bottom: 20px;
  }

  .add-todo {
    margin-bottom: 10px;
  }

</style>
