document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('send').addEventListener('click', async ()=>{
        const phoneNumber = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        const response = await fetch('http://localhost:3100/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber, message })
            });
            const result = await response.json();
            console.log(result);
        });
    }
);