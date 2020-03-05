<template>
  <div>
    <input v-model="cow" />
  </div>
</template>

<script>
export default {
  name: 'InputValue',
  data: function () {
    return {
      cow: 'moo'
    };
  }
};
</script>
