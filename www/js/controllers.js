angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Restangular) {

	$scope.loading = false;
	Restangular.one('posts').get()  // GET: /users
		.then(function(posts) {
			// returns a list of users
			$scope.posts = posts.posts; // first Restangular obj in list: { id: 123 }
			$scope.nextPage = posts.meta.next_page ;
		} , function(response){ $scope.response = response} );
	
	
	$scope.loadMore = function() {
		
		console.log('working....');
		$scope.loading = true;
		Restangular.one('posts').get({page_handle : $scope.nextPage }).then( function(posts){
		
				$scope.posts.push.apply($scope.posts,posts.posts);
				$scope.nextPage = posts.meta.next_page ;
				$scope.loading = false;
		}); 
	
	}

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Restangular) {
	
	Restangular.one('posts', $stateParams.chatId).get().then( function(post){ $scope.post = post});
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
