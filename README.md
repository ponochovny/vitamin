# vitamin

## Structures

__Basic characteristics__
```
[
     vitamins: [
          {title: A, description: ‘Lorem ipsum’},
          {title: B1, description: ‘Lorem ipsum’},
          {title: B2, description: ‘Lorem ipsum’},
          {title: B4, description: ‘Lorem ipsum’},
          {title: B6, description: ‘Lorem ipsum’},
          {title: B12, description: ‘Lorem ipsum’},
          {title: C, description: ‘Lorem ipsum’},
          {title: D, description: ‘Lorem ipsum’},
          {title: E, description: ‘Lorem ipsum’},
          {title: K, description: ‘Lorem ipsum’}
     ],
     macromicto: [
          {title: ‘Калий’, description: ‘Lorem ipsum’}
     ]
]
```
__Product structure__
```
{
     title: ‘Гречка’,
     characteristics: {
          vitamins: {
               {title: A, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: B1, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: B2, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: B4, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: B6, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: B12, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: C, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: D, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: E, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
               {title: K, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
          },
          macromicto: {
               {title: ‘Калий’, versions: [[value: 2, origin: ’v2’].[value: 3, origin: ’v3].[value: 4, origin: ’v4].[value: 5, origin: ’v5]]},
           }
     }
},
```
__Registered meal structure__
```
[
     {
          maturity: 1882391542,
          percentage: 100,
          products: [
               {
                    title: ‘Гречка’,
                    quantity: 100,
                    characteristics: {
                         vitamins: {
                              {title: A, value: 100},
                              {title: B1, value: 100},
                              {title: B2, value: 100},
                              {title: B4, value: 100},
                              {title: B6, value: 100},
                              {title: B12, value: 100},
                              {title: C, value: 100},
                              {title: D, value: 100},
                              {title: E, value: 100},
                              {title: K, value: 100},
                         },
                         macromicto: {
                              {title: ‘Калий’, value: 100},
                          }
                    }
               },
               {
                    title: ‘Овсянка’,
                    quantity: 100,
                    characteristics: {
                         vitamins: {
                              {title: A, value: 100},
                              {title: B1, value: 100},
                              {title: B2, value: 100},
                              {title: B4, value: 100},
                              {title: B6, value: 100},
                              {title: B12, value: 100},
                              {title: C, value: 100},
                              {title: D, value: 100},
                              {title: E, value: 100},
                              {title: K, value: 100},
                         },
                         macromicto: {
                              {title: ‘Калий’, value: 100},
                          }
                    }
               }
          ]
     }
},
```
