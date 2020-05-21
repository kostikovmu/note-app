import router from '@/router'
export default {
  namespaced: true,
  state: {
    noteList : [],
    modalVisible: false,
    modalEvent: '',
    modalData: {}
  },
  getters: {
    noteList( state ) {
      return state.noteList
    },
    modalVisible( state ) {
      return state.modalVisible
    },
    modalTitle ( state ) {
      return state.modalData.title || 'Default title'
    }
  },
  mutations: {
    setNoteList ( state, list ) {
    	state.noteList = list
    },
    addNote( state, note ) {
	    state.noteList.push(note)
    },
    removeNote( state ) {
      const id = state.modalData.id
      const index = state.noteList.findIndex( el => el.id === id )
      let res = [ ...state.noteList ]
      res.splice( index, 1 );
      state.noteList = res
      if ( state.modalData.quite ) {
	      router.push('/')
      }
    },
    saveNote( state, note ) {
      const id  = note.id
      const index = state.noteList.findIndex( el => el.id === id )
      state.noteList.splice( index, 1, note )
    },
    modalShow( state, data ) {
      state.modalVisible = true
      state.modalEvent = data.event || ''
      state.modalData = data.modalData || {}
    },
    quite() {
      router.push('/')
    }

  },
  actions: {
    modalHide ( { state, commit }, response ) {
      if ( response && state.modalEvent ) {
        commit(state.modalEvent)
      }
      state.modalEvent = ''
      state.modalVisible = false
      state.modalData = {}
    }
  },

}




