window.addEventListener('DOMContentLoaded', e => {
   fetch('http://localhost:3000/lectores')
   .then(res => res.json())
   .then(data => {
       const datos = data;

       datos.forEach(element => {
           console.log(element);
       });
   })
   console.log("listo")
});

