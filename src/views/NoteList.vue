<template>
  <div>
    <AddItem
    ></AddItem>
    <ul class="note-list">
      <NoteItem
        v-for="(item, index) in noteList"
        :item="item"
        :index="index"
        :key="item.id"
      ></NoteItem>
    </ul>
  </div>

</template>

<script>
  import NoteItem from '@/components/NoteItem'
  import AddItem from '@/components/AddItem'
  import { mapGetters } from 'vuex'
  import { mapMutations } from  'vuex'

  export default {
    name: "NoteList",
    components: {
      NoteItem,
      AddItem,
    },
    computed: {
      ...mapGetters('data', {
        noteList: 'noteList'
      })
    },
    methods: {

      ...mapMutations('data', {
        removeNote: 'removeNote'
      })
    }
  }
</script>

<style scoped>

</style>
