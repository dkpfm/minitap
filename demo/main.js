let beat = 0
window.addEventListener('message', ({ data }) => {
  if (data.name === 'mt-beat') {
    document.body.style.background = beat % 2 === 0 ? '#bbb' : '#fff'
    beat++
  }
})
