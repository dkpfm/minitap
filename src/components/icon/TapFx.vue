<template>
  <svg
    width="47px"
    height="52px"
    viewBox="0 0 47 52"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <filter
        x="-2.9%"
        y="-51.4%"
        width="109.2%"
        height="225.2%"
        filterUnits="objectBoundingBox"
        id="filter-ulq64_yfp4-1"
      >
        <feOffset
          dx="0"
          dy="12"
          in="SourceAlpha"
          result="shadowOffsetOuter1"
        ></feOffset>
        <feGaussianBlur
          stdDeviation="12"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        ></feGaussianBlur>
        <feColorMatrix
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.338914991 0"
          type="matrix"
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
        ></feColorMatrix>
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <g
      id="Page-2"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="Artboard-Copy-114"
        transform="translate(-1215, -787)"
        fill="#FFFFFF"
      >
        <g
          id="Group-11-Copy-2"
          filter="url(#filter-ulq64_yfp4-1)"
          transform="translate(121, 715)"
        >
          <g id="Group-38" transform="translate(1094, 72)">
            <polygon
              id="Combined-Shape"
              points="7.36501095 57.3034833 12.5939519 32.6455948 -0.0324940572 31.474599 13.0897284 24.6070379 1.22388891 9.66888444 18.067918 18.2047092 21.9744638 -0.445469129 26.1177183 18.256867 42.8549405 9.93862855 31.1774652 24.7242355 48.1418943 33.0017401 29.4370663 32.7367543 31.5417804 45.6216479 23.6629604 38.1503381"
            ></polygon>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>
<style lang="scss" scoped>
svg {
  overflow: visible;
  * {
    fill: var(--icon-color);
  }
}
</style>
