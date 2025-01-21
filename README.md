# Babel17
Babel 17 is a small internationalization library in Javascript.

Usage: 

1) Create a Babel17 object :
```
bab = new Babel17({
  translations: {
    fr: {
      help: 'Aide',
      phrase_test: {one: '#name a #count idée.', other: '#name a #count idées.'},
    },
    en: {
      help: 'Help',
      phrase_test: {one: '#name has #count idea.', other: '#name has #count ideas.'},
    },
    ar: {
      help: 'مساعدة',
      phrase_test: {
        zero:'.لديه #count أفكار #name',
        one: '.لديه فكرة واحدة #name',
        two: '.لدى #name فكرتان',
        few: '.لديه #count أفكار #name',
        many: '.لديه #count فكرة #name',
        other: '.لديه #count فكرة #name',
      },
    }
  }
});
```
"#name" is a variable, replaced by its value in the translation, and
"#count" is the reserved keyword for the number used to find the right plural form. It can be displayed in the translation, or not. The sample of trnaslations above shows the both cases.

2) Get translations with correct plural forms:
```
translation = bab.t(['phrase_test', {count: 2, name: 'Jack'}])
```
translation will be "Jack has 2 ideas."

Translation of a string without plural forms simply come from:
```
translation = bab.t('help')
```

The locale in which Babel 17 localize come from localStorage, options.locale, navigator.language, prefix of navigator.language, options.defaultLang, or 'en'.
You can also set it by :
```
bab.locale = 'fr'
```

 3) Options:
You can define the Bebel 17 object's options at the creation of the object, or after.
Options are :
- translations : the translations
- langvarName : the name used by one Babel 17 object's instance for storage. You don't need to set it until you create more than one instance.
- countKeyword : the reserved keyword used in translations for the number. "count", by default
- debug : if true, display warnings in the Javascript console when something goes wrong. 
- pluralRules : you can replace the default plural rules.
 
