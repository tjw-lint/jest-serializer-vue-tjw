# DEPRECATED

`jest-serializer-vue-tjw` is now deprecated.


## Upgrade to [vue3-snapshot-serializer](https://thejaredwilcurt.com/vue-snapshot-serializer/#api)

**If you are still on Vue 2, then you will not be able to use the new library** (it has code unique to the Vue 3 Virtual DOM).

The new library **has all the same features**, and comes with several new features as well:

&nbsp;                   | `jest-serializer-vue-tjw`         | `vue3-snapshot-serializer`
--:                      | :--                               | :--
First release            | 2020-01-12                        | 2024-09-06
Made by                  | TheJaredWilcurt                   | TheJaredWilcurt
Vue Support              | Vue 2 and 3 (somewhat)            | Vue 3
Test Runners             | Jest and Vitest (mostly)          | Vitest and Jest
Test Utils               | Vue-Test-Utils                    | Vue-Test-Utils and @Testing-Library/Vue
Module type              | CJS (require)                     | ESM (import)
Settings stored in       | `vue.config.js` or `package.json` | The `global` or `globalThis` object
Per-test settings        | Posisble, but very difficult      | Very easy
Formatting               | Limited options                   | Very detailed controls
Stubbing out elements    | ❌                                | ✅ *new feature*
`postProcessor`          | ❌                                | ✅ *new feature*
`addInputValues`         | Experimental (can crash)          | ✅
`stringifyObjects`       | Experimental (can crash)          | ✅
`attributesToClear`      | ✅                                | ✅
`clearInlineFunctions`   | ✅                                | ✅
`removeClassTest`        | ✅                                | ✅
`removeComments`         | ✅                                | ✅
`removeDataTest`         | ✅                                | ✅
`removeDataTestid`       | ✅                                | ✅
`removeDataTestId`       | ✅                                | ✅
`removeDataQa`           | ✅                                | ✅
`removeDataCy`           | ✅                                | ✅
`removeDataVId`          | ✅                                | ✅
`removeIdTest`           | ✅                                | ✅
`removeIstanbulComments` | ✅                                | Removed (problem no longer exists)
`removeServerRendered`   | ✅                                | ✅
`sortAttributes`         | ✅                                | ✅
`sortClasses`            | ❌                                | ✅ *new feature*
`verbose`                | ✅                                | ✅
`debug`                  | ❌                                | ✅ *new feature*


For **new projects**, you can just follow the "[Getting Started](https://TheJaredWilcurt.com/vue-snapshot-serializer)" guide on the docs site of the new library.

For **existing projects** follow the migration notes below.


## **Migrating** from *jest-serializer-vue-tjw* to *vue3-snapshot-serializer*

If you have a Vue 2 codebase you are transitioning to Vue 3, then `jest-serializer-vue-tjw` will still work with Vue 3. So stick with it until your conversion to Vue 3 is done. Once completely over to Vue 3 (or if you have a codebase that was always Vue 3), then you can can migrate to `vue3-snapshot-serializer`.

1. Remove the old library
   * `npm uninstall jest-serializer-vue-tjw`
   * Delete any old code you have related to the old library (search for `jestSerializer` and `jest-serializer`)
1. Add the new library
   * `npm install --save-dev vue3-snapshot-serializer`
1. In your Vitest or Jest config, replace the snapshot serializer:
   ```diff
    "snapshotSerializers": [
   -  "<rootDir>/node_modules/jest-serializer-vue-tjw"
   +  "./node_modules/vue3-snapshot-serializer/index.js"
    ]
   ```
1. The new library uses the "diffable" formatter by default, this will give you very different snapshots. So to make the transition smoother, we also offer the "classic" formatter, which is the same one used by `jest-serializer-vue-tjw`.
   * In your [Vitest](https://vitest.dev/config/#setupfiles)/[Jest](https://jestjs.io/docs/configuration#setupfilesafterenv-array) `setup.js` file add the following to your global `beforeEach`:
     ```js
     global.beforeEach(() => {
       // Set the default settings for each snapshot
       global.vueSnapshots = {
         formatter: 'classic',
         classicFormatting: {
           // Pass in js-beautify.html settings here.
           // The defaults for this match the defaults for jest-serializer-vue-tjw.
         }
       };
     });
     ```
   * The API for `classicFormatting` is the same as the `formatting` options for `jest-serializer-vue-tjw`. Full details are [documented here](https://github.com/tjw-lint/vue3-snapshot-serializer/blob/main/types.js#L19).
   * There may still be some minor tweaks when going to the new library, but this is as close as you'll get to replicating the snapshots.
1. Once migrated over, you can try removing the `formatter` and `classicFormatting` settings to use the new formatter which is much more customizable. This will require updating your snapshots again, expect major formatting changes to occur. Consult the new [docs site](https://TheJaredWilcurt.com/vue-snapshot-serializer) for details on customzing snapshots.
   ```js
   global.beforeEach(() => {
     // Set the default settings for each snapshot
     global.vueSnapshots = {
       formatting: {}
     };
   });
   ```


* * *


# Old Documentation

Everything below this point is the original documentation for this library.


* * *


# jest-serializer-vue-tjw

[![Node.js CI](https://github.com/tjw-lint/jest-serializer-vue-tjw/actions/workflows/node.js.yml/badge.svg)](https://github.com/tjw-lint/jest-serializer-vue-tjw/actions/workflows/node.js.yml) [![Test Coverage: 100%](https://img.shields.io/badge/Test%20Coverage-100%25-brightgreen.svg?logo=jest)](https://github.com/tjw-lint/jest-serializer-vue-tjw/actions/workflows/node.js.yml) [![Lint Coverage: 100%](https://img.shields.io/badge/Lint%20Coverage-100%25-brightgreen.svg?logo=eslint)](https://github.com/tjw-lint) [![Compatible with Node 8.3+](https://img.shields.io/badge/Node-%3E%3D8.3.0-brightgreen.svg?logo=Node.js)](/package.json) [![Code of Conduct: No Ideologies](https://img.shields.io/badge/CoC-No%20Ideologies-blue)](/CODE_OF_CONDUCT.md) [![MIT Licensed](https://img.shields.io/badge/License-MIT-brightgreen)](/LICENSE)


Jest Vue snapshot serializer

![Project logo](logo.png)

*Logo made by Aurora Wooton (age 14)*


* * *


**Quotes:**

> "This looks fantastic! This might sell me on testing." - [Views on Vue podcast (#99)](https://topenddevs.com/podcasts/views-on-vue/episodes/vov-099-testing-in-vue-with-the-jared-wilcurt)


* * *


**Sections:**

* [Features List](#features-list)
  * [Better Snapshots Demo](#what-do-you-mean-by-much-better-snapshot-defaults)
* [Usage/Installation/Migration Instructions](#usage-and-migrating-from-v2-to-v3)
  * [Expected breaking changes for v2 to v3 migration](#breaking-changes-to-expect-in-your-snapshots-during-migration)
  * [Avoiding snpshot changes (not recommended)](#avoiding-breaking-changes-not-recommended)
* [API](#api)
* [FAQs & Testing Tips](#faqs--tips)


## Features list:

The following can all be adjusted in your `vue.config.js` settings or `package.json`.

1. Can optionally remove from snapshots (enabled by default):
   * `data-server-rendered="true"`
   * `data-test="whatever"`
   * `data-testid="whatever"`
   * `data-test-id="whatever"`
   * `data-v-1234abcd=""`
1. Can optionally remove from snapshots (disabled by default):
   * All html comments `<!-- whatever -->`
   * `data-qa="whatever"`
   * `id="testWhatever"`
   * `class="test-whatever"`
1. Can clear out inline functions from snapshots, or keep them but remove Istanbul's auto-inserted comments.
1. Has an experimental feature to display JSON data stored in HTML attributes instead of `href="[object Object]"`
1. Has much better snapshot defaults.
1. Lets you control your snapshot formatting with an API.


### What do you mean by "much better snapshot defaults"?

This is the before and after of using the default formatting options from v2, and the default formatting options in v3. You can now customize the formatting as well in v3 (See API).

![Difference between the snapshot settings, my version makes the formatting cleaner and easier to see what actually changed in a failing snapshot](https://user-images.githubusercontent.com/4629794/96301398-22b20c80-0fc5-11eb-8d71-195f56b556e0.gif)


## Usage and Migrating from v2 to v3

1. First you will need to install this new dependency:
   * `npm install --save-dev jest-serializer-vue-tjw`
   * If you have `jest-serializer-vue` in your dependencies or devDependencies it can be removed.
1. Next you will need to change your Jest config settings. Make sure to replace the reference to the previous (non-TJW) version with the new version:
   ```js
   "snapshotSerializers": [
     "<rootDir>/node_modules/jest-serializer-vue-tjw"
   ]
   ```
1. Run your test command with `-- -u` at the end so it will update any existing snapshots, for example:
   * `npm run test:unit -- -u`
1. Then just use `.toMatchSnapshot('optional snapshot name');` in your tests:

**Example:**

```js
import { shallowMount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent.vue', () => {
  describe('Created', () => {
    test('Renders correctly with default props', () => {
      const wrapper = shallowMount(MyComponent);

      expect(wrapper)
        .toMatchSnapshot();
    });
  });
});
```



### Breaking changes to expect in your snapshots during migration

1. General formatting will be improved to aid in readability and better diffs.
1. Test tokens will be removed. These are used to target elements in your tests.
   * `data-test="whatever"`
   * `data-testid="whatever" `
   * `data-test-id="whatever"`
1. All `data-v-whatever=""` will be removed. These are attributes added by Vue to help scope styles. Removing them from your snapshots makes updating scoped dependencies easier.
1. Any empty HTML attributes will be trimmed to remove the empty assignment. So `<div class=""></div>` becomes `<div class></div>`.
1. Some optionally self-closing tags, will now become self-closing. So `<svg><path></path></svg>` becomes `<svg><path /></svg>`.

**Example:** These are the kind of diffs you can expect to see when migrating from v2 to v3.

```diff
 <div>
-  <h1 data-test="pageTitle" data-test-id="pageTitle" data-testid="pageTitle">
+  <h1>
     The above specific data-attrubutes are removed by default.
   </h1>
   <div>
-    <span class="active" data-v-b3d95ac7="">
+    <span class="active">
       These data-v ID's are removed too by default.
     </span>
     <!---->
     <!-- There's an option you can turn on to remove all HTML comments too -->
     <!-- It's turned off by default, since they usually represent a v-if="false" -->
     <!-- and maybe you want to know about that. If not, set removeComments: true -->
   </div>

   <div>
-    <h3 class="inline-block">Default formatting is improved</h3> <span><i class="fa fa-spinner"></i> <span class="sr-only">Loading...</span></span> <a><button type="button class="primary"><i class="fa fa-plus"></i>
+    <h3 class="inline-block">Default formatting is improved</h3>
+    <span>
+      <i class="fa fa-spinner"></i>
+      <span class="sr-only">Loading...</span>
+    </span>
+    <a>
+      <button class="primary" type="button>
+        <i class="fa fa-plus"></i>
         The formatting here is completely customizable (see API).
-    </button></a>
+      </button>
+    </a>
-    <svg style="">
+    <svg style>
-      <path d="M 10,150 L 70,10 L 130,150 z"></path>
+      <path d="M 10,150 L 70,10 L 130,150 z" />
     </svg>
   </div>
 </div>
```


### Avoiding breaking changes (not recommended)

Though all default settings are designed to be the best choice for most people, if you want to opt out of these (or opt-in to other changes, like removing HTML comments from snapshots) you can via a settings object in your Vue config. Note, some changes cannot currently be avoided (self-closing enforcement and empty attribute trimming).

1. Edit your `vue.config.js` in the root of your project (or create it, if you do not have one).
1. The following are the `jest-serializer-vue` v2.0.2 settings:

```js
// vue.config.js
module.exports = {
  pluginOptions: {
    jestSerializer: {
      clearInlineFunctions: false,
      // All available options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
      formatting: {
        unformatted: ['code', 'pre', 'em', 'strong', 'span'],
        indent_inner_html: true,
        indent_char: ' ',
        indent_size: 2,
        sep: '\n'
      },
      removeClassTest: false,
      removeComments: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataCy: false,
      removeDataVId: false,
      removeIdTest: false,
      removeIstanbulComments: false,
      removeServerRendered: true,
      sortAttributes: false,
      stringifyObjects: false
    }
  }
};
```


## API

**ALL SETTINGS ARE OPTIONAL**. The defaults are below. If you like them, you don't need to add anything to your Vue config.

In your `vue.config.js` file:

```js
module.exports = {
  pluginOptions: {
    jestSerializer: {
      attributesToClear: [],
      clearInlineFunctions: false,
      // All available formatting options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
      formatting: {
        indent_char: ' ',
        indent_inner_html: true,
        indent_size: 2,
        inline: [],
        sep: '\n',
        unformatted: ['code', 'pre']
      },
      removeClassTest: false,
      removeComments: false,
      removeDataTest: true,
      removeDataTestid: true,
      removeDataTestId: true,
      removeDataQa: false,
      removeDataCy: false,
      removeDataVId: true,
      removeIdTest: false,
      removeIstanbulComments: true,
      removeServerRendered: true,
      sortAttributes: true,
      verbose: true,
      // Experimental features:
      addInputValues: false,
      stringifyObjects: false
    }
  }
};
```

Alternatively, you can place your settings in the `package.json`. If a `jestSerializer` object exists here, we skip looking for a `vue.config.js` file (useful for those with complex configs, Nuxt users, or those not using Vue-CLI).

In your `package.json` file:

```json
{
  "name": "your_app",
  "scripts": {},
  "devDependencies": {},

  "jestSerializer": {
    "attributesToClear": [],
    "clearInlineFunctions": false,
    "//": "All available formatting options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js",
    "formatting": {
      "indent_char": " ",
      "indent_inner_html": true,
      "indent_size": 2,
      "inline": [],
      "sep": "\n",
      "unformatted": ["code", "pre"]
    },
    "removeClassTest": false,
    "removeComments": false,
    "removeDataTest": true,
    "removeDataTestid": true,
    "removeDataTestId": true,
    "removeDataQa": false,
    "removeDataCy": false,
    "removeDataVId": true,
    "removeIdTest": false,
    "removeIstanbulComments": true,
    "removeServerRendered": true,
    "sortAttributes": true,
    "verbose": true,
    "// ": "Experimental features:",
    "addInputValues": false,
    "stringifyObjects": false
  }
}
```

Setting                | Default           | Description
:--                    | :--               | :--
attributesToClear      | []                | Takes an array of attribute strings, like `['title', 'id']`, to remove the values from these attributes. `<input title id class="stuff">`.
clearInlineFunctions   | `false`           | Replaces `<div title="function () { return true; }">` or this `<div title="(x) => !x">` with this placeholder `<div title="[function]">`.
formatting             | See above example | These options format the snapshot. [See all available options here](https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js).
removeClassTest        | `false`           | Removes all CSS classes that start with "test", `class="test-whatever"`. **Warning:** Don't use this approach. Use `data-test` instead. It is better suited for this because it doesn't conflate CSS and test tokens.
removeComments         | `false`           | Removes all HTML comments from your snapshots. This is false by default, as sometimes these comments can infer important information about how your DOM was rendered. However, this is mostly just personal preference.
removeDataTest         | `true`            | Removes `data-test="whatever"` from your snapshots if true. To also remove these from your production builds, [see here](https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138).
removeDataTestid       | `true`            | Removes `data-testid="whatever"` from your snapshots if true.
removeDataTestId       | `true`            | Removes `data-test-id="whatever"` from your snapshots if true.
removeDataQa           | `false`           | Removes `data-qa="whatever"` from your snapshots if true. `data-qa` is usually used by non-dev QA members. If they change in your snapshot, that indicates it may break someone else's E2E tests. So most using `data-qa` prefer they be left in by default.
removeDataCy           | `false`           | Removes `data-cy="whatever"` from your snapshots if true. `data-cy` is used by Cypress end-to-end tests. If they change in your snapshot, that indicates it may break an E2E tests. So most using `data-cy` prefer they be left in by default.
removeDataVId          | `true`            | Removes `data-v-1234abcd=""` from your snapshots. Important if a 3rd-party component uses scoped styles, to prevent ID changes from breaking your `mount` based tests when updating a dependency.
removeIdTest           | `false`           | Removes `id="test-whatever"` or `id="testWhatever"`from snapshots. **Warning:** You should never use ID's for test tokens, as they can also be used by JS and CSS, making them more brittle. Use `data-test-id` instead.
removeIstanbulComments | `true`            | Removes `/* istanbul ignore next */ cov_1lmjj6lxv1.f[3]++;` comments from snapshots when functions are inside HTML attributes. See [v3.16.0 release notes](https://github.com/tjw-lint/jest-serializer-vue-tjw/releases/tag/v3.16.0) for more details.
removeServerRendered   | `true`            | Removes `data-server-rendered="true"` from your snapshots if true.
sortAttributes         | `true`            | Sorts the attributes inside HTML elements in the snapshot. This helps make snapshot diffs easier to read.
verbose                | `true`            | Logs to the console errors or other messages if true. **Strongly recommended** if using experimental features.
addInputValues         | `false`           | **EXPERIMENTAL** Displays the value of form fields. `<input>` becomes `<input value="whatever">` in your snapshots. Requires you pass in `wrapper`, not `wrapper.html()`. On deeply nested components, it may exceed callstack.
stringifyObjects       | `false`           | **EXPERIMENTAL** Replaces `title="[object Object]"` with `title="{a:'asdf'}"` in your snapshots, allowing you to see the data in the snapshot. Requires you to pass in `wrapper`, not `wrapper.html()`. This is still a work in progress. On deeply nested components, it may exceed callstack.


## FAQs & tips

**What is the best approach for targeting elements in a test?** - Use `data-test` when targeting multiple elements, or `data-test-id` (or `data-testid` if you don't like the extra hyphen) when targeting a unique element.

```js
test('Click link', () => {
  const wrapper = shallowMount(LinkList);
  const linkList = wrapper.find('[data-test-id="linkList"]');
  const domLink = linkList.findAll('[data-test="link"]').at(0);

  domLink.trigger('click');

  expect(specialFunction)
    .toHaveBeenCalledWith('https://passed-in-url.com');
});

```

**I have some code that I don't want formatted. How do I "opt out" of the settings for one test?** - You can skip the snapshots and just do a string comparison directly, without a snapshot. This is useful when the actual whitespace in the DOM is important and needs to be captured properly without formatting being applied.

```js
test('Spacing around links is accurate', () => {
  const wrapper = shallowMount(YourComponent);
  const section = wrapper.find('[data-test-id="specificSection"]');

  expect(section.html())
    .toEqual(`<div data-test-id="specificSection">
  <a href="#">link</a><a href="#">link</a>     <a href="#">link</a>
  <a href="#">link</a>  <a href="#">link</a>
</div>`);
});
```

**How do I override the settings for just one test?** - This is a little complicated, but doable. The following is a basic example. You can refer to the test setup/helpers file in this repo for a more complex example.

```js
describe('YourComponent.vue', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Overriding snapshot settings for one test', () => {
    jest.doMock('../../../vue.config.js', function () {
      return {
        pluginOptions: {
          jestSerializer: {
            removeComments: true,
            stringifyObjects: true
          }
        }
      };
    });

    const wrapper = shallowMount(YourComponent);
    const section = wrapper.find('[data-test-id="specificSection"]');

    expect(section)
      .toMatchSnapshot();
  })
});
```

**How do I opt out of stringifyObjects or addInputValues for one test?** - This is actually much easier. These experimetnal features can only be done on a Vue VNode. So if you do `.html()` prior to sending it, it will always skip these transforms. This allows you to use these experimental features more easily, while opting out of the more troublesome tests.

```js
test('Assuming stringifyObjects is enabled', () => {
  const wrapper = shallowMount(YourComponent);

  expect(wrapper)
    .toMatchSnapshot('Stringify objects and add input values');

  expect(wrapper.html())
    .toMatchSnapshot('Opt out of stringify objects and adding input values');
});
```


## Using with Vitest

Vitest actually uses the same snapshot library under the hood as Jest, so this library will work with it as well.

1. `npm install --save-dev jest-serializer-vue-tjw`
1. In your `/vite.config.js` file point to a setup file:
   ```js
   import { defineConfig } from 'vite';
   
   export default defineConfig({
     test: {
       setupFiles: [
         './tests/unit/setup.js'
       ]
     }
   });
   ```
1. In your `/tests/unit/setup.js` file:
   ```js
   import vueSnapshotSerializer from './serializer.js';
   
   expect.addSnapshotSerializer(vueSnapshotSerializer);
   ```
1. In your `/tests/unit/serializer.js` file:
   ```js
   const jestSerializerVueTJW = require('jest-serializer-vue-tjw');
   
   const helpers = {
     isHtmlString: function (received) {
       return (
         typeof(received) === 'string' &&
         (
           received.startsWith('<') ||
           received.startsWith('"<')
         )
       );
     },
     isVueWrapper: function (received) {
       return (
         typeof(received) === 'object' &&
         typeof(received.html) === 'function'
       );
     }
   };
   
   module.exports = {
     test: function (received) {
       return helpers.isHtmlString(received) || helpers.isVueWrapper(received);
     },
     print: function (received) {
       // force to a string
       received = received?.html && received?.html() || received;
       return jestSerializerVueTJW.print(received);
     }
   };
   ```
1. Any customizing of settings for this library should be placed in your `/package.json`, like so:
   ```json
   {
     "jestSerializer": {
       "sortAttributes": true,
       "verbose": true
     }
   }
   ```
