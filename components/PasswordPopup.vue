<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="passwordDropdownOpened"
      class="fixed bottom-0 inset-x-0 sm:inset-0 px-4 pb-4 sm:flex sm:items-center sm:justify-center"
    >
      <div class="fixed inset-0 transition-opacity" @click="closePasswordPopup">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="bg-white overflow-hidden transform transition-all shadow-xl sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white">
            <div
              class="flex bg-gray-900 py-6 px-10 justify-between items-center"
            >
              <p class="text-white text-2xl">View password</p>
              <CloseIcon
                class="h-4 cursor-pointer"
                @click="closePasswordPopup"
              />
            </div>
            <div class="flex p-10 flex-col">
              <CustomInput :value="displayedPassword" disabled class="w-full">
              </CustomInput>
              <CustomButton
                v-clipboard:copy="displayedPassword"
                v-clipboard:success="setCopied"
                class="self-end mt-8 btn-primary btn-lg w-48"
              >
                {{ copied ? 'Copied' : 'Copy' }}
              </CustomButton>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import usePasswordPopup from '@/composables/usePasswordPopup'
import useCopy from '@/composables/useCopy'
import CloseIcon from '~/assets/images/icons/close.svg?inline'

export default {
  middleware: ['auth'],
  components: {
    CloseIcon,
  },
  setup() {
    const { copied, setCopied } = useCopy()

    const {
      displayedPassword,
      passwordDropdownOpened,
      openPasswordPopup,
      closePasswordPopup,
    } = usePasswordPopup()

    return {
      displayedPassword,
      passwordDropdownOpened,
      openPasswordPopup,
      closePasswordPopup,
      copied,
      setCopied,
    }
  },
}
</script>
