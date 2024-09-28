
## Events
Global
`mt-play`: when controller starts playing
`mt-stop`: when controller stops playing
`mt-beat`: at the beggining of each beat
  - currentBeat: absolute current beat since last play
`mt-sequence`: at the beggining of each sequence

Channels
`mt-channel-on`: when a channels note starts
  - channel: channel index (0-7)
`mt-channel-off`: when a channels note stops
  - channel: channel index (0-7)
`mt-channel{index}-on`: when a channels note starts. where index is the channel index (0-7)
`mt-channel{index}-off`:  when a channels note stops. where index is the channel index (0-7)
