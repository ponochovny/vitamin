import { useUserStore } from '../stores/modules/user'
export default function (to: any, from: any, next: any) {
  const nextSteps = () => {
    const isUserExists = useUserStore().user !== null
    if (isUserExists) {
      if (to.name === 'Auth') next('/')
      next()
    } else {
      const toAuth = to.name === 'Auth'
      const fromMain = from.path === '/'

      if (toAuth && fromMain) next()
      if (!toAuth) next('/auth?loginError=true')
      if (toAuth) next()

      next('/auth')
    }
  }
  function checkFlag() {
    const timeoutme = setTimeout(
      checkFlag,
      100
    ) /* this checks the flag every 100 milliseconds*/
    if (useUserStore().isUserChecked) {
      clearTimeout(timeoutme)

      nextSteps()
    }
  }
  checkFlag()
}
