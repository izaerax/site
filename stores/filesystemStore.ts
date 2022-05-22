import { objectPick } from '@vueuse/shared';
import { defineStore } from 'pinia'

export enum FileType {
  DIR,
  FILE
}

interface MyFile {
  name: string;         //relative path name
  files: Array<MyFile>; //files in the directory
  type: number          //type of file (dir/file)
}

interface MyFileSystem {
  root: MyFile;       // the structure of the filesystem
  fullpath: string;     // the full path es: /projects/firstProject
  shifter: Array<number>// fullpath writen in array indices of files
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useFilesystemStore = defineStore('filesystem', {
  state: (): MyFileSystem => {
    return {
      root: {
        name: '/',
        type: FileType.DIR,
        files: [
          {
            name: 'projects',
            type: FileType.DIR,
            files: [
              {
                name: 'MarinaService',
                type: FileType.DIR,
                files: [],
              }
            ],
          }, {
            name: 'contacts',
            type: FileType.DIR,
            files: [],
          }
        ],
      },
      fullpath: '',
      shifter: []
    }
  },
  getters: {
    getCurrentDir(state): MyFile {
      return getFilePath(state.root, [...state.shifter])
    },
  },
  actions: {
    /**
     * Change the path
     * @param newPath
     */
    changePath(newPath: string): boolean {

      //return to home
      if (newPath === '') {
        this.fullpath = newPath
        this.shifter = []
        return true
      } else {
        let newShift: Array<number>

        const paths = normalizePaths(newPath.split('/'))

        

        if (paths[0] === '') {
          // absolute path change
          
          newPath = ''
          for (const p of paths) {
            if (p !== '') newPath = newPath + '/' + p
          }

          //remove the '' from array
          paths.shift()
          
          newShift = getShiftArray(paths, this.root, [])
        } else {
          // relative path change
          newPath = this.fullpath
          for (const p of paths) {
            if (p !== '') newPath = newPath + '/' + p
          }
          newShift = getShiftArray(paths, this.getCurrentDir, [...this.shifter])
        }

        //TODO: regenerate the path  

        // console.debug(newPath, newShift)
        // newPath = getFullpathFromShifter(this.root, [...newShift], '')
        console.debug('shitf', newShift)
        // if no errors occured
        if (newShift) {
          this.shifter = newShift
          this.fullpath = newPath
          return true
        }

      }

      return false
    }
  }
})


/**
 * recursive function that walk throught the filestore using the shifter array 
 * and returns the current directory
 * @param mf MyFile 
 * @param arr shifter array
 * @returns files in the current array
 */
const getFilePath = (mf: MyFile, arr: Array<number>): MyFile | null => {
  if (arr.length === 0) {
    return mf
  } else {
    const i = arr.pop()
    return getFilePath(mf.files[i], arr)
  }
}

/**
 * construct and return the fullpath from shifter array
 * @param root filestore /
 * @param shifter 
 * @returns path
 */
const getFullpathFromShifter = (root: MyFile, shifter: Array<number>, path: string): string | null => {
  if (shifter.length === 0){
    return path
  } else {
    const next = shifter.shift()
    if (root.files[next]) {
      return getFullpathFromShifter(root.files[next], shifter, path+=root.files[next].name)
    }
  }
  return null
}

/**
 * returns the shift array of the paths
 * @param paths paths to walk throught
 * @param shift current shifter array* 
 * @param mf MyFile root element
 */
const getShiftArray = (paths: Array<string>, mf: MyFile, shift: Array<number>): Array<number> => {
  // check if the array is over or path is /
  if (paths.length === 0 || (paths.length === 1 && paths[0] === '')){
    return shift
  } else {
    const dir = paths.shift()
    for (const [index, value] of Object.entries(mf.files)) {
      if (value.name === dir) {
        shift.push(parseInt(index))
        return getShiftArray(paths, value, shift)
      }
    }
    // el not found
    return null
  }
}

/**
 * normalize the paths array (ex: ['projects', '..', 'projects', '.'] => projects)
 * @param paths 
 * @returns 
 */
const normalizePaths = (paths: Array<string>) => {
  const res = []
  for (const path of paths) {
    if (path === '.') continue
    if (path === '..') {
      if (res.length === 0 || res[res.length -1] === '..') res.push(path)
      else res.pop()
    } 
    else res.push(path)
  }
  console.debug('normalizePath-paths', paths)
  console.debug('normalizePath-res', res)
  return res
}