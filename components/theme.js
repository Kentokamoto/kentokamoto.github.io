// Icons
const moonIcon = document.querySelector('.moon')
const sunIcon = document.querySelector('.sun')
const themeIcon = document.querySelector('.theme-icon')

// Theme Vars
const userTheme = localStorage.getItem('theme')
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
const themeCheck = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
        document.documentElement.classList.add('dark')
        moonIcon.classList.add('hidden')
    } else {
        document.documentElement.classList.remove('dark')
        sunIcon.classList.add('hidden')
    }
}

//Theme Switch
const themeSwitch = () => {
    const currThemeDark = document.documentElement.classList.contains('dark')
    if (currThemeDark) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    }
    moonIcon.classList.toggle('hidden')
    sunIcon.classList.toggle('hidden')
}

themeIcon.addEventListener('click', () => {
    console.log('clicked')
    themeSwitch()
})

themeCheck()
