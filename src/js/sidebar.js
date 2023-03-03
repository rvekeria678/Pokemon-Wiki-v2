const toggler = document.querySelectorAll('.sidebar-toggle');

toggler.forEach((e=>{
    e.addEventListener('click', (event)=>{
        sidebar = document.querySelector('#sidebar');
        links = document.querySelector('#sidebar-links');
    
        if (sidebar.classList.contains('w-0')) {
            sidebar.classList.remove('w-0');
            sidebar.classList.add('w-80')
            //sidebar.classList.add('z-40');
            links.classList.add('visible');
            links.classList.remove('invisible');
        } else {
            sidebar.classList.remove('w-80');
            sidebar.classList.add('w-0');
            //sidebar.classList.remove('z-40');
            links.classList.remove('visible');
            links.classList.add('invisible');
        }
    });
}));