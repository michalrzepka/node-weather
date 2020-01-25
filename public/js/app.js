console.log('Client-side JS file loaded.')

const weatherForm = document.querySelector('form')
const searchBox = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchBox.value

    messageOne.textContent = 'Łoduje...'
    messageTwo.textContent = ''

    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})