Vue.component('modal', {
    template: `
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container neutral">
                        <div class="modal-header">
                            <slot name="header">
                                <h3>Header</h3>
                            </slot>
                        </div>
                        <div class="modal-body">
                            <slot name="body">
                                default body
                            </slot>
                        </div>
                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="primary simple" @click="$emit('close')">
                                    OK
                                </button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    `
});