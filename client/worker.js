console.log('Service workers loaded')

self.addEventListener('push',e=>{
    const data=e.data.json();

    self.registration.showNotification(data.title,{
        body:'Notify by Traversy Media'
    })
})