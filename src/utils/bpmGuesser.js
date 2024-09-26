// Initialize variables
let timestamps = []
let isCalculating = false
let startTime = 0

// Function to calculate BPM
function calculateBPM() {
  if (timestamps.length < 2) return 0

  const intervals = []
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i] - timestamps[i - 1])
  }

  const averageInterval = intervals.reduce((a, b) => a + b) / intervals.length
  const bpm = 60000 / averageInterval

  return bpm
}

export default {
  guess: function () {
    const currentTime = Date.now()

    if (!isCalculating) {
      isCalculating = true
      startTime = currentTime
      // console.log('Started BPM calculation. Press Enter in time with the beat.')
    } else {
      const t = currentTime - startTime
      const diff = t - timestamps[timestamps.length - 1] || 0
      if (diff > 900) {
        isCalculating = false
        timestamps = []
        return
      }
      timestamps.push(t)

      if (timestamps.length >= 4) {
        const bpm = calculateBPM()
        // console.log(`Estimated BPM: ${bpm}`)
        return bpm
      } else {
        // console.log(`Tap ${4 - timestamps.length} more times...`)
      }
    }
  }
}
