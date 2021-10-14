export default {
    state: {
        characteristics: {
            foodEnergy: [
                {title: 'Белки', description: 'Lorem ipsum', values: [{value: 140, origin: 'v1'}]},
                {title: 'Жиры', description: 'Lorem ipsum', values: [{value: 94, origin: 'v1'}]},
                {title: 'Углеводы', description: 'Lorem ipsum', values: [{value: 351, origin: 'v1'},{value: 163, origin: 'v2'}]},
                {title: 'Калорий', description: 'Lorem ipsum', values: [{value: 2806, origin: 'v1'}]},
            ],
            vitamins: [
                {title: 'A', description: 'Lorem ipsum', values: [{value: 900, origin: 'v1'}]},
                {title: 'B1', description: 'Lorem ipsum', values: [{value: 1.5, origin: 'v1'}]},
                {title: 'B2', description: 'Lorem ipsum', values: [{value: 1.8, origin: 'v1'}]},
                {title: 'B4', description: 'Lorem ipsum', values: [{value: 500, origin: 'v1'}]},
                {title: 'B6', description: 'Lorem ipsum', values: [{value: 2, origin: 'v1'}]},
                {title: 'B12', description: 'Lorem ipsum', values: [{value: 0.003, origin: 'v1'}]},
                {title: 'C', description: 'Lorem ipsum', values: [{value: 90, origin: 'v1'}]},
                {title: 'D', description: 'Lorem ipsum', values: [{value: 0.01, origin: 'v1'}]},
                {title: 'E', description: 'Lorem ipsum', values: [{value: 15, origin: 'v1'}]},
                {title: 'K', description: 'Lorem ipsum', values: [{value: 0.12, origin: 'v1'}]},
                {title: 'Z', description: 'Lorem ipsum', values: [{value: 12, origin: 'v1'}]},
            ],
            macromicto: [
                {title: 'Калий', description: 'Lorem ipsum', values: [{value: 2500, origin: 'v1'},{value: 4, origin: 'v2'}]},
                {title: 'Магний', description: 'Lorem ipsum', values: [{value: 400, origin: 'v1'},{value: 4, origin: 'v2'}]},
            ],
        }
    },
    mutatuins: {},
    actions: {},
    getters: {
        basicCharacteristics (state) {
            return state.characteristics
        },
    }
}