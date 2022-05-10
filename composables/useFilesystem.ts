

export default () => {

  const path = usePathState()
  const currentDir = useCurrentDirState()

  /**
   * try to change the directoy
   * @param newPath 
   * @returns the result of execution 
   */
  const changeDir = (newPath: string): boolean => {
    
    if(newPath === '')  {
      
      currentDir.value = 'home'
      path.value = ''
      return true

    } else if (false) {

      // todo: check dynamic paths
    
    } 

    return false
  }

  return {
    changeDir
  }
}  