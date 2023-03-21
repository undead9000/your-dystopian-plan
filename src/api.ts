function fetchMyPosts(userId: number) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .catch(() => { alert('Unable to get my posts')});
  }

function fetchColony(colonyId: number) {
  
}



export { fetchColony }