 fis.match('*.{js,css}', {
   useHash: true
 });

 fis.match('*.js', {
   optimizer: fis.plugin('uglify-js')
 });

 fis.match('*.css', {
   useSprite: true,
   optimizer: fis.plugin('clean-css')
 });