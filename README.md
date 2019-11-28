# Hópverkefni 2 vefforitun 1 haust 2019

## Uppsetning á verkefni

Til að setja upp verkefnið:

```
npm install
npm run babel
```

Til að keyra verkefnið:
```
npm run dev
```

Til að linta verkefnið:
```
npm run test
```

## Lýsing á verkefninu:

Verkefnið var unnið eftir forskrift, sjá https://github.com/Wolfcoder13/vef1-2019-h2.

Mappan utlit er óbreytt og hún inniheldur myndir af því hvernig vefurinn á að líta út.

Mappan img inniheldur allar myndir sem notaðar voru.

Mappan src inniheldur tvær aðrar möppur, lib og styles, og einnig index.js. Mappan lib inniheldur filter.js, helpers.js og list.js.
Skráin filter.js inniheldur klasann filter. Skráin helpers.js inniheldur eitt hjálparfall. Skráin list.js inniheldur klasann list og þar er einnig náð í gögn frá skránni lectures.json. Allar þessar skrár og index.js eru aðalskrárnar fyrir JavaScript kóðann.
Mappan styles inniheldur config.scss og styles.scss. Config.scss inniheldur fasta fyrir liti, vídd, gutter og leturgerð. Styles.scss er aðalskráin fyrir CSS.

Þegar npm run babel er keyrt þá er mappan dist búin til. Hún inniheldur bundle.js, bundle.js.map og styles.css. Babel er notað til að transpila kóða.

Þegar npm run dev er keyrt þá keyrist sass og browser-sync.

Rollup er notað til þess að pakka saman JavaScript kóða.

## Verkefnið gerðu:

Ársól Drífa Ólafsdóttir ado12@hi.is

Einar Björn Ólafsson ebo8@hi.is

Snorri Steinn Stefánsson Thors sss55@hi.is
