import {
  reactive,
  useContext,
  toRefs,
  watch,
  computed,
} from '@nuxtjs/composition-api'
import humps from 'humps'

const state = reactive({
  links: [],
  currentLink: {},
  saved: false,
})

watch(
  [() => state.currentLink.originalUrl, () => state.saved],
  ([_link, _saved], [_preLink, preSaved]) => {
    if (preSaved) {
      state.saved = false
    }
  }
)

export default function useLinks() {
  const { $axios, $config } = useContext()

  const fetchLinks = async () => {
    await $axios
      .get('/links')
      .then(({ data }) => {
        state.links = humps.camelizeKeys(data)
      })
      .catch((_error) => {})
  }

  const createLink = async () => {
    if (state.currentLink.originalUrl) {
      await $axios
        .post('/links', humps.decamelizeKeys(state.currentLink))
        .then(({ data }) => {
          const link = humps.camelizeKeys(data)
          state.links.unshift(link)
          state.currentLink = {
            ...link,
            originalUrl: shortLinkUrl(link.alias),
          }
          state.saved = true
        })
        .catch((_error) => {})
    }
  }

  const deleteLink = async (id) => {
    await $axios
      .delete(`/links/${id}`)
      .then(({ data }) => {
        state.links = state.links.filter((link) => link.id !== id)
      })
      .catch((_error) => {})
  }

  const editLink = async ({ id, password, alias }) => {
    await $axios
      .patch(`/links/${id}`, {
        password,
        alias,
      })
      .then(({ data }) => {
        const oldLinkIndex = state.links.findIndex((link) => link.id === id)
        state.links = Object.assign([...state.links], {
          [oldLinkIndex]: humps.camelizeKeys(data),
        })
      })
  }

  const shortLinkUrl = (alias) => {
    return `${$config.shortLinkDomain}/${alias}`
  }

  const linksCount = computed(() => state.links.length)

  const recentLinks = computed(() => state.links.slice(0, 3))

  return {
    ...toRefs(state),
    fetchLinks,
    createLink,
    deleteLink,
    editLink,
    shortLinkUrl,
    linksCount,
    recentLinks,
  }
}
