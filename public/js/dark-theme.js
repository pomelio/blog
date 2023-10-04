$(document).ready(
    function(){

        let darkMode = null;

        var html = `    
        <button  data-tooltip-target="tooltip-toggle" type="button"
        class="theme-toggle text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
        <svg class="theme-toggle-dark-icon hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg class="theme-toggle-light-icon hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
    </button>
    
`;

        
        $('#top-header .theme-toggle').replaceWith(html);
        $('#side-header .theme-toggle').replaceWith(html);

        var currentTheme = localStorage.getItem('color-theme');

        if (currentTheme === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            $(document).addClass('dark');
            darkMode = 'dark';
        } else {
            $(document).remove('dark');
            darkMode = 'light';
        }
    
    
        //theme
       
        // Change the icons inside the button based on previous settings
        if (currentTheme === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            $('.theme-toggle-light-icon').removeClass('hidden');
        } else {
            $('.theme-toggle-dark-icon').removeClass('hidden');
        }
    
    
        $('.theme-toggle').click( function () {
    
            // toggle icons
            $('.theme-toggle-dark-icon').toggleClass('hidden');
            $('.theme-toggle-light-icon').toggleClass('hidden');

            currentTheme = localStorage.getItem('color-theme');
    
            // if set via local storage previously
            if (currentTheme) {
                if (currentTheme === 'light') {
                    $(document).addClass('dark');
                    localStorage.setItem('color-theme', 'dark');
                    darkMode = 'dark';
                } else {
                    $(document).removeClass('dark');
                    localStorage.setItem('color-theme', 'light');
                    darkMode = 'light';
                }
    
                // if NOT set via local storage previously
            } else {
                if ($(document).hasClass('dark')) {
                    $(document).removeClass('dark');
                    localStorage.setItem('color-theme', 'light');
                    darkMode = 'light';
                } else {
                    $(document).addClass('dark');
                    localStorage.setItem('color-theme', 'dark');
                    darkMode = 'dark';
                }
            }
            
            $(document).trigger('dark-mode', [darkMode]);
    
        });
    }
);