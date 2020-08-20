import { reactive, useContext, toRefs } from '@nuxtjs/composition-api'
import humps from 'humps'

export default function useLinks() {
  const state = reactive({
    links: [],
  })

  const { $axios, $config } = useContext()

  const fetchLinks = async () => {
    await $axios
      .get('/links')
      .then(({ data }) => {
        state.links = humps.camelizeKeys(data)
      })
      .catch((_error) => {})
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

  const shortLinkURL = (alias) => {
    return `${$config.shortLinkDomain}/${alias}`
  }

  return {
    ...toRefs(state),
    fetchLinks,
    deleteLink,
    editLink,
    shortLinkURL,
  }
}
