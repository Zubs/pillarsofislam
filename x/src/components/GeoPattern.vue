<template>
  <div class="geo-bg" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gp" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="none" stroke="#8BC4A8"
                   stroke-width=".8"/>
          <polygon points="50,16 84,34 84,66 50,84 16,66 16,34" fill="none" stroke="#8BC4A8"
                   stroke-width=".4"/>
          <line x1="50" y1="4" x2="50" y2="96" stroke="#8BC4A8" stroke-width=".25"/>
          <line x1="4" y1="28" x2="96" y2="72" stroke="#8BC4A8" stroke-width=".25"/>
          <line x1="96" y1="28" x2="4" y2="72" stroke="#8BC4A8" stroke-width=".25"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gp)"/>
    </svg>
  </div>
</template>
