// Loader
const loader = document.getElementById('loader')

const showLoader = () => {
  loader.style.display = 'flex'
}

const hideLoader = () => {
  loader.style.display = 'none'
}
// show loader when DOM is not ready
showLoader()

$(document).ready(function () {
  // hide loader when DOM is ready
  hideLoader()

  const searchButton = document.getElementById('btn-search')
  const emailBtn = document.getElementById('email-btn')
  const phoneBtn = document.getElementById('phone-btn')
  const inputField = document.getElementById('email-phone')
  const errorFiled = document.getElementById('error-msg')

  // checking which tab is active
  // filter option - add and remove active class 
  // changing the type of input filed according to tab
  let activeTab = 'email'
  emailBtn.classList.add('active')

  phoneBtn.addEventListener('click', event => {
    event.preventDefault()
    activeTab = 'phone'
    // add or remove class
    phoneBtn.classList.add('active')
    emailBtn.classList.remove('active')
    errorFiled.innerText = 'Please enter a valid phone number'
  })
  emailBtn.addEventListener('click', event => {
    event.preventDefault()
    activeTab = 'email'
    // add or remove class
    emailBtn.classList.add('active')
    phoneBtn.classList.remove('active')
    errorFiled.innerText = 'Please enter a valid email address'
  })

  // Fetching the contact data from the server
  const fetchContactData = async (query) => {
    try {
      showLoader()
      const url = `https://ltv-data-api.herokuapp.com/api/v1/records.json?${query}`
      const response = await fetch(url)
      const text = await response.text()
      // loading data into Local Storage
      localStorage.setItem("userObject", text);
      // redirecting to Result page
      window.location.href = "result.html";
    } catch (error) {
      console.log(error)
    }
  }

  const handleEvent = event => {
    event.preventDefault()
    localStorage.clear()

    // For TAb => Email
    if (activeTab === 'email') {
      const email = inputField.value
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

      if (email.match(regex)) {
        fetchContactData('email=' + email)
      } else {
        // add error
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }

    // For TAB => Phone
    if (activeTab === 'phone') {
      const phone = inputField.value

      if (phone.replace(/[^\d]/g, '').length === 10) {
        fetchContactData('phone=' + phone)
      } else {
        // add error
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  }

  // adding event for search button and input field
  searchButton.addEventListener('click', handleEvent)
  inputField.addEventListener('keypress', event => {
    // checking key code
    const keycode = event.keyCode ? event.keyCode : event.which
    if (keycode == '13') {
      console.log('press')
      handleEvent
    }
  })
});
