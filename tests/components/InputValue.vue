<template>
  <div>
    <input v-model="hasAttributes" title="text" />
    <input v-model="noAttributes" />
    <input value="Native value with attribute" title="text" />
    <input value="Native value without attribute" />
    <input value="Native checkbox" type="checkbox" />
    <input v-model="array" />
    <input v-model="booleanOff" />
    <input v-model="booleanOn" />
    <input v-model.number="number" type="range" />
    <input v-model="object" />
    <input v-model="string" type="checkbox" />
  </div>
</template>

<script>
export default {
  name: 'InputValue',
  data: function () {
    return {
      hasAttributes: 'There is a title attribute on this input',
      noAttributes: 'There are no other attrubutes on this input',
      array: ['text', 22],
      booleanOff: false,
      booleanOn: true,
      number: 75,
      object: {
        a: {
          c: true
        },
        b: {
          d: 'text'
        }
      },
      string: 'Text'
    };
  }
};
</script>
