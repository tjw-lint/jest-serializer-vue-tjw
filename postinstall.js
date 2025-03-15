let message = `
   ╭────────────────────────────────────────────────────────────────╮
   │                                                                │
   │             jest-serializer-vue-tjw is deprecated.             │
   │                                                                │
   │               Switch to vue3-snapshot-serializer.              │
   │                                                                │
   ╰────────────────────────────────────────────────────────────────╯
`;
if (process.platform === 'win32') {
  message = message
    .split('╭').join(' ')
    .split('╮').join('')
    .split('╰').join('|')
    .split('╯').join('|')
    .split('│').join('|')
    .split('─').join('_');
}
console.log(message);
