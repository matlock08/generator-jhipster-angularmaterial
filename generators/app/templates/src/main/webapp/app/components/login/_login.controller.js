(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$mdDialog','$rootScope', '$state', '$timeout', 'Auth','$mdToast','LoginService'];

    function LoginController ($mdDialog,$rootScope, $state, $timeout, Auth, $mdToast,LoginService) {
        var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.password = null;
        vm.register = register;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;
        vm.username = null;

        function cancel () {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
        }

        function login (event) {
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                vm.authenticationError = false;
                $mdDialog.hide();
                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                    $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                    $state.go('home');
                }

                $rootScope.$broadcast('authenticationSuccess');

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                if (Auth.getPreviousState()) {
                    var previousState = Auth.getPreviousState();
                    Auth.resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                }
            }).catch(function (err) {
                vm.authenticationError = true;
                $mdDialog.hide();
                vm.openToast( err.data.error_description );
            });
        }

        function register (ev) {
            $mdDialog.hide();
            LoginService.openRegister(ev);
        }

        function requestResetPassword (ev) {
            $mdDialog.hide();
            LoginService.openRequestResetPassword(ev);
        }

        vm.openToast = function( message ) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent( message )
                    .position('top right')
                    .hideDelay(3000)
                );
        }
    }
})();
