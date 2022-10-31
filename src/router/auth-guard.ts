import { useUserStore } from '../stores/modules/user'
export default function (to: any, from: any, next: any) {
  const nextSteps = () => {
    if (useUserStore().user !== null) {
      next()
    } else {
      if (to.path === '/' && from.path === '/') {
        next('/auth')
      }
      next('/auth?loginError=true')
    }
  }

  function checkFlag() {
    if (useUserStore().isUserChecked === false) {
      window.setTimeout(
        checkFlag,
        100
      ) /* this checks the flag every 100 milliseconds*/
    } else {
      nextSteps()
    }
  }
  checkFlag()
}
