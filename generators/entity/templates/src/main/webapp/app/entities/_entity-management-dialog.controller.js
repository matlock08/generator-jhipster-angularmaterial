(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= entityAngularJSName %>DialogController', <%= entityAngularJSName %>DialogController);

    <%= entityAngularJSName %>DialogController.$inject = ['$mdDialog'];

    function <%= entityAngularJSName %>DialogController ($mdDialog) {
        var vm = this;
        
        <%_ for (idx in fields) {
            var fieldName = fields[idx].fieldName;
                        
            if (fields[idx].fieldIsEnum) { 
                            
               var values = fields[idx].fieldValues.replace(/\s/g, '');
               _%>
               
               vm.<%= fieldName %>Values = ('<%= values %>').split(',').map(function(enumValue) { return {value: enumValue }  } );
                  
               
            <%_   
            }        
                       
           }     _%>       
                       
               
        vm.cancel = function() {
            $mdDialog.cancel();
        }
        
        vm.save = function() {
            $mdDialog.hide();
        }
        
        
    }
})();
