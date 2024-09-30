import { Sampler, Noise, AutoFilter, FMOscillator } from 'tone'
import _ from 'underscore'
const notes = ['C1', 'G1', 'E1', 'B1']

export default function () {
  if (process.client) {
    const bubbleSampler = new Sampler({
      urls: {
        A1: 'bubble-gaming-fx.wav'
      },
      baseUrl: '/audios/',
      onload: () => {}
    }).toDestination()

    const noiseSubtle = new Noise('pink')
    noiseSubtle.volume.value = -12
    // make an autofilter to shape the noise
    const autoFilterSubtle = new AutoFilter({
      frequency: '8n',
      baseFrequency: 1000,
      octaves: 8
    }).toDestination()
    noiseSubtle.connect(autoFilterSubtle)
    autoFilterSubtle.start()

    const noise = new Noise('pink')
    // make an autofilter to shape the noise
    const autoFilter = new AutoFilter({
      frequency: '8n',
      baseFrequency: 10000,
      octaves: 8
    }).toDestination()
    noise.connect(autoFilter)
    autoFilter.start()

    const autoFilterFws = new AutoFilter({
      frequency: '8n',
      baseFrequency: 10000,
      octaves: 8
    })
      .toDestination()
      .start()
    const fwdSound = new FMOscillator({
      frequency: 100,
      type: 'sine',
      modulationType: 'triangle',
      harmonicity: 0.2,
      modulationIndex: 3
    }).connect(autoFilterFws)

    const autoFilterBws = new AutoFilter({
      frequency: '4n',
      baseFrequency: 1000,
      octaves: 8
    })
      .toDestination()
      .start()
    const bwdSound = new FMOscillator({
      frequency: 80,
      type: 'sine',
      modulationType: 'triangle',
      harmonicity: 0.2,
      modulationIndex: 3
    }).connect(autoFilterBws)

    const bleepSampler = new Sampler({
      urls: {
        A1: 'click-button-140881.mp3'
      },
      baseUrl: '/audios/',
      onload: () => {}
    }).toDestination()
    bleepSampler.volume.value = -20

    let noteIndex = 0
    return {
      triggerBubble() {
        bubbleSampler.triggerAttackRelease(notes[noteIndex], 0.25)
        noteIndex = (noteIndex + 1) % notes.length
      },
      triggerBleep() {
        bleepSampler.triggerAttackRelease('A1', 0.5)
        // noteIndex = (noteIndex + 1) % notes.length
      },
      triggerNoiseSubtle() {
        noiseSubtle.start()
      },
      stopNoiseSubtle() {
        noiseSubtle.stop()
      },
      triggerNoise() {
        noise.start()
      },
      stopNoise() {
        noise.stop()
      },
      triggerFwdSound() {
        fwdSound.start()
      },
      stopFwdSound() {
        fwdSound.stop()
      },
      triggerBwdSound() {
        bwdSound.start()
      },
      stopBwdSound() {
        bwdSound.stop()
      }
    }
  } else {
    return {
      triggerBubble: () => {}
    }
  }
}
