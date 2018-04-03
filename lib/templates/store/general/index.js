import {setToken, unsetToken} from '../../util/authHelpers'

const AUTH = {
  ROLE: {
    ADMIN: 'Admin',
    CONTRIBUTOR: 'Contributor',
    MODERATOR: 'Moderator'
  },
  roles: ['Admin', 'Moderator', 'Contributor']
}

export const state = {
  cmsLoading: false,
  locale: 'en',
  authUserId: null,
  authUser: null,
  authToken: null,
  drawer: false,
  mainSearch: null,
  searchActive: false,
  showMediaLibrary: false,
  mediaLibraryItems: [],
  mediaAlreadySelected: [],
  mediaOrderBy: 'createdAt_DESC',
  hasJumbotron: false,
  currentArticleCategories: [],
  activeHelpNav: false
}

export const getters = {
  canEdit: (state, getters) => {
    return getters.isAdmin || getters.isModerator
  },
  isModerator: state => !!(state.authUser && state.authUser.role === AUTH.ROLE.MODERATOR),
  isAdmin: state => !!(state.authUser && state.authUser.role === AUTH.ROLE.ADMIN),
  // This is not unused!, used in Header PageTemplates (pt)
  isSupport: state => (state.currentArticleCategories.includes('Support') || state.currentArticleCategories.includes('Support EN')),
  isHelpGuide: state => (state.currentArticleCategories.includes('Help Guide') || state.currentArticleCategories.includes('Help Guide EN'))
}

export const mutations = {
  SET_LANG: (state, {locale, $cms}) => {
    const CONFIG = $cms
    state.locale = CONFIG.languages.includes(locale) ? locale : state.locale
  },
  SET_USER: (state, user) => {
    state.authUser = user
    state.authUserId = user && user.id
  },
  SET_AUTH_TOKEN: (state, val) => {
    state.authToken = val
  },
  SET_DRAWER: (state, val) => {
    state.drawer = val
  },
  SET_MAIN_SEARCH: (state, val) => {
    state.mainSearch = val
  },
  SET_SEARCH_ACTIVE: (state, val) => {
    state.searchActive = val
  },
  SET_ERROR (state, error) {
    state.error = error
  },
  SET_CMS_LOADING (state, val) {
    state.cmsLoading = val
  },
  SET_MEDIA_LIBRARY (state, val) {
    state.showMediaLibrary = val
  },
  SET_MEDIA_LIBRARY_DATA (state, val) {
    state.mediaLibraryItems = val
  },
  SET_MEDIA_LIBRARY_EXISTING (state, val) {
    state.mediaAlreadySelected = val
  },
  SET_MEDIA_ORDER (state, val) {
    state.mediaOrderBy = val
  },
  SET_CMS_JUMBOTRON (state, val) {
    state.hasJumbotron = val
  },
  SET_CURRENT_ARTICLE_CATEGORIES (state, val) {
    state.currentArticleCategories = val
  },
  SET_HELP_NAV: (state, val) => {
    state.activeHelpNav = val
  }

}

export const actions = {
  /**
   * @description is handled now inside of plugin applyMiddleware
   * @param commit
   * @param req
   */
  // nuxtServerInit ({commit}, {req}) {
  //   console.log('on server init', req)
  // },

  /**
   *
   * @param commit
   * @param state
   */
  toggleCmsLoading ({commit, state}) {
    commit('SET_CMS_LOADING', !state.cmsLoading)
  },

  /**
   * toggles the state of drawer
   * @param commit
   * @param state
   */
  toggleDrawer ({commit, state}) {
    commit('SET_DRAWER', !state.drawer)
  },
  /**
   *
   * @param commit
   * @param payload
   */
  setLanguageKey ({commit}, payload) {
    commit('SET_LANG', payload)
    this.app.i18n.locale = payload
    return Promise.resolve(true)
  },
  toggleContentEditMode ({commit}) {
    commit('TOGGLE_CONTENT_EDIT_MODE')
  },
  /**
   *
   * @param commit
   * @param result
   * @returns {Promise.<void>}
   * @constructor
   */
  async LOGIN ({commit}, result) {
    try {
      const data = {
        user: {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          role: result.role
        },
        token: result.token
      }
      setToken(data)
      commit('SET_AUTH_TOKEN', data.token)
      commit('SET_USER', data.user)
      return Promise.resolve(true)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  /**
   *
   * @param commit
   * @returns {*}
   * @constructor
   */
  LOGOUT ({commit}) {
    unsetToken()
    commit('SET_USER', null)
    commit('SET_AUTH_TOKEN', null)
    return Promise.resolve(true) // important because dispatch is async
  },
  /**
   * sets search text
   * @param commit
   * @param payload
   */
  setMainSearch ({commit}, payload) {
    commit('SET_MAIN_SEARCH', payload)
  },
  /**
   *
   * @param commit
   * @param state
   */
  toggleSearchActive ({commit, state}) {
    commit('SET_SEARCH_ACTIVE', !state.searchActive)
  },
  /**
   *
   * @param commit
   * @param err
   */
  setError ({commit}, err) {
    commit('SET_ERROR', err)
  },
  /**
   *
   * @param commit
   * @param val
   */
  setMediaLibrary ({commit}, val) {
    commit('SET_MEDIA_LIBRARY', val)
  },
  /**
   *
   * @param commit
   * @param val
   */
  setMediaLibraryData ({commit}, val) {
    commit('SET_MEDIA_LIBRARY_DATA', val)
  },
  setMediaExistingFiles ({commit}, val) {
    commit('SET_MEDIA_LIBRARY_EXISTING', val)
  },
  /**
   *
   * @param commit
   * @param val
   */
  setMediaOrderBy ({commit}, val) {
    commit('SET_MEDIA_ORDER', val)
  },

  /**
   *
   * @param commit
   * @param val
   */
  setCmsJumbotron ({commit}, val) {
    commit('SET_CMS_JUMBOTRON', val)
  },

  /**
   *
   * @param commit
   * @param val
   */
  setCurrentArticleCategories ({commit}, val) {
    commit('SET_CURRENT_ARTICLE_CATEGORIES', val)
  },

  /**
   *
   * @param commit
   * @param state
   */
  toggleHelpNav ({commit, state}) {
    commit('SET_HELP_NAV', !state.activeHelpNav)
  }
}