import { defineStore } from 'pinia'
import { reactive } from 'vue'
//import { fetchColony } from '../api'
import colonyData from "../assets/colonyData.json"
import questData from "../assets/questsData.json"

export class Colony {
  constructor(
    public colonyId: number,
    public currentYear: number,
    public quests: Array<any>
  ){}

  setYear(currentYear: number) {
    this.currentYear = currentYear
  }

  setQuests(quests: Array<any>) {
    this.quests = quests
  }
}

export const useColonyStore = defineStore('SingleColony', () => {
    const state = reactive({
        colony: null as Colony | null
    })

    function getColony(colonyId: number, currentYear: number) {
        //const Colony = fetchColony(colonyId)
        const quests = getRelatedQuests(colonyId, currentYear)
        updateColony(colonyId, currentYear, quests)
    }

    function getRelatedQuests(colonyId: number, currentYear: number) {
      //set quests by parameters of current colony 
      const relatedQuests = questData.filter(item => item.startYear <= currentYear && item.endYear >= currentYear)
      return relatedQuests
    }

    function updateColony(colonyId, currentYear, quests) {
        state.colony = new Colony(colonyId, currentYear, quests)
    }

    return {
        state,
        getColony,
        updateColony
    }
})

// export const useSinglePostStore = defineStore('SinglePost', () => {
//     const state = reactive({
//       post: null as Post | null
//     })
    
//     async function getSinlgePost(id: number) {
//       const Post = await fetchPost(id)
//       const User = await fetchUser(Post.userId)
//       const Comments = await fetchComments(id)
//       updateStorePost(Post, User, Comments)
//     }
  
//     async function saveSinlgePost(post: Post) {
//       const Post = await updatePost(post.id, post.title, post.body)
//       state.post?.setPostTitle(post.title)
//       state.post?.setPostBody(post.body)
//     }
  
//     async function addedPostComment(postId: number, name: string, body: string, email: string) {
//       const newComment = await addComment(postId, name, body, email)
//       state.post?.addComment(newComment)
//     }
  
//     function clearPost() {
//       state.post = null;
//     }
  
//     function updateStorePost(post: Post, User: User, Comments: Comment[]) {
//       state.post = new Post(post.id, post.title, post.body, User.name,  User.id, Comments)
//     }
  
//     return {
//       state,
//       getSinlgePost,
//       saveSinlgePost,
//       addedPostComment,
//       clearPost
//     }
//   })