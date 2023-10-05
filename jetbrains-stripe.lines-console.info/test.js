// banenr actions
const banner = document.querySelector('.banner-actions');



const $manageSettings = document.querySelector('.manage');

$manageSettings.addEventListener('click', () => {
  $manageSettings.textContent = `Accept [S]elected`;
  const newEl = document.createElement('div');
  newEl.classList.add('banner-options');
  newEl.innerHTML = `
<label for="" class="checkbox">[X] Necessary</label>
        <label for="" class="checkbox">[X] Necessary</label>
        <br>
        <label for="" class="checkbox">[X] Necessary</label>
        <label for="" class="checkbox">[X] Necessary</label>
`;
  banner.insertBefore(newEl, banner.children[1]);
});

const greeting = String.raw`
 ________  ________  ___     
|\   ____\|\   ____\|\  \    
\ \  \___|\ \  \___|\ \  \   
 \ \  \    \ \  \    \ \  \  
  \ \  \____\ \  \____\ \  \ 
   \ \_______\ \_______\ \__\
    \|_______|\|_______|\|__|
                             
Website by Moritz Salla & Josh Murr                          
`;

console.info(greeting);