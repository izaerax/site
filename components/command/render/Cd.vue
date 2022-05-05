<template lang="pug">
.cd
  .usage(v-if="showUsage") cd: usage: cd [-L|[-P [-e]] [-@]] [dir]
  .help(v-if="showHelp")
    |Change the shell working directory.
    br
    br
    | Change the current directory to DIR.
    | The default DIR is the value of the HOME shell variable.
    br
    br
    |The variable CDPATH defines the search path for the directory containing
    |DIR.  Alternative directory names in CDPATH are separated by a colon (:).
    |A null directory name is the same as the current directory.  If DIR begins
    |with a slash (/), then CDPATH is not used.
    br
    br
    |If the directory is not found, and the shell option `cdable_vars` is set,
    |the word is assumed to be  a variable name.  If that variable has a value,
    |its value is used for DIR.
    br
    br
    |Options:
    br
    .option-section 
      .row
        .option 
          | -L
        .description
          |force symbolic links to be followed: resolve symbolic
          |links in DIR after processing instances of `..`
      .row
        .option 
          | -P
        .description 
          |use the physical directory structure without following
          |symbolic links: resolve symbolic links in DIR before
          |processing instances of `..`
      br
      .row
        .option -e
        .description 
          |if the -P option is supplied, and the current working
          |directory cannot be determined successfully, exit with
          |a non-zero status
      .row
        .option -@
        .description 
          |on systems that support it, present a file with extended
          |attributes as a directory containing the file attributes
    br
    br
    |The default is to follow symbolic links, as if `-L` were specified.
    |`..` is processed by removing the immediately previous pathname component
    |back to a slash or the beginning of DIR.
    br
    br
    |Exit Status:
    |Returns 0 if the directory is changed, and if $PWD is set successfully when
    |-P is used; non-zero otherwise.
  .error(v-else-if="errorMessage") {{ errorMessage }}
  .command(v-else) 
</template>

<script lang="ts" setup>

const props = defineProps({
  args: {type: String, required: false}
})

const path = usePathState()
const { changeDir } = useDirectories()

let argsList = []
let showHelp = false
let showUsage = false
let errorMessage = ''
let options = []
let directory = []

if (props.args) {
  // split the options/params
  argsList = props.args.split(' ')

  options = argsList.filter(str => str.charAt(0) === '-')
  directory = argsList.filter(str => str.charAt(0) !== '-')

  if (directory.length > 2) {
    errorMessage = 'bash: cd: too many arguments'

  } else {
    //check if the options are correct
    options.some((option) => {
      console.log(option)
      if (option === '--help') {
        showHelp = true
        showUsage = true
        return false
      }

      if(option.replace('-', '').split('').some(el => {
        switch(el) {
          case 'P':  
          case 'L':
          case 'e': return false
          default: {
            errorMessage = `bash: cd: -${el}: invalid option`
            showUsage = true
            return true
          }
        }
      })) return true

      return false
    })

    // if no errors found, try to change the directory
    if (!errorMessage && !showHelp) {
      if (!changeDir(directory)) {
        errorMessage = `bash: cd: ${directory}: No such file or directory`
      }
    }
  }

}

</script>

<style lang="scss" scoped>
.help {
  padding-left: 40px;
  max-width: 600px;

  .option-section {
    display: flex;
    flex-direction: column;

    .option {
      width: 20%;
    }
    .description {
      width: 80%;
    }
  }
}
</style>