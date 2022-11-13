export default ({
    state: {
        map: null,
        terLayer: null,
        CTALayer: null,
    },
    getters: {
    },
    mutations: {

        updateMap(state, map) {
            state.map = map;
        },

        updateTerLayer(state, terLayer) {
            state.terLayer = terLayer;
        },
        updateCTALayer(state, CTALayer) {
            state.CTALayer = CTALayer;
        },
    },
    actions: {
    },
})