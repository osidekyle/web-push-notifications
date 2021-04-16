
const publicVapidKey='BK6mjonVcOwnQUlpYqvassHgKPzmKyKO23K2ebF0UIHWpM6ruCn3bcauk9XR-BX_4KpDY0I7I7vvzwHFMjsz-kM';

if('serviceWorker' in navigator){
    send().catch(err=>console.error(err))
}

async function send(){
    //Register service worker
    console.log('Registering service worker...')
    const register=await navigator.serviceWorker.register('./worker.js',{
        scope:'/'
    })
    console.log('Registered service worker')

    //Register push
    console.log("Registering push")
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })

    console.log("Push registered")

    await fetch('/subscribe',{
        method:'POST',
        body:JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    })

}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }