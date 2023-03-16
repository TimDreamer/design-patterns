const DEFAULT_FILE_NAME = 'new file'

class BasicFile {
  constructor(name = DEFAULT_FILE_NAME) {
    this.name = name
  }
  exec() {
    throw new Error('Please extends exec function.')
  }
  add() {
    throw new Error('Please extends add function.')
  }
}

class Dictionary extends BasicFile {
  constructor(name) {
    super(name)
    this.children = []
    this.action
  }

  exec(action) {
    action.call(this, this.name)
    for (const child of this.children) {
      child.exec(action)
    }
  }

  add(basicFile) {
    if (basicFile instanceof BasicFile) {
      this.children.push(basicFile)
    }
    return this
  }
}

class File extends BasicFile {
  exec(action) {
    action.call(this, this.name)
  }
}

// Usage
const folder1 = new Dictionary('folder 1')
const folder2 = new Dictionary('folder 2')
const file1 = new File('file 1')
const file2 = new File('file 2')
const file3 = new File('file 3')
const file4 = new File('file 4')

folder1.add(file1).add(folder2.add(file2).add(file3)).add(file4)

folder1.exec(console.log)
console.log('-------------------------------------')
folder2.exec(console.log)
