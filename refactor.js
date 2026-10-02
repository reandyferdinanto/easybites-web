const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app');

const dirsToMove = ['components', 'lib', 'store'];

dirsToMove.forEach(dir => {
  const oldPath = path.join(appDir, dir);
  const newPath = path.join(srcDir, dir);
  
  if (fs.existsSync(oldPath)) {
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath, { recursive: true });
    }
    const files = fs.readdirSync(oldPath);
    files.forEach(file => {
      fs.renameSync(path.join(oldPath, file), path.join(newPath, file));
    });
    fs.rmdirSync(oldPath);
    console.log(`Moved ${dir} to src/${dir}`);
  }
});

// Update imports
function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && name !== 'node_modules' && name !== '.next') {
            walkSync(filePath, callback);
        }
    });
}

walkSync(srcDir, (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Regex to match relative imports that point to components, lib, store
        // e.g. from '../components/X' to '@/components/X'
        // e.g. from '../../lib/prisma' to '@/lib/prisma'
        content = content.replace(/(['"])(?:\.\.\/)+components\/(.*?)\1/g, "'@/components/$2'");
        content = content.replace(/(['"])(?:\.\.\/)+lib\/(.*?)\1/g, "'@/lib/$2'");
        content = content.replace(/(['"])(?:\.\.\/)+store\/(.*?)\1/g, "'@/store/$2'");
        
        // Also handle the case where someone did './components' from within app
        if (filePath.includes(path.join('src', 'app'))) {
            content = content.replace(/(['"])\.\/components\/(.*?)\1/g, "'@/components/$2'");
            content = content.replace(/(['"])\.\/lib\/(.*?)\1/g, "'@/lib/$2'");
            content = content.replace(/(['"])\.\/store\/(.*?)\1/g, "'@/store/$2'");
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated imports in ${filePath}`);
        }
    }
});
