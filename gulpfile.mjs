import  gulp from 'gulp';
import { deleteAsync } from 'del';
import jeditor from 'gulp-json-editor';

const distFolder = 'dist'

async function manifest() {
  // Todo: Test with more complex component structure
  gulp.src('./' + distFolder +'/manifest.json')
    .pipe(jeditor(function (json) {
      var arr = [json];
      for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        for (var key in obj) {
          if (key.startsWith('components')) {
            delete json[key];
          }
        }
      }
      return json;
    }))
    .pipe(gulp.dest('./' + distFolder +'/'));
}


function clean() {
  return deleteAsync(['./' + distFolder +'/components'])
};

function move() {
  return gulp.src('./' + distFolder +'/components/**/*.*')
    .pipe(gulp.dest('components')) 
    
}

export default gulp.series(move, clean, manifest);