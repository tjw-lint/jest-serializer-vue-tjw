<template>
  <div>
    <input v-model="hasAttributes" title="text" />
    <input v-model="noAttributes" />
    <input value="Native value with attribute" title="text" />
    <input value="Native value without attribute" />
    <input v-model="array" />
    <input v-model="boolean" type="checkbox" />
    <input v-model.number="number" type="range" />
    <input v-model="object" />
  </div>
</template>

<script>
export default {
  name: 'InputValue',
  data: function () {
    return {
      hasAttributes: 'There is a title attribute on this input',
      noAttributes: 'There are no other attrubutes on this input',
      array: ['moo'],
      boolean: false,
      number: 75,
      object: {
        a: {
          c: true
        },
        b: {
          d: 'text'
        }
      }
    };
  }
};
</script>
