angular.module('app.directives', [])

.directive('autoListDivider', ['$timeout', '$rootScope', function($timeout, $rootScope){
    var lastDivideKey = "";
    $rootScope.$on('change-divide-key', function(event, args) {
        console.log('divide Event->');
        //console.log(args);

        lastDivideKey = "";
    });
    
	
	console.log('start !!!!!!!!!!!!!!!!!!!!!!!!!!!!');
// 	console.log(lastDivideKey);

	return {
	    
		link: function(scope, element, attrs) {
		    // start-time field
			var key = attrs.autoListDividerValue;
            
			var defaultDivideFunction = function(k){
				return k.slice( 0, 5 ).toUpperCase();
			};
      
			var doDivide = function(){
				var divideKey = defaultDivideFunction(key);
				console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*');
				console.log('Last key->' + lastDivideKey);
				console.log('New key->' + divideKey);

				if(divideKey != lastDivideKey) { 
				    console.log('!!! add divider !!!');
				    //console.log(element);
					var contentTr = angular.element("<div class='item item-divider divider-element'>"+divideKey+"</div>");
					element[0].parentNode.insertBefore(contentTr[0], element[0]);
				}
				lastDivideKey = divideKey;
			};
			$timeout(doDivide, 0);
		}
	};
}])

.directive('autoListDividerByName', ['$timeout', '$rootScope', function($timeout, $rootScope){
    var lastDivideKeyAlph = "";
    $rootScope.$on('change-divide-key-alph', function(event, args) {
        console.log('divide Event Alph->');
        //console.log(args);

        lastDivideKeyAlph = "";
    });
	return {
		link: function(scope, element, attrs) {
			var key = attrs.autoListDividerByNameValue;
        
			var defaultDivideFunction = function(k){
				return k.slice( 0, 1 ).toUpperCase();
			};
			var doDivide = function(){
				var divideKey = defaultDivideFunction(key);
				console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*');
				console.log('Last key->' + lastDivideKeyAlph);
				console.log('New key->' + divideKey);
				
				if(divideKey != lastDivideKeyAlph) { 
					console.log('!!! add divider !!!');
				    //console.log(element);
					var contentTr = angular.element("<div class='item item-divider divider-element-alph'>"+divideKey+"</div>");
					element[0].parentNode.insertBefore(contentTr[0], element[0]);
				}
				lastDivideKeyAlph = divideKey;
			};
			$timeout(doDivide, 0);
		}
	};
}]);