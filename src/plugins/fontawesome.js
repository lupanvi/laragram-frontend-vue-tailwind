
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faHeart, faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons'
import { faComment, faPlusSquare } from '@fortawesome/free-regular-svg-icons'

library.add(faBars, faHeart, faComment, faArrowLeft, faHome, faPlusSquare)

export {
    FontAwesomeIcon
}