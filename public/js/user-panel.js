$(document).ready(
    function(){

        var myAccount = localStorage.getItem('my-account');

        
        if (myAccount) {
            html = renderUserPanel(myAccount);
            let account = JSON.parse(myAccount);
            $(document).trigger('my-account', [account]);
        } else {
            html = renderLoginPanel();
            $(document).trigger('my-account', []);
        }
        
        $('#top-header .user-panel').replaceWith(html);
        $('#side-header .user-panel').replaceWith(html);

        $(".user-panel button").click((e) => {
            e.preventDefault();
            $(".user-panel .dropdown-menu").toggleClass('hidden');
            
        });


        $(".logout").click((e) => {
            e.preventDefault();
            logout();
        });

        function renderLoginPanel() {
            var currentURL = encodeURIComponent(window.location.href);
            var html = `
    <div class="user-panel flex items-center ml-3">
        <div>
            <a href="/login?redirect=${currentURL}" type="button"
                class="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false">
                <span class="sr-only">Open user menu</span>
                <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
</svg>
            </a>
        </div>
    </div>
        
`;
            return html;
        }
        

        function renderUserPanel(myAccount) {
            myAccount = JSON.parse(myAccount);
            let picture = myAccount.picture;
            let name = myAccount.name;
            
            let html = `
        <div class="user-panel relative flex items-center ml-3">
            <div>
                <button type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full"
                        src="${picture}" alt="user photo">
                </button>
            </div>

            <div class="dropdown-menu absolute top-5 right-0 z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                <div class="px-4 py-3" role="none">
                    <p class="text-sm text-gray-900 dark:text-white" role="none">
                        ${name}
                    </p>
                    
                </div>
                <ul class="py-1" role="none">
                    <li class="logout">
                        <a href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem">Sign out</a>
                    </li>
                </ul>
            </div>
        </div>
`;
            return html;
        }


        function logout() {

            localStorage.removeItem('my-account');
            let html = renderLoginPanel();
        
            $('#top-header .user-panel').replaceWith(html);
            $('#side-header .user-panel').replaceWith(html);

            $('.user-panel button').click((e) => {
                $('.user-panel .dropdown-menu').toggleClass('hidden');
            });

            $(document).trigger('my-account', []);
        }

    }
);