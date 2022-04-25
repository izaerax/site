/**
 * Composable used to manage temporizedText order rendering
 */
export default () => {
  const temporizedTextsArr = []
  let tempCounter = 0

  /**
   * Used to create an array of refs with defined index
   * NOTE: index should be unique for each composable instance to avoid index overwrite
   * source: https://docs.w3cub.com/vue~3/guide/migration/array-refs
   */
  const setRef = (index: number) => {
    return (el: any) => {
      if (el) {
        temporizedTextsArr[index] = el
      }
    }
  }

  /**
   * Called to render the temporized text in order specified by position in temporizedTextsArr
   */
  const nextTempText = () => {
    if (tempCounter < temporizedTextsArr.length) {
      temporizedTextsArr[tempCounter].resume()
      tempCounter++
    }
  }

  return {
    setRef,
    nextTempText,
  }
}