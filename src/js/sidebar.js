const toggler = document.querySelectorAll('.sidebar-toggle');

toggler.forEach((e=>{
    e.addEventListener('click', (event)=>{
        sidebar = document.querySelector('#sidebar');
        links = document.querySelector('#sidebar-links');
    
        if (sidebar.classList.contains('w-0')) {
            sidebar.classList.remove('w-0');
            sidebar.classList.add('w-80')
            links.classList.remove('-left-40');
        } else {
            sidebar.classList.remove('w-80');
            sidebar.classList.add('w-0');
            links.classList.add('-left-40');
        }
    });
}));