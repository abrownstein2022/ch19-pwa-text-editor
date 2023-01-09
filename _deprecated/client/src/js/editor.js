// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database.js';
import { header } from './header.js';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: 'default-value',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      // attempt to load the text from the db
      // if no db-data, try localData (localStorage)
      // otherwise show the cool header
      if(data && data.length){
        console.info('Loaded data from IndexedDB, injecting into editor:', data);
        this.editor.setValue(data);
      }else if(localData && localData.length){
        console.info('Loaded data from localStorage instead:', localData)
        this.editor.setValue(localData);
      }else{
        console.info('No database data - showing header:', header)
        this.editor.setValue(header);
      }
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
