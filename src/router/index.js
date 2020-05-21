import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteList from '@/views/NoteList.vue'
import Note from '@/views/Note.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'NoteList',
    component: NoteList
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: Note,
    props(route) {
      const props = {...route.params}
      props.id = +props.id
      return props
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
