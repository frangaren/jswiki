Vue.component('theme-selector', {
    template: `
        <div class="theme-selector">
            <div class="theme" v-for="theme in themes" :style="theme"
                @click="$emit('change-theme', theme)">
                <div class="left slice"></div>
                <div class="right slice"></div>
            </div>
        </div>
    `,
    data: function() {
        return {
            themes: [
                {
                    '--primary-bg-light': '#666ad1',
                    '--primary-bg-color': '#303f9f',
                    '--primary-bg-dark': '#001970',
                    '--primary-fg-color': '#fff',
                    '--accent-bg-light': '#ffd95a',
                    '--accent-bg-color': '#f9a825',
                    '--accent-bg-dark': '#c17900',
                    '--accent-fg-color': '#262626',
                    '--neutral-bg-color': '#fff',
                    '--neutral-fg-color': '#262626',
                    '--neutral-alt-bg-color': '#eeeeee',
                    '--neutral-alt-fg-color': '#626262'
                },
                {
                    '--primary-bg-light': '#fa5788',
                    '--primary-bg-color': '#c2185b',
                    '--primary-bg-dark': '#8c0032',
                    '--primary-fg-color': '#fff',
                    '--accent-bg-light': '#f5fd67',
                    '--accent-bg-color': '#c0ca33',
                    '--accent-bg-dark': '#8c9900',
                    '--accent-fg-color': '#262626',
                    '--neutral-bg-color': '#262626',
                    '--neutral-fg-color': '#fff',
                    '--neutral-alt-bg-color': '#eeeeee',
                    '--neutral-alt-fg-color': '#848484'
                },
                {
                    '--primary-bg-light': '#56c8d8',
                    '--primary-bg-color': '#0097a7',
                    '--primary-bg-dark': '#006978',
                    '--primary-fg-color': '#fff',
                    '--accent-bg-light': '#ae52d4',
                    '--accent-bg-color': '#7b1fa2',
                    '--accent-bg-dark': '#4a0072',
                    '--accent-fg-color': '#fff',
                    '--neutral-bg-color': '#fff',
                    '--neutral-fg-color': '#262626',
                    '--neutral-alt-bg-color': '#eeeeee',
                    '--neutral-alt-fg-color': '#848484'
                },
            ]
        }
    }
});