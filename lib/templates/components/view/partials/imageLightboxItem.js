import { getFileAttrs } from '../helpers/imageHelper'
import linkHelpers from '../../../util/linkHelpers'
import getImageSourceSet from '../../../util/getImageSourceSet'

export default {
  name: 'image-lightbox',
  functional: true,
  render (h, {props}) {
    const {content} = props
    const {isExternalUrl} = linkHelpers
    // create single image
    const {fileRef, isLightbox, activateLightBox, isLightboxThumb} = content
    const {srcset, sizes} = getImageSourceSet(fileRef)
    if (!fileRef.file) {
      console.warn('no file item exists', fileRef)
      return
    }
    const figureElementOptions = {
      attrs: {
        ...getFileAttrs(fileRef, null, null, !!isLightbox),
        srcset,
        sizes
      },
      'class': {
        'img-rounded': !!(fileRef.crop && fileRef.crop.includes('round')),
        'lightbox': !!isLightboxThumb
      }
    }

    if (isLightboxThumb) {
      figureElementOptions.on = {click: () => activateLightBox()}
    }
    const tmp = h('figure', {}, [h('img', figureElementOptions)])
    const isLinkExternal = fileRef.linkSlug && isExternalUrl(fileRef.linkSlug)
    const linkAttrs = fileRef.linkSlug ? isLinkExternal
      ? {attrs: {href: fileRef.linkSlug}}
      : {attrs: {to: `/${fileRef.linkSlug}`}}
      : null
    return linkAttrs
      ? h(fileRef.linkSlug && isLinkExternal ? 'a' : 'nuxt-link', linkAttrs, [tmp])
      : tmp
  }
}