const fs = require('fs');

const fallbackDataRegex = /const \[products, setProducts\] = useState[^\[]*\[([\s\S]*?)\]\);/;
const importConstant = `import { FALLBACK_PRODUCTS } from '@/lib/constants';\n`;

['src/app/page.tsx', 'src/app/menu/page.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add import if not present
  if (!content.includes('FALLBACK_PRODUCTS')) {
    content = content.replace(/(import .*;\n)+/, (match) => match + importConstant);
  }

  // Replace useState
  content = content.replace(
    /const \[products, setProducts\] = useState<\{[^\}]+\}\[\]>\(\[[\s\S]*?\]\);/,
    "const [products, setProducts] = useState(FALLBACK_PRODUCTS);"
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
