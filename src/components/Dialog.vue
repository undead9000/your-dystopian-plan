<template>
    <div v-if="show">
        <div class="dialog-overlay" />
        <div class="dialog">
            <a 
                href="#" 
                class="dialog-close"
                @click="closeDialog"
            >
                x
            </a>
            <div class="dialog-text">{{ description }}</div>
            <ul 
                class="dialog-variants"
            >
                <li 
                    v-for="answer in answers"
                    :key="answer.buttonName"
                >
                    <button @click="nextDialog(answer.nextId)">
                        {{ answer.buttonName }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">import { ref } from 'vue';

    const props = defineProps({
        dialog: Array,
        show: Boolean,
    })

    const emit = defineEmits(['toggleDialog'])

    const description = ref('')
    const answers = ref([])

    description.value = props.dialog![0].text
    answers.value = props.dialog![0].variants

    function closeDialog() {
        //revert test dialog to start
        description.value = props.dialog![0].text
        answers.value = props.dialog![0].variants

        emit('toggleDialog', false)
    }

    function nextDialog(nextId: Number) {
        const nextDialogNode = props.dialog!.find(element => element.id === nextId);
        description.value = nextDialogNode?.text
        answers.value = nextDialogNode?.variants
    }

</script>

<style scoped lang="scss">
    .dialog {
        position: absolute;
        z-index: 10;
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
        padding: 12px;
        background: white;
        border: 1px solid #333
    }

    .dialog-variants {
        width: 320px;
        margin: 24px 0 0 0;
        padding: 0;
        list-style: none;

        li {
            margin: 0 0 8px;

            &:last-child {
                margin: 0;
            }
        }

        button {
            width: 100%;
        }
    }

    .dialog-overlay {
        position: absolute;
        z-index: 1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.2);
    }

    .dialog-close {
        position: absolute;
        right: 12px;
        top: 12px;
        text-decoration: none;
        color: #ffffff;
        background: #ff0000;
        display: flex;
        width: 16px;
        height: 16px;
        align-items: center;
        justify-content: center;
    }
</style> 