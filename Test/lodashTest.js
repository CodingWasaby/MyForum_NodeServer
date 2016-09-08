var _ = require('lodash');
var  saves  =  ['profile',  'settings'];
var  done  =  _.after(saves.length,  function ()  {
      console.log('done saving!');
});
_.forEach(saves,  function (type)  {
    console.log( type);
    done();
});