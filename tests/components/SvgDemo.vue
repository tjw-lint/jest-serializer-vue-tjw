<template>
  <div>
    <!-- outer comment -->
    <svg data-test="svg" height="156">
      <desc>Example Triangle</desc>
      <!-- A triangle! -->
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <path
        d="M 10,150 L 70,10 L 130,150 z"
        fill="#D5D8CB"
        stroke="#ECDCC6"
        stroke-width="6"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgDemo'
};
</script>
