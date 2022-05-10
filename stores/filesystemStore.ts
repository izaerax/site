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
            files: [],
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
    getFiles(state): Array<MyFile> {
      return getFilesPath(state.root, state.shifter)
    },
    getShiftArrayByPath(state) {
      return (paths: Array<string>) => {
        return getShiftArray(paths, state.root, [])
      } 
    } 
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
        if (newPath.charAt(0) === '/') {
          // absolute path change
          const paths = newPath.split('/')
          // todo: manage the .. and .
          
          paths.shift()
          const newShift = this.getShiftArrayByPath(paths)

          // if no errors occured
          if (newShift) {
            this.shifter = newShift
            this.fullpath = newPath
            return true
          }

        } else {
          // relative path change
        }
      }

      return false
    }
  }
})


/**
 * recursive function that walk throught the filestore using the shifter array 
 * and returns the array of files in the current directory
 * @param mf MyFile 
 * @param arr shifter array
 * @returns files in the current array
 */
const getFilesPath = (mf: MyFile, arr: Array<number>): Array<MyFile> | null => {
  if (arr.length === 0) {
    return mf.files
  } else {
    const i = arr.pop()
    return getFilesPath(mf.files[i], arr)
  }
}

/**
 * returns the shift array of the paths starting from /
 * @param paths paths to walk throught
 * @param shift current shifter array* 
 * @param mf MyFile root elem
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