const fs = require('fs');

const formFile = 'src/app/admin/blog/form.tsx';
let content = fs.readFileSync(formFile, 'utf8');
content = content.replace(/\s*\/\/\s*eslint-disable-next-line react-hooks\/rules-of-hooks/g, '');
fs.writeFileSync(formFile, content, 'utf8');

console.log('Removed unnecessary eslint comments');
