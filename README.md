This repo is a copy of Angular's Karma examples, migrated migrated to Jest + Spectator.

A working Karma example repo can be found [here](https://github.com/muratkeremozcan/books/tree/master/Angular_with_Typescript/angular-unit-testing-with-Karma). 

Clone, cd in, `npm i && npm run test`.


## Migrate from Karma to Jest.

[Why use Jest](https://slides.com/msz_technology/deck)?


You can do it [manually](https://dev.to/alfredoperez/angular-10-setting-up-jest-2m0l), or automatically with [Angular Jest Schematic from Briebug](https://github.com/briebug/jest-schematic)

To get started:



```bash
npm install jest @types/jest jest-preset-angular --save-dev

npm uninstall karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter @types/jasmine @types/jasminewd2 jasmine-core jasmine-spec-reporter

ng add @briebug/jest-schematic
```

The schematic will do these:
```bash
DELETE karma.conf.js
DELETE src/test.ts
CREATE jest.config.js (180 bytes)
CREATE setup-jest.ts (860 bytes)
CREATE test-config.helper.ts (611 bytes)
UPDATE package.json (1322 bytes)
UPDATE angular.json (3592 bytes)
UPDATE tsconfig.spec.json (330 bytes)
```

Instead of `jest.config.js`, move the settings to package.json. I like to add to package.json the settings in the [manual instructions](https://dev.to/alfredoperez/angular-10-setting-up-jest-2m0l). Enhance this as you need it. Here is what I have in `package.json`:

```json
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
      "<rootDir>/setup-jest.ts"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/"
    ],
    "globals": {
      "ts-jest": {
        "tsconfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$"
      }
    },
    "moduleNameMapper": {
      "@core/(.*)": "<rootDir>/src/app/core/$1"
    }
  }
```

I also like to replace default test script in `package.json` and add some new ones:

```json
"scripts": {
  ...
  "test": "jest",
  "test:coverage": "jest --collectCoverage",
  "test:watch": "jest --watch",
}
```

In `setup-jest.js`, change the first line from `import 'jest-preset-angular';` to `import 'jest-preset-angular/setup-jest`. This will get rid of the Jest warning when running tests. In a future version of briebug schematic, this may be taken care of.

Spying and mocking is different in Jest. You will have to change these manually.


If using Spectator, `npm i -D @ngneat/spectator`. In the spec files change `import from '@ngneat/spectator'` to  `import from '@ngneat/spectator/jest'`.
