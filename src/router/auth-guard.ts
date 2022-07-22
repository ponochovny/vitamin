import { useMainStore } from '../stores'
export default function (_: any, _2: any, next: any) {
  const nextSteps = () => {
    if (useMainStore().user !== null) {
      next()
    } else {
      next('/auth?loginError=true')
    }
  }

  function checkFlag() {
    if (useMainStore().isUserChecked === false) {
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
