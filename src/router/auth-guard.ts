import { useMainStore } from '../stores'
export default function (_: any, _2: any, next: any) {
  if (useMainStore().user !== null) {
    next()
  } else {
    next('/auth?loginError=true')
  }
}
